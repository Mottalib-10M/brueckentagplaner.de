/**
 * Suche in der amtlichen Liste des Bayerischen Landesamts für Statistik: hat eine Gemeinde am 15. August
 * (Mariä Himmelfahrt) frei? Die Liste (2.056 Gemeinden) liegt in der Seite; die Eingabe verlässt den Browser nicht.
 */
import { useEffect, useMemo, useState } from 'react';
import { ResultCard, Rows, ShareRow } from '../calc/parts';
import { readParams, updateURL } from '../../lib/url-state';
import G from '../../data/mh-gemeinden.json';
import { t } from '../../i18n/ui';
import { feiertage } from '../../lib/engine/feiertage';
import type { Lang } from '../../lib/format';

interface Props { lang: Lang; methodHref?: string; idPrefix?: string }
type Row = [string, number, number, number];
const ROWS = G.g as Row[];
const norm = (x: string) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, ' ').trim();
const KEYS = ROWS.map((r) => norm(r[0]));

export default function Gemeinde({ lang, methodHref, idPrefix = 'g' }: Props) {
  const ui = t(lang), T = (de: string, en: string) => (lang === 'de' ? de : en);
  const [q, setQ] = useState('Nürnberg');
  useEffect(() => { const u = readParams(window.location.search).get('ort'); if (u) setQ(u.slice(0, 60)); }, []);
  useEffect(() => updateURL({ ort: q }), [q]);
  const hits = useMemo(() => {
    const k = norm(q); if (!k) return [] as number[];
    const starts: number[] = [], inner: number[] = [];
    KEYS.forEach((x, i) => { if (x.startsWith(k)) starts.push(i); else if (x.includes(k)) inner.push(i); });
    return [...starts, ...inner].slice(0, 12);
  }, [q]);
  const best = hits.length ? ROWS[hits[0]] : null;
  const total = ROWS.length, ja = ROWS.filter((r) => r[3]).length;
  const nf = new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB');
  const kreis = (r: Row) => { const k = G.kreise[r[1]]; return k === 'Kreisfreie Stadt' ? T(`kreisfreie Stadt, ${G.bezirke[r[2]]}`, `independent city, ${G.bezirke[r[2]]}`) : T(`Landkreis ${k}, ${G.bezirke[r[2]]}`, `district of ${k}, ${G.bezirke[r[2]]}`); };
  const augsburg = best && norm(best[0]) === 'augsburg' && G.kreise[best[1]] === 'Kreisfreie Stadt';
  return (
    <div className="rounded-xl border border-navy-200 bg-white p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
        <form className="grid content-start gap-y-3" onSubmit={(e) => e.preventDefault()} role="search">
          <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
            <label htmlFor={`${idPrefix}-q`} className="mb-1 block text-sm font-medium text-navy-700">{T('Gemeinde in Bayern', 'Municipality in Bavaria')}</label>
            <input id={`${idPrefix}-q`} type="text" inputMode="search" enterKeyHint="search" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value.slice(0, 60))} placeholder={T('z. B. Würzburg', 'e.g. Würzburg')}
              className="w-full rounded-lg border border-navy-300 bg-white h-12 px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
            <p className="mt-1 text-xs text-navy-500">{T(`${nf.format(total)} Gemeinden, amtliche Liste. Ihre Eingabe bleibt im Browser.`, `${nf.format(total)} municipalities, official list. What you type stays in your browser.`)}</p>
          </div>
          {hits.length > 1 && (
            <ul className="divide-y divide-navy-100 rounded-lg border border-navy-200 text-sm">
              {hits.map((i) => { const r = ROWS[i]; return (
                <li key={i}><button type="button" onClick={() => setQ(r[0])} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-navy-50">
                  <span><span className="font-medium text-navy-900">{r[0]}</span> <span className="text-navy-600">· {kreis(r)}</span></span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${r[3] ? 'bg-accent-100 text-accent-800' : 'bg-navy-100 text-navy-700'}`}>{r[3] ? T('frei', 'day off') : T('Arbeitstag', 'working day')}</span>
                </button></li>
              ); })}
            </ul>
          )}
        </form>
        <ResultCard label={best ? `${best[0]} · ${kreis(best)}` : T('Keine Gemeinde gefunden', 'No municipality found')}
          value={best ? (best[3] ? T('15. August frei', '15 August off') : T('kein Feiertag', 'no holiday')) : '–'}
          sub={best ? (best[3] ? T('Mariä Himmelfahrt ist hier gesetzlicher Feiertag.', 'Assumption Day is a public holiday here.') : T('Mariä Himmelfahrt ist hier ein normaler Arbeitstag.', 'Assumption Day is an ordinary working day here.')) : T('Prüfen Sie die Schreibweise, etwa „Neumarkt i.d.OPf.“.', 'Check the spelling, e.g. “Neumarkt i.d.OPf.”.')}>
          <Rows rows={[
            [T('Gemeinden mit Feiertag', 'Municipalities with the holiday'), `${nf.format(ja)} / ${nf.format(total)}`],
            [T('Feiertage 2027 hier', 'Holidays in 2027 here'), best ? nf.format(feiertage(2027, 'BY', augsburg ? 'augsburg' : best[3] ? 'mh' : 'std').length) : '–'],
            ...(augsburg ? [[T('Dazu am 8. August', 'Plus on 8 August'), T('Hohes Friedensfest', 'Peace Festival')] as [string, string]] : []),
          ]} />
          <ShareRow methodHref={methodHref} labels={ui} />
        </ResultCard>
      </div>
    </div>
  );
}
