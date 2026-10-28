/**
 * Die Werkzeuge der Seite. Jede Zahl und jedes Datum kommt aus dem Rechenkern (engine/feiertage.ts,
 * engine/brueckentage.ts); nichts ist abgetippt. Eine Spec listet ihre Felder (sichtbar zuerst, `adv` eingeklappt)
 * und eine Funktion `run`, die die Ergebniskarte liefert. Kalender und Gemeindesuche sind eigene Komponenten.
 */
import type { ToolSpec, V, ToolOut, Opt } from './tool-types';
import { resolve } from './tool-types';
import { formatNumber, formatDecimal, type Lang } from './format';
import { FEIERTAGE, feiertage, ostersonntag, nthWeekday, fromIso, toIso, isWeekend, LAENDER, LAND_NAME, ORTE, ORT_STANDARD, type Land, type Ort } from './engine/feiertage';
import { optimiere, bruecken, brueckentage, arbeitstage, isoWeek, weeksInYear, werktageMoFr } from './engine/brueckentage';
import P from '../data/params-2026.json';

export type Args = Record<string, number | string>;
const T = (l: Lang, de: string, en: string) => (l === 'de' ? de : en);
const n = (v: V, k: string) => Number(v[k]) || 0;
const s = (v: V, k: string) => String(v[k] ?? '');
const num = (x: number, l: Lang) => formatNumber(x, 0, l);
const TAG = (l: Lang) => (l === 'de' ? 'de-DE' : 'en-GB');
const fmt = (iso: string, l: Lang, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(TAG(l), { ...o, timeZone: 'UTC' });
/** « 28. März 2027 » / « 28 March 2027 » */
export const dLong = (iso: string, l: Lang) => fmt(iso, l, { day: 'numeric', month: 'long', year: 'numeric' });
/** « Sonntag, 28. März 2027 » */
export const dWeek = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
/** « Fr., 7. Mai » / « Fri 7 May » */
export const dShort = (iso: string, l: Lang) => fmt(iso, l, { weekday: 'short', day: 'numeric', month: 'long' });
const span = (a: string, b: string, l: Lang) => (a === b ? dShort(a, l) : `${dShort(a, l)} – ${dShort(b, l)}`);
const tage = (x: number, l: Lang) => `${num(x, l)} ${x === 1 ? T(l, 'Tag', 'day') : T(l, 'Tage', 'days')}`;

/* ------------------------------------------------------------------ Felder */
const JAHRE = P.jahre as number[];
const landOpts = (l: Lang): Opt[] => LAENDER.map((c) => ({ value: c, label: LAND_NAME[c][l] }));
const jahrOpts = (ys: number[]): Opt[] => ys.map((y) => ({ value: String(y), label: String(y) }));
export const ortLabel = (land: Land, o: Ort, l: Lang): string => {
  if (land === 'BY') return { mh: T(l, 'Gemeinde mit Mariä Himmelfahrt', 'Municipality with Assumption Day'), std: T(l, 'Gemeinde ohne Mariä Himmelfahrt', 'Municipality without Assumption Day'), augsburg: T(l, 'Stadt Augsburg (mit Friedensfest)', 'City of Augsburg (with Peace Festival)'), fl: '' }[o];
  if (land === 'SN') return o === 'fl' ? T(l, 'Gemeinde mit Fronleichnam (Lausitz)', 'Municipality with Corpus Christi (Lusatia)') : T(l, 'Gemeinde ohne Fronleichnam', 'Municipality without Corpus Christi');
  if (land === 'TH') return o === 'fl' ? T(l, 'Gemeinde mit Fronleichnam (Eichsfeld u. a.)', 'Municipality with Corpus Christi (Eichsfeld etc.)') : T(l, 'Gemeinde ohne Fronleichnam', 'Municipality without Corpus Christi');
  return T(l, 'Ganzes Land, ein Kalender', 'Whole state, one calendar');
};
const ortOpts = (l: Lang) => (v: V): Opt[] => { const land = s(v, 'land') as Land; return (ORTE[land] ?? ['std']).map((o) => ({ value: o, label: ortLabel(land, o, l) })); };
const fLand = (l: Lang, def: string) => ({ kind: 'select' as const, id: 'land', label: T(l, 'Bundesland', 'State'), def, options: landOpts(l) });
const fJahr = (l: Lang, def: number, ys = JAHRE) => ({ kind: 'select' as const, id: 'jahr', label: T(l, 'Jahr', 'Year'), def: String(def), options: jahrOpts(ys) });
const fOrt = (l: Lang, land: string, adv = false) => ({ kind: 'select' as const, id: 'ort', label: T(l, 'Ihr Ort', 'Your municipality'), def: ORT_STANDARD(land as Land), options: ortOpts(l), adv, help: T(l, 'Nur in Bayern, Sachsen, Thüringen wichtig.', 'Matters in Bavaria, Saxony, Thuringia.') });
const fHl = (l: Lang) => ({ kind: 'choice' as const, id: 'hl', label: T(l, '24. und 31. Dezember', '24 and 31 December'), def: 'arbeit', adv: true, options: [{ value: 'arbeit', label: T(l, 'Arbeitstage', 'Working days') }, { value: 'frei', label: T(l, 'Frei', 'Days off') }] });
const ctx = (v: V) => { const land = s(v, 'land') as Land; return { land, y: n(v, 'jahr'), ort: s(v, 'ort') as Ort, o: { heiligabend: s(v, 'hl') === 'frei' } }; };
const yearRange = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const fname = (id: string, l: Lang) => FEIERTAGE.find((f) => f.id === id)?.name[l] ?? id;

/* ------------------------------------------------------------------ Brückentage-Optimierer */
function btSpec(l: Lang, a: Args = {}): ToolSpec {
  const land = String(a.land ?? 'NW');
  return {
    inputs: [fLand(l, land), fJahr(l, Number(a.jahr ?? 2027)), { id: 'urlaub', label: T(l, 'Urlaubstage, die Sie einsetzen', 'Leave days you want to use'), def: Number(a.urlaub ?? 10), unit: T(l, 'Tage', 'days'), max: 60 }, fOrt(l, land), fHl(l)],
    run: (v) => {
      const { land, y, ort, o } = ctx(v);
      const budget = Math.round(n(v, 'urlaub'));
      const p = optimiere(y, land, ort, budget, o);
      const all = bruecken(y, land, ort, o);
      const faktor = p.urlaub ? p.frei / p.urlaub : 0;
      const out: ToolOut = {
        label: T(l, `${LAND_NAME[land].de} ${y}: mit ${num(p.urlaub, l)} Urlaubstagen`, `${LAND_NAME[land].en} ${y}: using ${num(p.urlaub, l)} leave days`),
        value: T(l, `${num(p.frei, l)} Tage frei`, `${num(p.frei, l)} days off`),
        sub: p.urlaub ? T(l, `Jeder Urlaubstag bringt ${formatDecimal(faktor, 1, l)} freie Tage am Stück.`, `Each leave day buys ${formatDecimal(faktor, 1, l)} consecutive days off.`) : T(l, 'Geben Sie mindestens einen Urlaubstag ein.', 'Enter at least one leave day.'),
        rows: p.bloecke.slice(0, 6).map((b) => [span(b.freiVon, b.freiBis, l), T(l, `${num(b.urlaub, l)} → ${num(b.frei, l)} Tage`, `${num(b.urlaub, l)} → ${num(b.frei, l)} days`), b.frei] as [string, string, number]),
        table: p.bloecke.length ? {
          caption: T(l, `Ihr Plan für ${y}: Urlaub nehmen und frei haben`, `Your plan for ${y}: take leave, get time off`),
          headers: [T(l, 'Urlaub nehmen', 'Take leave'), T(l, 'Urlaubstage', 'Leave days'), T(l, 'Frei am Stück', 'Off in a row'), T(l, 'Freie Tage', 'Days off'), T(l, 'Wegen', 'Thanks to')],
          rows: p.bloecke.map((b) => [span(b.urlaubVon, b.urlaubBis, l), num(b.urlaub, l), span(b.freiVon, b.freiBis, l), num(b.frei, l), b.feiertage.map((id) => fname(id, l)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        } : undefined,
        tables: all.length ? [{
          caption: T(l, `Alle Brücken ${y} in ${LAND_NAME[land].de}, die beste zuerst`, `Every bridge in ${LAND_NAME[land].en} in ${y}, best first`),
          headers: [T(l, 'Urlaub nehmen', 'Take leave'), T(l, 'Urlaubstage', 'Leave days'), T(l, 'Frei am Stück', 'Off in a row'), T(l, 'Freie Tage', 'Days off'), T(l, 'Feiertag', 'Holiday')],
          rows: all.map((b) => [span(b.urlaubVon, b.urlaubBis, l), num(b.urlaub, l), span(b.freiVon, b.freiBis, l), num(b.frei, l), b.feiertage.map((id) => fname(id, l)).join(', ')]),
          align: ['l', 'r', 'l', 'r', 'l'],
        }] : undefined,
        note: p.rest > 0 ? T(l, `${tage(p.rest, l)} verlängern keine Brücke mehr: frei planbar, etwa für den Sommer.`, `${tage(p.rest, l)} no longer extend a bridge: free to plan, for a summer break for instance.`) : undefined,
      };
      return out;
    },
  };
}

/* ------------------------------------------------------------------ Feiertage eines Landes */
function ftSpec(l: Lang, a: Args = {}): ToolSpec {
  const land = String(a.land ?? 'NW');
  return {
    inputs: [fLand(l, land), fJahr(l, Number(a.jahr ?? 2027)), fOrt(l, land)],
    run: (v) => {
      const { land, y, ort } = ctx(v);
      const list = feiertage(y, land, ort);
      const wk = list.filter((f) => !isWeekend(fromIso(f.date)));
      const bt = brueckentage(y, land, ort);
      const at = arbeitstage(y, land, ort).reduce((x, z) => x + z, 0);
      return {
        label: T(l, `Gesetzliche Feiertage ${LAND_NAME[land].de} ${y}`, `Public holidays in ${LAND_NAME[land].en}, ${y}`),
        value: T(l, `${num(list.length, l)} Feiertage`, `${num(list.length, l)} holidays`),
        sub: T(l, `${num(wk.length, l)} davon fallen auf Montag bis Freitag.`, `${num(wk.length, l)} of them fall on a weekday.`),
        rows: [
          [T(l, 'Feiertage an Werktagen', 'Holidays on weekdays'), num(wk.length, l)],
          [T(l, 'Feiertage am Wochenende', 'Holidays at weekends'), num(list.length - wk.length, l)],
          [T(l, 'Echte Brückentage (1 Tag Urlaub)', 'True bridge days (1 leave day)'), num(bt.length, l)],
          [T(l, 'Arbeitstage Montag bis Freitag', 'Working days Monday to Friday'), num(at, l)],
        ],
        table: {
          caption: T(l, `Feiertage ${y} in ${LAND_NAME[land].de}: ${ortLabel(land, ort, l)}`, `Holidays ${y} in ${LAND_NAME[land].en}: ${ortLabel(land, ort, l)}`),
          headers: [T(l, 'Datum', 'Date'), T(l, 'Wochentag', 'Weekday'), T(l, 'Feiertag', 'Holiday'), T(l, 'Gilt', 'Applies')],
          rows: list.map((f) => [dLong(f.date, l), fmt(f.date, l, { weekday: 'long' }), f.name[l], f.bundesweit ? T(l, 'bundesweit', 'nationwide') : f.teil ? T(l, 'nur in Teilen des Landes', 'only in part of the state') : T(l, 'landesweit', 'statewide')]),
          align: ['l', 'l', 'l', 'l'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Arbeitstage */
const MONATE = (l: Lang) => Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(TAG(l), { month: 'long', timeZone: 'UTC' }));
function atSpec(l: Lang, a: Args = {}): ToolSpec {
  const land = String(a.land ?? 'NW');
  return {
    inputs: [fLand(l, land), fJahr(l, Number(a.jahr ?? 2027)), { kind: 'choice', id: 'woche', label: T(l, 'Arbeitstage pro Woche', 'Working days per week'), def: '5', options: [{ value: '5', label: '5' }, { value: '4', label: '4' }, { value: '3', label: '3' }] }, fOrt(l, land, true), fHl(l)],
    run: (v) => {
      const { land, y, ort, o } = ctx(v);
      const m = arbeitstage(y, land, ort, o), sum = m.reduce((x, z) => x + z, 0);
      const w = Number(s(v, 'woche')) || 5;
      const brutto = werktageMoFr(y);
      const anteil = Math.round((sum * w) / 5);
      return {
        label: T(l, `Arbeitstage ${y} in ${LAND_NAME[land].de}`, `Working days ${y} in ${LAND_NAME[land].en}`),
        value: w === 5 ? num(sum, l) : T(l, `≈ ${num(anteil, l)}`, `≈ ${num(anteil, l)}`),
        sub: w === 5 ? T(l, 'Montag bis Freitag, ohne gesetzliche Feiertage.', 'Monday to Friday, public holidays excluded.') : T(l, `Bei ${w} Tagen pro Woche, anteilig aus ${num(sum, l)} Arbeitstagen der Fünftagewoche.`, `For ${w} days a week, pro rata from ${num(sum, l)} days in a five-day week.`),
        rows: [
          [T(l, 'Montag bis Freitag im Jahr', 'Mondays to Fridays in the year'), num(brutto, l)],
          [T(l, 'davon Feiertage', 'of which public holidays'), num(brutto - sum - (o.heiligabend ? 2 - [`${y}-12-24`, `${y}-12-31`].filter((d) => isWeekend(fromIso(d))).length : 0), l)],
          [T(l, '1. Halbjahr', 'First half'), num(m.slice(0, 6).reduce((x, z) => x + z, 0), l)],
          [T(l, '2. Halbjahr', 'Second half'), num(m.slice(6).reduce((x, z) => x + z, 0), l)],
        ],
        table: { caption: T(l, `Arbeitstage je Monat ${y}`, `Working days per month, ${y}`), headers: [T(l, 'Monat', 'Month'), T(l, 'Arbeitstage', 'Working days')], rows: MONATE(l).map((mn, i) => [mn, num(m[i], l)]), align: ['l', 'r'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Ostern (Gaußsche Osterformel) */
export function gaussSchritte(x: number) {
  const K = Math.floor(x / 100), M = 15 + Math.floor((3 * K + 3) / 4) - Math.floor((8 * K + 13) / 25), S = 2 - Math.floor((3 * K + 3) / 4);
  const A = x % 19, D = (19 * A + M) % 30, R = Math.floor((D + Math.floor(A / 11)) / 29), OG = 21 + D - R;
  const SZ = 7 - ((x + Math.floor(x / 4) + S) % 7), OE = 7 - ((((OG - SZ) % 7) + 7) % 7);
  return { K, M, S, A, D, R, OG, SZ, OE, OS: OG + OE };
}
const off = (iso: string, d: number) => toIso(fromIso(iso) + d);
function osSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027), yearRange(2000, 2060))],
    run: (v) => {
      const y = n(v, 'jahr'), os = ostersonntag(y), g = gaussSchritte(y);
      return {
        label: T(l, `Ostersonntag ${y}`, `Easter Sunday ${y}`),
        value: dLong(os, l),
        sub: T(l, `Ostern ${y}: Karfreitag bis Ostermontag, ${dShort(off(os, -2), l)} bis ${dShort(off(os, 1), l)}.`, `Easter ${y}: Good Friday to Easter Monday, ${dShort(off(os, -2), l)} to ${dShort(off(os, 1), l)}.`),
        rows: [
          [T(l, 'Gründonnerstag', 'Maundy Thursday'), dShort(off(os, -3), l)],
          [T(l, 'Karfreitag', 'Good Friday'), dShort(off(os, -2), l)],
          [T(l, 'Ostermontag', 'Easter Monday'), dShort(off(os, 1), l)],
          [T(l, 'Christi Himmelfahrt', 'Ascension Day'), dShort(off(os, 39), l)],
          [T(l, 'Pfingstmontag', 'Whit Monday'), dShort(off(os, 50), l)],
          [T(l, 'Fronleichnam', 'Corpus Christi'), dShort(off(os, 60), l)],
        ],
        table: {
          caption: T(l, `Gaußsche Osterformel für ${y}, Schritt für Schritt (Fassung der PTB)`, `Gauss's Easter formula for ${y}, step by step (PTB version)`),
          headers: [T(l, 'Größe', 'Quantity'), T(l, 'Bedeutung', 'Meaning'), T(l, 'Wert', 'Value')],
          rows: [
            ['K', T(l, 'Säkularzahl', 'Century number'), String(g.K)], ['M', T(l, 'säkulare Mondschaltung', 'Lunar correction'), String(g.M)], ['S', T(l, 'säkulare Sonnenschaltung', 'Solar correction'), String(g.S)],
            ['A', T(l, 'Mondparameter', 'Lunar parameter'), String(g.A)], ['D', T(l, 'Keim für den ersten Vollmond im Frühling', 'Seed for the first spring full moon'), String(g.D)], ['R', T(l, 'kalendarische Korrekturgröße', 'Calendar correction'), String(g.R)],
            ['OG', T(l, 'Ostergrenze (Tag im März)', 'Paschal full moon (day of March)'), String(g.OG)], ['SZ', T(l, 'erster Sonntag im März', 'First Sunday in March'), String(g.SZ)], ['OE', T(l, 'Abstand zum Ostersonntag', 'Days to Easter Sunday'), String(g.OE)],
            ['OS', T(l, 'Ostersonntag als Tag im März (32 = 1. April)', 'Easter Sunday as a day of March (32 = 1 April)'), String(g.OS)],
          ],
          align: ['l', 'l', 'r'],
        },
      };
    },
  };
}

/* ------------------------------------------------------------------ Pfingsten */
function pfSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027), yearRange(2000, 2060))],
    run: (v) => {
      const y = n(v, 'jahr'), os = ostersonntag(y), ps = off(os, 49);
      return {
        label: T(l, `Pfingstsonntag ${y}`, `Whit Sunday (Pentecost) ${y}`),
        value: dLong(ps, l),
        sub: T(l, `Pfingstmontag ist der ${dLong(off(os, 50), l)}, ein Feiertag in allen 16 Ländern.`, `Whit Monday falls on ${dLong(off(os, 50), l)}, a holiday in all 16 states.`),
        rows: [
          [T(l, 'Ostersonntag', 'Easter Sunday'), dShort(os, l)],
          [T(l, 'Christi Himmelfahrt', 'Ascension Day'), dShort(off(os, 39), l)],
          [T(l, 'Pfingstmontag', 'Whit Monday'), dShort(off(os, 50), l)],
          [T(l, 'Fronleichnam', 'Corpus Christi'), dShort(off(os, 60), l)],
        ],
        table: { caption: T(l, 'Pfingsten in den nächsten Jahren', 'Pentecost in the coming years'), headers: [T(l, 'Jahr', 'Year'), T(l, 'Pfingstsonntag', 'Whit Sunday'), T(l, 'Pfingstmontag', 'Whit Monday')], rows: yearRange(y, y + 7).map((z) => { const o2 = ostersonntag(z); return [String(z), dLong(off(o2, 49), l), dLong(off(o2, 50), l)]; }), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Zeitumstellung */
export const sommerzeit = (y: number) => ({ beginn: nthWeekday(y, 3, 0, -1), ende: nthWeekday(y, 10, 0, -1) });
function zuSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027), yearRange(2020, 2040))],
    run: (v) => {
      const y = n(v, 'jahr'), z = sommerzeit(y);
      const dauer = fromIso(z.ende) - fromIso(z.beginn);
      return {
        label: T(l, `Zeitumstellung ${y}: Beginn der Sommerzeit`, `Clocks change ${y}: summer time starts`),
        value: dLong(z.beginn, l),
        sub: T(l, `Uhren um 2 Uhr eine Stunde vor auf 3 Uhr. Zurück am ${dLong(z.ende, l)} um 3 Uhr auf 2 Uhr.`, `Clocks go forward one hour at 2:00 to 3:00. Back on ${dLong(z.ende, l)} at 3:00 to 2:00.`),
        rows: [
          [T(l, 'Sommerzeit beginnt (Uhr vor)', 'Summer time starts (clocks forward)'), dShort(z.beginn, l)],
          [T(l, 'Sommerzeit endet (Uhr zurück)', 'Summer time ends (clocks back)'), dShort(z.ende, l)],
          [T(l, 'Tage mit Sommerzeit', 'Days on summer time'), num(dauer, l)],
          [T(l, 'Nacht der Umstellung im Frühjahr', 'Spring change night'), T(l, '23 Stunden', '23 hours')],
        ],
        table: { caption: T(l, 'Zeitumstellung in den nächsten Jahren', 'Clock changes in the coming years'), headers: [T(l, 'Jahr', 'Year'), T(l, 'Uhr vor (2 → 3 Uhr)', 'Forward (2:00 → 3:00)'), T(l, 'Uhr zurück (3 → 2 Uhr)', 'Back (3:00 → 2:00)')], rows: yearRange(y, y + 6).map((x) => { const q = sommerzeit(x); return [String(x), dLong(q.beginn, l), dLong(q.ende, l)]; }), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Muttertag */
function mtSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027), yearRange(2020, 2040))],
    run: (v) => {
      const y = n(v, 'jahr'), mt = nthWeekday(y, 5, 0, 2), os = ostersonntag(y);
      return {
        label: T(l, `Muttertag ${y}`, `Mother's Day in Germany ${y}`),
        value: dLong(mt, l),
        sub: T(l, 'Immer der zweite Sonntag im Mai. Kein gesetzlicher Feiertag, aber ein Sonntag.', 'Always the second Sunday in May. Not a public holiday, but a Sunday anyway.'),
        rows: [
          [T(l, 'Vatertag (Christi Himmelfahrt)', "Father's Day (Ascension Day)"), dShort(off(os, 39), l)],
          [T(l, 'Pfingstsonntag', 'Whit Sunday'), dShort(off(os, 49), l)],
          [T(l, 'Muttertag fällt auf Pfingsten?', "Mother's Day on Whit Sunday?"), mt === off(os, 49) ? T(l, 'ja', 'yes') : T(l, 'nein', 'no')],
        ],
        table: { caption: T(l, 'Muttertag und Vatertag in den nächsten Jahren', "Mother's Day and Father's Day in the coming years"), headers: [T(l, 'Jahr', 'Year'), T(l, 'Muttertag', "Mother's Day"), T(l, 'Vatertag', "Father's Day")], rows: yearRange(y, y + 6).map((x) => [String(x), dLong(nthWeekday(x, 5, 0, 2), l), dLong(off(ostersonntag(x), 39), l)]), align: ['l', 'l', 'l'] },
      };
    },
  };
}

/* ------------------------------------------------------------------ Kalenderwoche */
function kwSpec(l: Lang, a: Args = {}): ToolSpec {
  return {
    inputs: [fJahr(l, Number(a.jahr ?? 2027), yearRange(2025, 2030)), { kind: 'select', id: 'kw', label: T(l, 'Kalenderwoche', 'Week number'), def: String(a.kw ?? 1), options: (v: V) => yearRange(1, weeksInYear(n(v, 'jahr'))).map((w) => ({ value: String(w), label: T(l, `KW ${w}`, `Week ${w}`) })) }],
    run: (v) => {
      const y = n(v, 'jahr'), w = n(v, 'kw');
      // Montag der KW 1 = Montag der Woche mit dem 4. Januar.
      const j4 = fromIso(`${y}-01-04`), mo1 = j4 - ((new Date(j4 * 86400000).getUTCDay() + 6) % 7);
      const mo = toIso(mo1 + 7 * (w - 1)), so = toIso(mo1 + 7 * (w - 1) + 6);
      return {
        label: T(l, `KW ${w} ${y}`, `Week ${w}, ${y}`),
        value: `${dShort(mo, l)} – ${dShort(so, l)}`,
        sub: T(l, `${y} hat ${weeksInYear(y)} Kalenderwochen nach ISO 8601.`, `${y} has ${weeksInYear(y)} ISO 8601 weeks.`),
        rows: [[T(l, 'Montag', 'Monday'), dLong(mo, l)], [T(l, 'Sonntag', 'Sunday'), dLong(so, l)], [T(l, 'Kalenderwochen im Jahr', 'Weeks in the year'), num(weeksInYear(y), l)]],
      };
    },
  };
}

/* ------------------------------------------------------------------ Urlaubsanspruch (BUrlG) */
function uaSpec(l: Lang, a: Args = {}): ToolSpec {
  const U = P.urlaub;
  return {
    inputs: [
      { kind: 'select', id: 'woche', label: T(l, 'Arbeitstage pro Woche', 'Working days per week'), def: '5', options: ['6', '5', '4', '3', '2', '1'].map((x) => ({ value: x, label: x })) },
      { kind: 'select', id: 'monate', label: T(l, 'Volle Monate im Betrieb (dieses Jahr)', 'Full months employed this year'), def: '12', options: yearRange(1, 12).map((x) => ({ value: String(x), label: String(x) })) },
      fLand(l, String(a.land ?? 'NW')), fJahr(l, Number(a.jahr ?? 2027)),
    ],
    run: (v) => {
      const w = Number(s(v, 'woche')), m = Number(s(v, 'monate'));
      const voll = (U.mindestWerktage * w) / U.tageBasis;
      // § 5 Abs. 1 und 2 BUrlG: ein Zwölftel je vollem Monat, Bruchteile ab einem halben Tag aufgerundet.
      const roh = m >= 12 ? voll : (voll * m) / 12;
      const anspruch = m >= 12 ? voll : (roh % 1 >= 0.5 ? Math.ceil(roh) : roh);
      const { land, y } = ctx(v);
      const ganz = Math.floor(anspruch);
      const p = optimiere(y, land, ORT_STANDARD(land), ganz);
      return {
        label: T(l, 'Gesetzlicher Mindesturlaub', 'Statutory minimum leave'),
        value: T(l, `${formatDecimal(anspruch, 2, l)} Tage`, `${formatDecimal(anspruch, 2, l)} days`),
        sub: m >= 12 ? T(l, `${U.mindestWerktage} Werktage bei 6 Tagen, umgerechnet auf ${w} Arbeitstage pro Woche.`, `${U.mindestWerktage} working days on a six-day week, converted to ${w} days a week.`) : T(l, `${m} von 12 Monaten: ein Zwölftel je vollem Monat.`, `${m} of 12 months: one twelfth per full month.`),
        rows: [
          [T(l, 'Anspruch für ein volles Jahr', 'Entitlement for a full year'), formatDecimal(voll, 2, l)],
          [T(l, 'Ihr Anspruch dieses Jahr', 'Your entitlement this year'), formatDecimal(anspruch, 2, l)],
          [T(l, `Freie Tage am Stück damit, ${LAND_NAME[land].de} ${y}`, `Days off in a row with it, ${LAND_NAME[land].en} ${y}`), num(p.frei, l)],
        ],
        note: T(l, 'Arbeitsvertrag, Tarifvertrag und Schwerbehinderung (5 Tage zusätzlich) können mehr geben, nie weniger.', 'Your contract, a collective agreement or a severe disability (5 extra days) can give more, never less.'),
      };
    },
  };
}

export const SPECS: Record<string, (l: Lang, arg?: Args) => ToolSpec> = { bt: btSpec, ft: ftSpec, at: atSpec, os: osSpec, pf: pfSpec, zu: zuSpec, mt: mtSpec, kw: kwSpec, ua: uaSpec };
export const TOOL_KINDS = [...Object.keys(SPECS), 'kalender', 'gemeinde'];
export function getTool(kind: string, l: Lang, arg?: Args): ToolSpec {
  const f = SPECS[kind]; if (!f) throw new Error(`simulateur inconnu : ${kind}`);
  return f(l, arg);
}
/** Lance un simulateur avec ses valeurs par défaut (ou celles données) : sert aux pages et aux tests. */
export function runTool(kind: string, l: Lang, arg?: Args, values?: V): ToolOut {
  const spec = getTool(kind, l, arg);
  const v = Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])) as V;
  return spec.run(resolve(spec.inputs, { ...v, ...(values ?? {}) }));
}
export { formatNumber, isoWeek };
