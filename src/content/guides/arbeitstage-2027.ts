/** Arbeitstage 2027 : jours ouvrés par Land et par mois. Chiffres : moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabelleLaender } from '../../lib/bausteine';
import { LAENDER, ORT_STANDARD } from '../../lib/engine/feiertage';

const sum = (l: (typeof LAENDER)[number], y = 2027) => K.arbeitstage(y, l, ORT_STANDARD(l)).reduce((a, b) => a + b, 0);
const v = LAENDER.map((l) => sum(l)), MIN = Math.min(...v), MAX = Math.max(...v);
const nw = K.arbeitstage(2027, 'NW', 'std');
const monate = (h: { lang: 'de' | 'en'; table: (a: string[], b: Array<Array<string | number>>, c?: string, d?: Array<'l' | 'r'>) => string }) => {
  const L = (l: (typeof LAENDER)[number]) => K.arbeitstage(2027, l, ORT_STANDARD(l));
  const by = L('BY'), be = L('BE'), sn = L('SN');
  const names = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2027, i, 15)).toLocaleDateString(h.lang === 'de' ? 'de-DE' : 'en-GB', { month: 'long', timeZone: 'UTC' }));
  return h.table([h.lang === 'de' ? 'Monat' : 'Month', 'Nordrhein-Westfalen', h.lang === 'de' ? 'Bayern' : 'Bavaria', 'Berlin', h.lang === 'de' ? 'Sachsen' : 'Saxony'], names.map((m, i) => [m, nw[i], by[i], be[i], sn[i]]),
    h.lang === 'de' ? 'Arbeitstage je Monat 2027 in vier Ländern (Montag bis Freitag ohne Feiertage)' : 'Working days per month in 2027 in four states (Monday to Friday, holidays excluded)', ['l', 'r', 'r', 'r', 'r']);
};

export default defineGuide({
  id: 'arbeitstage-2027', group: 'werkzeuge', order: 4, tool: 'at', toolArg: { jahr: 2027 },
  related: ['kalender-2027', 'feiertage-2027', 'urlaubsanspruch', 'home'],
  sources: ['einigungsvertrag', 'ftg-nw', 'ftg-by', 'ftg-sn', 'entgfg2'],
  de: {
    slug: 'arbeitstage-2027', nav: 'Arbeitstage 2027', card: 'Arbeitstage je Land und Monat, auch für Teilzeit',
    title: 'Arbeitstage 2027: je Bundesland und Monat, auch Teilzeit',
    description: 'Arbeitstage 2027 für alle 16 Bundesländer: Montag bis Freitag ohne Feiertage, je Monat und fürs ganze Jahr, auch für Teilzeit und mit freiem Heiligabend.',
    h1: 'Arbeitstage 2027 nach Bundesland',
    intro: 'Land und Arbeitstage pro Woche wählen: Der Rechner zählt die Arbeitstage 2027 für das ganze Jahr und für jeden Monat.',
    resume: `2027 hat ${K.werktageMoFr(2027)} Tage von Montag bis Freitag. Zieht man die gesetzlichen Feiertage ab, die auf einen dieser Tage fallen, bleiben je nach Bundesland ${MIN} bis ${MAX} Arbeitstage. Am wenigsten sind es in Baden-Württemberg und Bayern mit ${sum('BW')} und ${sum('BY')}, am meisten in Ländern wie Brandenburg, Hamburg oder Niedersachsen mit ${sum('HH')}. Der Abstand ist 2027 kleiner als in anderen Jahren, weil viele Feiertage auf ein Wochenende fallen: der 1. Mai auf einen Samstag, der 3. Oktober und der Reformationstag auf Sonntage, Weihnachten auf Samstag und Sonntag. Der arbeitsreichste Monat ist in den meisten Ländern der Dezember mit ${nw[11]} Arbeitstagen, der ärmste der Mai mit ${nw[4]} in Nordrhein-Westfalen, weil dort Himmelfahrt, Pfingstmontag und Fronleichnam zusammenkommen. Arbeitstage braucht man für Gehaltsabrechnung, Projektplanung, Pendlerpauschale und Arbeitszeitkonten; die Steuererklärung rechnet bei der Pendlerpauschale allerdings mit Ihren tatsächlichen Fahrten.`,
    faqs: [
      { q: 'Wie viele Arbeitstage hat 2027 in Bayern?', a: `${sum('BY')} in einer Gemeinde mit Mariä Himmelfahrt, ${sum('BY')} auch ohne, weil der 15. August 2027 ein Sonntag ist. In Augsburg sind es ebenso viele, denn das Friedensfest fällt auf einen Sonntag. Bayern liegt damit gleichauf mit Baden-Württemberg am unteren Ende.` },
      { q: 'Wie rechne ich Arbeitstage bei Teilzeit?', a: 'Bei vier oder drei festen Arbeitstagen pro Woche rechnet der Rechner anteilig: Arbeitstage der Fünftagewoche mal vier oder drei Fünftel, gerundet. Das ist ein guter Näherungswert. Genau wird es nur, wenn Sie Ihre festen Wochentage kennen, denn ein Feiertag am Montag trifft Teilzeitkräfte, die montags frei haben, gar nicht.' },
      { q: 'Werden Feiertage beim Gehalt bezahlt?', a: 'Ja. Nach dem Entgeltfortzahlungsgesetz erhalten Beschäftigte für Arbeitszeit, die wegen eines gesetzlichen Feiertags ausfällt, ihr normales Arbeitsentgelt. Ein Feiertag an einem Werktag kostet also kein Geld, mindert aber die Zahl der Arbeitstage, etwa für Stundensätze oder Projektplanung. Wer an einem Feiertag arbeitet, bekommt je nach Tarifvertrag einen Zuschlag, der bis zu einer Grenze steuerfrei ist.' },
    ],
    body: (h) => `<h2>Arbeitstage 2027 im Vergleich der Länder</h2>
<p>Die Tabelle zeigt für jedes Land, wie viele Feiertage es 2027 gibt, wie viele davon auf einen Werktag fallen und wie viele Arbeitstage übrig bleiben. Für Bayern gilt die Zahl einer Gemeinde mit Mariä Himmelfahrt; 2027 ändert das nichts, weil der Tag ein Sonntag ist.</p>
${tabelleLaender(h, 2027)}
<h2>Arbeitstage je Monat</h2>
<p>Für Monatsabrechnungen und Projektpläne zählt die Verteilung über das Jahr. Der Mai ist 2027 in fast allen Ländern der kürzeste Monat, im Westen und Süden besonders, weil Fronleichnam hinzukommt. Der Dezember ist lang, weil beide Weihnachtstage auf das Wochenende fallen.</p>
${monate(h)}
<p>Ein Feiertag zählt nur, wenn er auf Montag bis Freitag fällt. Heiligabend und Silvester sind keine Feiertage, werden aber oft durch Tarif- oder Arbeitsvertrag frei oder halb frei gegeben; im Rechner lassen sie sich unter den erweiterten Einstellungen als frei markieren. Wer sehen will, welche Tage das konkret sind, findet sie im ${h.a('kalender-2027', 'Kalender 2027')}.</p>
<h2>Feiertage und Lohn</h2>
<p>Nach dem ${h.src('entgfg2', 'Entgeltfortzahlungsgesetz')} zahlt der Arbeitgeber für Arbeitszeit, die wegen eines Feiertags ausfällt, das normale Entgelt. Wer am Arbeitstag vor oder nach einem Feiertag unentschuldigt fehlt, verliert diesen Anspruch für den Feiertag. Wie viele Urlaubstage Ihnen bei Ihrer Arbeitswoche zustehen, zeigt der ${h.a('urlaubsanspruch', 'Urlaubsanspruch')}.</p>
${h.mini('at', { p: ['land', 'woche'], c: 'Arbeitstage 2027 für Ihr Land' })}`,
  },
  en: {
    slug: 'working-days-2027', nav: 'Working days 2027', card: 'Working days by state and month, part-time too',
    title: 'Working days Germany 2027: by state and month, part-time',
    description: 'Working days 2027 for all 16 German states: Monday to Friday minus public holidays, per month and for the year, for part-time too and with Christmas Eve off.',
    h1: 'Working days 2027 by German state',
    intro: 'Pick your state and working days per week: the calculator counts the working days in 2027 for the whole year and for each month.',
    resume: `2027 has ${K.werktageMoFr(2027)} days from Monday to Friday. Take away the public holidays that fall on one of them and ${MIN} to ${MAX} working days remain, depending on the state. Baden-Württemberg and Bavaria have the fewest, with ${sum('BW')} and ${sum('BY')}, while states such as Brandenburg, Hamburg or Lower Saxony have the most, with ${sum('HH')}. The gap is smaller in 2027 than in other years because many holidays fall on a weekend: 1 May on a Saturday, 3 October and Reformation Day on Sundays, Christmas on Saturday and Sunday. In most states December is the busiest month with ${nw[11]} working days, and May the leanest, with ${nw[4]} in North Rhine-Westphalia, where Ascension Day, Whit Monday and Corpus Christi come together. Working days matter for payroll, project planning, the commuter allowance and working-time accounts; for the commuter allowance, though, the tax return counts your actual trips.`,
    faqs: [
      { q: 'How many working days does Bavaria have in 2027?', a: `${sum('BY')} in a municipality with Assumption Day, and ${sum('BY')} without it too, because 15 August 2027 is a Sunday. Augsburg has the same number, as its Peace Festival falls on a Sunday. Bavaria is level with Baden-Württemberg at the bottom of the table.` },
      { q: 'How do I count working days for part-time work?', a: 'For four or three fixed working days a week the calculator works pro rata: the five-day working days times four or three fifths, rounded. That is a good approximation. It only becomes exact if you know your fixed weekdays, because a Monday holiday does not affect part-timers who never work Mondays.' },
      { q: 'Are public holidays paid in Germany?', a: 'Yes. Under the Continued Remuneration Act, employees receive their normal pay for working time lost because of a statutory holiday. A holiday on a weekday therefore costs no money, but it reduces the number of working days, which matters for hourly rates or project planning.' },
    ],
    body: (h) => `<h2>Working days 2027 across the states</h2>
<p>The table shows for each state how many public holidays there are in 2027, how many of them fall on a weekday and how many working days remain. For Bavaria the figure is for a municipality with Assumption Day; in 2027 that makes no difference, as the day is a Sunday.</p>
${tabelleLaender(h, 2027)}
<h2>Working days per month</h2>
<p>For monthly payroll and project plans the spread over the year is what counts. May is the shortest month in almost every state in 2027, especially in the west and south, where Corpus Christi is added. December is long because both Christmas holidays fall on the weekend.</p>
${monate(h)}
<p>A holiday only counts if it falls between Monday and Friday. Christmas Eve and New Year's Eve are not public holidays, but many collective agreements or contracts give them off in full or in part; in the calculator's advanced settings you can mark them as days off. To see which days these are, open the ${h.a('kalender-2027', 'calendar 2027')}.</p>
<h2>Public holidays and pay</h2>
<p>Under the ${h.src('entgfg2', 'Continued Remuneration Act')} the employer pays normal wages for working time lost to a public holiday. Anyone who is absent without excuse on the working day before or after a holiday loses that pay for the holiday. How much leave you are entitled to for your working week is shown on ${h.a('urlaubsanspruch', 'leave entitlement')}.</p>
${h.mini('at', { p: ['land', 'woche'], c: 'Working days 2027 for your state' })}`,
  },
});
