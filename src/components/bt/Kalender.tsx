/**
 * Jahreskalender mit Kalenderwochen (ISO 8601) und den Feiertagen des gewählten Landes.
 * Premier rendu = valeurs par défaut du build ; l'adresse partagée est lue après le montage (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import { feiertage, LAENDER, LAND_NAME, ORTE, ORT_STANDARD, fromIso, dayNum, type Land, type Ort } from '../../lib/engine/feiertage';
import { arbeitstage, isoWeek, weeksInYear } from '../../lib/engine/brueckentage';
import { ortLabel, dLong } from '../../lib/tool-specs';
import { t } from '../../i18n/ui';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; year: number; land?: string; methodHref?: string; idPrefix?: string }
const TAG = (l: Lang) => (l === 'de' ? 'de-DE' : 'en-GB');

export default function Kalender({ lang, year, land: land0 = 'NW', methodHref, idPrefix = 'k' }: Props) {
  const ui = t(lang), T = (de: string, en: string) => (lang === 'de' ? de : en);
  const [land, setLand] = useState<Land>(land0 as Land);
  const [ort, setOrt] = useState<Ort>(ORT_STANDARD(land0 as Land));
  useEffect(() => {
    const u = readParams(window.location.search);
    const l = u.get('land') as Land | null;
    if (l && LAENDER.includes(l)) { setLand(l); const o = u.get('ort') as Ort | null; setOrt(o && ORTE[l].includes(o) ? o : ORT_STANDARD(l)); }
  }, []);
  const o = ORTE[land].includes(ort) ? ort : ORT_STANDARD(land);
  useEffect(() => updateURL({ land, ort: o }), [land, o]);
  const list = useMemo(() => feiertage(year, land, o), [year, land, o]);
  const hol = useMemo(() => new Map(list.map((f) => [f.date, f])), [list]);
  const at = useMemo(() => arbeitstage(year, land, o).reduce((a, b) => a + b, 0), [year, land, o]);
  const wk = list.filter((f) => { const w = new Date(fromIso(f.date) * 864e5).getUTCDay(); return w !== 0 && w !== 6; }).length;
  const wdHead = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2027, 1, 1 + i)).toLocaleDateString(TAG(lang), { weekday: 'short', timeZone: 'UTC' }).replace('.', ''));
  const months = Array.from({ length: 12 }, (_, m) => {
    const first = dayNum(year, m + 1, 1), last = dayNum(year, m + 2, 1) - 1;
    const lead = (new Date(first * 864e5).getUTCDay() + 6) % 7;
    const cells: Array<number | null> = [...Array(lead).fill(null)];
    for (let d = first; d <= last; d++) cells.push(d);
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<number | null>> = []; for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return { name: new Date(first * 864e5).toLocaleDateString(TAG(lang), { month: 'long', timeZone: 'UTC' }), weeks };
  });
  const iso = (d: number) => new Date(d * 864e5).toISOString().slice(0, 10);
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <SelectField id={`${idPrefix}-land`} label={T('Bundesland', 'State')} value={land} onChange={(v) => { setLand(v as Land); setOrt(ORT_STANDARD(v as Land)); }} options={LAENDER.map((c) => ({ value: c, label: LAND_NAME[c][lang] }))} />
          <SelectField id={`${idPrefix}-ort`} label={T('Ihr Ort', 'Your municipality')} value={o} onChange={(v) => setOrt(v as Ort)} options={ORTE[land].map((x) => ({ value: x, label: ortLabel(land, x, lang) }))} />
        </form>
        <ResultCard label={T(`Kalender ${year}, ${LAND_NAME[land].de}`, `Calendar ${year}, ${LAND_NAME[land].en}`)} value={T(`${list.length} Feiertage`, `${list.length} holidays`)} sub={T(`${at} Arbeitstage, ${weeksInYear(year)} Kalenderwochen`, `${at} working days, ${weeksInYear(year)} weeks`)}>
          <Rows rows={[[T('Feiertage an Werktagen', 'Holidays on weekdays'), String(wk)], [T('Erste KW beginnt am', 'Week 1 starts on'), dLong(iso(dayNum(year, 1, 4) - ((new Date(dayNum(year, 1, 4) * 864e5).getUTCDay() + 6) % 7)), lang)]]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
      <div className="kal-grid mt-6">
        {months.map((mo) => (
          <table key={mo.name}>
            <caption className="mb-1 text-left text-sm font-semibold text-navy-900">{mo.name} {year}</caption>
            <thead><tr><th scope="col" className="text-[0.7rem] font-medium text-navy-600">{T('KW', 'Wk')}</th>{wdHead.map((h) => <th key={h} scope="col" className="font-medium text-navy-700">{h}</th>)}</tr></thead>
            <tbody>{mo.weeks.map((w, i) => {
              const firstDay = w.find((x) => x !== null)!;
              return (
                <tr key={i}><td className="kw">{isoWeek(iso(firstDay)).week}</td>
                  {w.map((d, j) => {
                    if (d === null) return <td key={j} />;
                    const f = hol.get(iso(d));
                    const cls = f ? (f.teil ? 'tf' : 'ft') : j >= 5 ? 'we' : '';
                    return <td key={j} className={cls} title={f ? f.name[lang] : undefined}>{new Date(d * 864e5).getUTCDate()}</td>;
                  })}
                </tr>
              );
            })}</tbody>
          </table>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700"><span><span className="mr-1 inline-block h-3 w-3 rounded bg-accent-100 align-middle" aria-hidden="true" />{T('gesetzlicher Feiertag', 'public holiday')}</span><span><span className="mr-1 inline-block h-3 w-3 rounded bg-navy-100 align-middle" aria-hidden="true" />{T('Feiertag nur in einem Teil des Landes', 'holiday in part of the state only')}</span></p>
      <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm text-navy-800 sm:grid-cols-2">
        {list.map((f) => <li key={f.id}><span className="tabular-nums">{dLong(f.date, lang)}</span> · {f.name[lang]}</li>)}
      </ul>
    </div>
  );
}
