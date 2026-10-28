/** Blocs de contenu calculés, partagés par plusieurs pages (tableaux : hors contrôle d'unicité). */
import type { Helpers } from './page-types';
import { uebersicht, feiertage, LAENDER, LAND_NAME, ORT_STANDARD, type Land } from './engine/feiertage';
import { bruecken, arbeitstage } from './engine/brueckentage';
import { dLong, dShort } from './tool-specs';

const T = (h: Helpers, de: string, en: string) => (h.lang === 'de' ? de : en);
/** Tous les jours fériés d'une année avec les Länder où ils s'appliquent. */
export function tabelleJahr(h: Helpers, y: number) {
  const rows = uebersicht(y).map((r) => [dLong(r.date, h.lang), h.wd(r.date), r.name[h.lang],
    (r.laender.length === 16 ? T(h, 'alle 16 Länder', 'all 16 states') : r.laender.join(', ')) + (r.teil.length ? T(h, ` (teilweise: ${r.teil.join(', ')})`, ` (in part: ${r.teil.join(', ')})`) : '')]);
  return h.table([T(h, 'Datum', 'Date'), T(h, 'Wochentag', 'Weekday'), T(h, 'Feiertag', 'Holiday'), T(h, 'Gilt in', 'Applies in')], rows, T(h, `Gesetzliche Feiertage ${y} in Deutschland, mit Ländern (Kürzel: BW Baden-Württemberg, BY Bayern, BE Berlin, BB Brandenburg, HB Bremen, HH Hamburg, HE Hessen, MV Mecklenburg-Vorpommern, NI Niedersachsen, NW Nordrhein-Westfalen, RP Rheinland-Pfalz, SL Saarland, SN Sachsen, ST Sachsen-Anhalt, SH Schleswig-Holstein, TH Thüringen)`, `Public holidays ${y} in Germany, by state (BW Baden-Württemberg, BY Bavaria, BE Berlin, BB Brandenburg, HB Bremen, HH Hamburg, HE Hesse, MV Mecklenburg-Western Pomerania, NI Lower Saxony, NW North Rhine-Westphalia, RP Rhineland-Palatinate, SL Saarland, SN Saxony, ST Saxony-Anhalt, SH Schleswig-Holstein, TH Thuringia)`));
}
/** Nombre de jours fériés et de jours ouvrés par Land pour une année. */
export function tabelleLaender(h: Helpers, y: number) {
  const rows = LAENDER.map((l: Land) => { const o = ORT_STANDARD(l); const f = feiertage(y, l, o); const wk = f.filter((x) => { const w = new Date(`${x.date}T12:00:00Z`).getUTCDay(); return w > 0 && w < 6; }).length; return [LAND_NAME[l][h.lang], f.length, wk, arbeitstage(y, l, o).reduce((a, b) => a + b, 0)]; });
  return h.table([T(h, 'Land', 'State'), T(h, 'Feiertage', 'Holidays'), T(h, 'davon Mo–Fr', 'on weekdays'), T(h, 'Arbeitstage', 'Working days')], rows, T(h, `Feiertage und Arbeitstage ${y} je Land (Bayern: Gemeinde mit Mariä Himmelfahrt)`, `Holidays and working days ${y} by state (Bavaria: municipality with Assumption Day)`), ['l', 'r', 'r', 'r']);
}
/** Les meilleurs ponts d'un Land. */
export function tabelleBruecken(h: Helpers, y: number, land: Land, max = 8) {
  const rows = bruecken(y, land, ORT_STANDARD(land)).slice(0, max).map((b) => [b.urlaubVon === b.urlaubBis ? dShort(b.urlaubVon, h.lang) : `${dShort(b.urlaubVon, h.lang)} – ${dShort(b.urlaubBis, h.lang)}`, b.urlaub, `${dShort(b.freiVon, h.lang)} – ${dShort(b.freiBis, h.lang)}`, b.frei]);
  return h.table([T(h, 'Urlaub nehmen', 'Take leave'), T(h, 'Urlaubstage', 'Leave days'), T(h, 'Frei am Stück', 'Off in a row'), T(h, 'Freie Tage', 'Days off')], rows, T(h, `Die besten Brücken ${y} in ${LAND_NAME[land].de}`, `Best bridges ${y} in ${LAND_NAME[land].en}`), ['l', 'r', 'l', 'r']);
}
/** Les jours fériés d'un Land sur trois ans, une ligne par jour férié. */
export function tabelleLand(h: Helpers, land: Land, ort = ORT_STANDARD(land), jahre = [2026, 2027, 2028]) {
  const ids: Array<{ id: string; name: string }> = [];
  const by = jahre.map((y) => new Map(feiertage(y, land, ort).map((f) => { if (!ids.some((x) => x.id === f.id)) ids.push({ id: f.id, name: f.name[h.lang] }); return [f.id, f.date]; })));
  const order = (id: string) => { for (const m of by) { const d = m.get(id); if (d) return d.slice(5); } return '99'; };
  ids.sort((a, b) => order(a.id).localeCompare(order(b.id)));
  const cell = (d?: string) => (d ? `${new Date(`${d}T12:00:00Z`).toLocaleDateString(h.lang === 'de' ? 'de-DE' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })}` : '–');
  const rows = ids.map((x) => [x.name, ...by.map((m) => cell(m.get(x.id)))]);
  rows.push([T(h, '<strong>Feiertage insgesamt</strong>', '<strong>Total holidays</strong>'), ...by.map((m) => `<strong>${m.size}</strong>`)]);
  return h.table([T(h, 'Feiertag', 'Holiday'), ...jahre.map(String)], rows, T(h, `Gesetzliche Feiertage in ${LAND_NAME[land].de}, ${jahre[0]} bis ${jahre[jahre.length - 1]}`, `Public holidays in ${LAND_NAME[land].en}, ${jahre[0]} to ${jahre[jahre.length - 1]}`), ['l', 'l', 'l', 'l']);
}
