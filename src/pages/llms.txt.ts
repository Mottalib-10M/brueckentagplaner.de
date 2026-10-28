/** llms.txt (RECETTE §21), généré à partir du registre des pages. */
import { GUIDES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../i18n/nav';
import { KIT as K } from '../lib/kit';
export function GET() {
  const nw = K.optimiere(2027, 'NW', 'std', 10), M = K.P.bayern_mh;
  const lines = [
    `# ${SITE_NAMES.de}`, '',
    `> Bridge days (Brückentage) and statutory public holidays for all 16 German states, 2026 to 2028, in German and English. Holidays are computed from each state's public holiday act (read on ${K.P.retrieved_at}); Easter by Gauss's formula (PTB version), cross-checked against an independent algorithm for 1600-2600. Easter Sunday 2027: ${K.ostersonntag(2027)}; Whit Monday 2027: ${K.nthWeekday(2027, 5, 1, 3)}; summer time 2027: ${K.nthWeekday(2027, 3, 0, -1)} to ${K.nthWeekday(2027, 10, 0, -1)}. Partial holidays handled: Assumption Day in ${M.mit} of ${M.gemeinden} Bavarian municipalities (State Office for Statistics, 2022 census, searchable list), Augsburg Peace Festival (8 August), Corpus Christi in parts of Saxony and Thuringia. Berlin one-off holiday 17 June 2028. Leave planner: exact dynamic programming over the year's working blocks; example North Rhine-Westphalia 2027, ${nw.urlaub} leave days give ${nw.frei} days off. Everything runs in the browser; nothing entered is sent. Independent site by Radif Partners; no travel, hotel or affiliate offers; no school holidays. Last updated ${LAST_UPDATED}.`, '',
    `## ${{ de: 'Brückentage-Optimierer', en: 'Bridge-day planner' }.en}`, `- [Brückentage 2027](${SITE_URL}${route('home', 'de')})`, `- [Bridge days 2027](${SITE_URL}${route('home', 'en')})`, '',
    ...GROUPS.flatMap((g) => [`## ${g.label.en} / ${g.label.de}`, ...GUIDES.filter((p) => p.group === g.id).flatMap((p) => [
      `- [${p.de.nav}](${SITE_URL}${route(p.id, 'de')}): ${p.de.card}`,
      `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`,
    ]), '']),
    '## About', `- [Methode](${SITE_URL}${route('method', 'de')})`, `- [Method](${SITE_URL}${route('method', 'en')})`, `- [Über uns](${SITE_URL}${route('about', 'de')})`, `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
