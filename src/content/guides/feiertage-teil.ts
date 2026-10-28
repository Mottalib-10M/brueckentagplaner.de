/** Jours fériés partiels : Mariä Himmelfahrt (recherche de commune bavaroise) et Fronleichnam. Données : LfStat, lois des Länder, moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import MH from '../../data/mh-gemeinden.json';

const MP = K.P.bayern_mh;
type G = [string, number, number, number];
const G_ = MH.g as G[];
const proBezirk = MH.bezirke.map((b, i) => { const g = G_.filter((x) => x[2] === i); return { b, n: g.length, ja: g.filter((x) => x[3] === 1).length }; });
const de = (x: number) => x.toLocaleString('de-DE'), en = (x: number) => x.toLocaleString('en-GB');
const BEZ_EN: Record<string, string> = { Mittelfranken: 'Middle Franconia', Niederbayern: 'Lower Bavaria', Oberbayern: 'Upper Bavaria', Oberfranken: 'Upper Franconia', Oberpfalz: 'Upper Palatinate', Schwaben: 'Swabia', Unterfranken: 'Lower Franconia' };
const os = (y: number) => K.ostersonntag(y);
const fl = (y: number) => K.toIso(K.fromIso(os(y)) + 60);
const wdDe = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const wdEn = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default [
  defineGuide({
    id: 'mariae-himmelfahrt', group: 'feiertage', order: 30, tool: 'gemeinde',
    countdown: { date: '2027-08-15', label: { de: 'Mariä Himmelfahrt 2027', en: 'Assumption Day 2027' } },
    related: ['feiertage-bayern', 'feiertage-saarland', 'fronleichnam', 'feiertage-2028'],
    sources: ['by-mh', 'ftg-by', 'ftg-sl'],
    de: {
      slug: 'mariae-himmelfahrt', nav: 'Mariä Himmelfahrt', card: 'Gemeindesuche: Ist der 15. August bei Ihnen frei?',
      title: 'Mariä Himmelfahrt 2027: Feiertag in Ihrer Gemeinde?',
      description: 'Mariä Himmelfahrt am 15. August: In welchen bayerischen Gemeinden ist der Tag 2027 Feiertag? Suche über alle 2.056 Gemeinden nach der amtlichen Liste von 2025.',
      h1: 'Mariä Himmelfahrt: Feiertag in Ihrer Gemeinde?',
      intro: 'Gemeinde eingeben: Die Suche zeigt nach der amtlichen Feststellung, ob der 15. August dort gesetzlicher Feiertag ist, und wie viele Feiertage die Gemeinde damit hat.',
      resume: `Mariä Himmelfahrt am 15. August ist in Deutschland nur im Saarland landesweit gesetzlicher Feiertag. In Bayern gilt er nach Art. 1 des Feiertagsgesetzes in Gemeinden mit überwiegend katholischer Bevölkerung. Welche das sind, stellt das Bayerische Landesamt für Statistik nach jeder Volkszählung fest; seit dem 15. August 2025 gilt die Feststellung auf Grundlage des Zensus 2022. Danach ist der Tag in ${de(MP.mit)} von ${de(MP.gemeinden)} Gemeinden Feiertag und in ${de(MP.ohne)} nicht. Alle Gemeinden in Oberbayern und Niederbayern haben ihn, ebenso München, Augsburg, Regensburg, Würzburg und Ingolstadt. Ohne Feiertag sind vor allem Gemeinden in Mittel- und Oberfranken, darunter Nürnberg, Fürth, Erlangen, Bayreuth, Coburg und Hof. Maßgeblich ist der Ort des Betriebs, nicht der Wohnort. 2027 fällt der 15. August auf einen Sonntag, sodass die Unterscheidung keine Rolle spielt. 2028 ist er ein Dienstag, und der Montag davor wird in den Gemeinden mit Feiertag zum Brückentag.`,
      faqs: [
        { q: 'Ist der 15. August in Nürnberg ein Feiertag?', a: 'Nein. Nürnberg hat nach der Feststellung des Landesamts für Statistik keine überwiegend katholische Bevölkerung, Mariä Himmelfahrt ist dort ein Arbeitstag. Dasselbe gilt für Fürth, Erlangen und Schwabach. In München, Augsburg und Regensburg ist der Tag dagegen frei. Die Suche oben zeigt jede einzelne Gemeinde.' },
        { q: 'Wie oft wird die Liste der Gemeinden geändert?', a: 'Nach jeder Volkszählung. Die aktuelle Feststellung beruht auf dem Zensus 2022 und gilt seit dem 15. August 2025. Vorher galt die Liste auf Grundlage des Zensus 2011. Einzelne Gemeinden können dabei den Feiertag gewinnen oder verlieren, wenn sich der Anteil der Katholiken verschoben hat.' },
        { q: 'Gilt der Feiertag am Wohnort oder am Arbeitsort?', a: 'Am Arbeitsort. Entscheidend ist, wo der Betrieb oder die Dienststelle liegt. Wer in Fürth wohnt und in München arbeitet, hat am 15. August frei; wer in München wohnt und in Fürth arbeitet, nicht. Schulen sind am 15. August ohnehin in den Sommerferien.' },
      ],
      body: (h) => `<h2>Mariä Himmelfahrt nach Regierungsbezirk</h2>
<p>Die Verteilung folgt der konfessionellen Landkarte Bayerns. Altbayern und Schwaben sind überwiegend katholisch, Teile Frankens überwiegend evangelisch. Die Tabelle zählt die Gemeinden nach der amtlichen Liste.</p>
${h.table(['Regierungsbezirk', 'Gemeinden', 'mit Feiertag', 'ohne Feiertag'], proBezirk.map((r) => [r.b, r.n, r.ja, r.n - r.ja]), `Mariä Himmelfahrt in Bayern nach Regierungsbezirk (Feststellung des Landesamts für Statistik, Zensus 2022)`, ['l', 'r', 'r', 'r'])}
<p>Quelle ist die ${h.src('by-mh', 'Feststellung des Bayerischen Landesamts für Statistik')}, die das ${h.src('ftg-by', 'bayerische Feiertagsgesetz')} ausdrücklich vorsieht. Wir übernehmen die Liste unverändert; Gemeindenamen stehen in der amtlichen Schreibweise, etwa mit dem Zusatz „St“ für Stadt und „M“ für Markt.</p>
<h2>Wie viele Feiertage Ihre Gemeinde hat</h2>
<p>Eine bayerische Gemeinde mit Mariä Himmelfahrt hat 13 Feiertage, eine ohne 12. Die Stadt Augsburg hat mit dem Hohen Friedensfest am 8. August 14, die meisten in Deutschland. Im ${h.src('ftg-sl', 'Saarland')} ist der 15. August ohne Ausnahme frei. Alle Feiertage Bayerns mit Wochentag stehen unter ${h.a('feiertage-bayern', 'Feiertage Bayern')}.</p>
<p>Der 15. August ist im katholischen Kirchenjahr das Hochfest der Aufnahme Mariens in den Himmel. In vielen Gemeinden werden an diesem Tag Kräuterbuschen gesegnet, ein Brauch, der vor allem im ländlichen Bayern lebendig ist.</p>
${h.mini('bt', { p: ['ort', 'urlaub'], d: { land: 'BY', jahr: 2028 }, c: 'Brücken 2028 in Bayern planen' })}`,
    },
    en: {
      slug: 'assumption-day', nav: 'Assumption Day', card: 'Municipality search: is 15 August off where you work?',
      title: 'Assumption Day 2027 Germany: holiday in your municipality?',
      description: 'Assumption Day on 15 August: in which Bavarian municipalities is it a public holiday in 2027? Search all 2,056 municipalities, based on the official 2025 list.',
      h1: 'Assumption Day: a holiday in your municipality?',
      intro: 'Type a municipality: the search shows, from the official determination, whether 15 August is a public holiday there and how many holidays the municipality has.',
      resume: `Assumption Day on 15 August is a statewide public holiday in Germany only in Saarland. In Bavaria, Art. 1 of the holiday act makes it a holiday in municipalities with a predominantly Catholic population. The Bavarian State Office for Statistics determines which ones after each census; since 15 August 2025 the determination based on the 2022 census applies. Under it, the day is a holiday in ${en(MP.mit)} of ${en(MP.gemeinden)} municipalities and not in ${en(MP.ohne)}. Every municipality in Upper and Lower Bavaria has it, as do Munich, Augsburg, Regensburg, Würzburg and Ingolstadt. Those without it are mainly in Middle and Upper Franconia, including Nuremberg, Fürth, Erlangen, Bayreuth, Coburg and Hof. What counts is where the workplace is, not where you live. In 2027, 15 August falls on a Sunday, so the distinction does not matter. In 2028 it is a Tuesday, and the Monday before becomes a bridge day in municipalities with the holiday.`,
      faqs: [
        { q: 'Is 15 August a public holiday in Nuremberg?', a: 'No. According to the State Office for Statistics, Nuremberg does not have a predominantly Catholic population, so Assumption Day is a working day there. The same goes for Fürth, Erlangen and Schwabach. In Munich, Augsburg and Regensburg, by contrast, the day is off.' },
        { q: 'How often is the list of municipalities updated?', a: 'After each census. The current determination is based on the 2022 census and has applied since 15 August 2025. Before that, the list based on the 2011 census applied. Individual municipalities can gain or lose the holiday when the share of Catholics shifts.' },
        { q: 'Does the holiday follow where I live or where I work?', a: 'Where you work. What matters is where the business or office is located. Someone living in Fürth and working in Munich has 15 August off; someone living in Munich and working in Fürth does not. Schools are on summer holiday on 15 August anyway.' },
      ],
      body: (h) => `<h2>Assumption Day by administrative region</h2>
<p>The split follows Bavaria's denominational map. Old Bavaria and Swabia are mainly Catholic, parts of Franconia mainly Protestant. The table counts the municipalities on the official list.</p>
${h.table(['Region', 'Municipalities', 'with holiday', 'without holiday'], proBezirk.map((r) => [BEZ_EN[r.b] ?? r.b, r.n, r.ja, r.n - r.ja]), 'Assumption Day in Bavaria by administrative region (State Office for Statistics, 2022 census)', ['l', 'r', 'r', 'r'])}
<p>The source is the ${h.src('by-mh', 'determination of the Bavarian State Office for Statistics')}, which the ${h.src('ftg-by', 'Bavarian holiday act')} expressly provides for. We use the list unchanged; municipality names are in the official spelling, for example with "St" for town (Stadt) and "M" for market town (Markt).</p>
<h2>How many holidays your municipality has</h2>
<p>A Bavarian municipality with Assumption Day has 13 public holidays, one without it 12. The city of Augsburg has 14 with its Peace Festival on 8 August, the most in Germany. In ${h.src('ftg-sl', 'Saarland')} 15 August is off without exception. Every Bavarian holiday with its weekday is on ${h.a('feiertage-bayern', 'public holidays in Bavaria')}.</p>
<p>In the Catholic church year, 15 August is the solemnity of the Assumption of Mary. In many parishes bunches of herbs are blessed that day, a custom still alive above all in rural Bavaria.</p>
${h.mini('bt', { p: ['ort', 'urlaub'], d: { land: 'BY', jahr: 2028 }, c: 'Plan 2028 bridges in Bavaria' })}`,
    },
  }),
  defineGuide({
    id: 'fronleichnam', group: 'feiertage', order: 31, tool: 'ft', toolArg: { land: 'SN', jahr: 2027 },
    countdown: { date: fl(2027), label: { de: 'Fronleichnam 2027', en: 'Corpus Christi 2027' } },
    related: ['feiertage-sachsen', 'feiertage-thueringen', 'feiertage-hessen', 'mariae-himmelfahrt'],
    sources: ['ftg-nw', 'ftg-he', 'ftg-sn', 'sn-fl', 'ftg-th'],
    de: {
      slug: 'fronleichnam', nav: 'Fronleichnam', card: 'Wo der Donnerstag frei ist, auch in Sachsen und Thüringen',
      title: 'Fronleichnam 2027: Datum, Bundesländer, Brückentag',
      description: 'Fronleichnam 2027 am 27. Mai: in welchen Ländern der Tag frei ist, welche Orte in Sachsen und Thüringen dazukommen und wie Sie den Brückentag danach nutzen.',
      h1: 'Fronleichnam 2027: wo der Tag frei ist',
      intro: 'Land und Ort wählen: Die Liste zeigt, ob Fronleichnam bei Ihnen gilt, mit allen übrigen Feiertagen des Jahres und den Arbeitstagen.',
      resume: `Fronleichnam fällt 2027 auf ${wdDe(fl(2027))}, sechzig Tage nach Ostersonntag; 2026 war es der ${wdDe(fl(2026))}, 2028 ist es der ${wdDe(fl(2028))}. Gesetzlicher Feiertag ist Fronleichnam in sechs Ländern ganz: Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und Saarland. In Sachsen gilt er nach der Fronleichnamsverordnung in einzelnen katholisch geprägten Orten der sorbischen Lausitz, etwa in Crostwitz, Ralbitz-Rosenthal oder Wittichenau, in Thüringen in Gemeinden mit überwiegend katholischer Bevölkerung, in denen er schon 1994 Feiertag war, vor allem im Eichsfeld. Fronleichnam fällt immer auf einen Donnerstag. Der Freitag danach ist deshalb einer der zuverlässigsten Brückentage: Ein Urlaubstag ergibt vier freie Tage. 2027 liegt Fronleichnam besonders früh, nur zehn Tage nach Pfingstmontag; mit Himmelfahrt am 6. Mai bilden die drei Feiertage eine Folge von Brücken innerhalb von drei Wochen. Wer im Norden oder Osten ohne den Feiertag arbeitet, hat am 27. Mai einen normalen Arbeitstag.`,
      faqs: [
        { q: 'In welchen Bundesländern ist Fronleichnam frei?', a: 'Landesweit in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland. Dazu kommen einzelne Orte in Sachsen und Thüringen. In Berlin, Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen-Anhalt und Schleswig-Holstein ist Fronleichnam kein gesetzlicher Feiertag. Für Pendler zählt immer der Feiertag am Arbeitsort, nicht am Wohnort.' },
        { q: 'Warum ist Fronleichnam immer an einem Donnerstag?', a: 'Weil das Fest am Donnerstag nach dem Dreifaltigkeitssonntag gefeiert wird, also am sechzigsten Tag nach Ostersonntag. Der Donnerstag erinnert an das letzte Abendmahl am Gründonnerstag. Deshalb verschiebt sich Fronleichnam jedes Jahr mit Ostern, zwischen dem 21. Mai und dem 24. Juni.' },
        { q: 'Welche Orte in Sachsen haben Fronleichnam frei?', a: 'Die Orte, die die sächsische Fronleichnamsverordnung von 1993 aufzählt, in den früheren Landkreisen Bautzen, Hoyerswerda und Kamenz. Dazu gehören unter anderem Crostwitz, Nebelschütz, Ostro, Panschwitz-Kuckau, Ralbitz, Räckelwitz, Rosenthal, Radibor, Neschwitz, Königswartha und Wittichenau. Nach Gemeindefusionen gilt der Feiertag nur im jeweiligen Ortsteil.' },
      ],
      body: (h) => `<h2>Fronleichnam in den nächsten Jahren</h2>
${h.table(['Jahr', 'Datum', 'Brückentag'], [2026, 2027, 2028, 2029, 2030].map((y) => [y, wdDe(fl(y)), new Date(`${K.toIso(K.fromIso(fl(y)) + 1)}T12:00:00Z`).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })]), 'Fronleichnam und der Freitag danach, 2026 bis 2030', ['r', 'l', 'l'])}
<h2>Sachsen und Thüringen: Feiertag nur in Teilen des Landes</h2>
<p>In Sachsen ermächtigt das ${h.src('ftg-sn', 'Sonn- und Feiertagsgesetz')} die Staatsregierung, Fronleichnam für Gemeinden mit überwiegend katholischer Bevölkerung festzulegen. Die ${h.src('sn-fl', 'Fronleichnamsverordnung')} von 1993 nennt diese Orte einzeln; sie liegen im Siedlungsgebiet der katholischen Sorben zwischen Bautzen, Kamenz und Hoyerswerda, wo die Prozessionen zu Fronleichnam bis heute zweisprachig sind.</p>
<p>In Thüringen sieht das ${h.src('ftg-th', 'Feier- und Gedenktagsgesetz')} ebenfalls eine Verordnung vor, die nie erlassen wurde. Es gilt deshalb die Übergangsregel: Fronleichnam bleibt dort Feiertag, wo er es 1994 war. Das betrifft im Wesentlichen den Landkreis Eichsfeld und einzelne katholische Orte im Unstrut-Hainich-Kreis und im Wartburgkreis. Eine amtliche Liste gibt es nicht; im Zweifel weiß es die Gemeindeverwaltung.</p>
<h2>Hessen: Fronleichnam ohne Allerheiligen</h2>
<p>${h.a('feiertage-hessen', 'Hessen')} ist das einzige Land, das Fronleichnam feiert, Allerheiligen aber nicht; in allen anderen Ländern mit Fronleichnam ist auch der 1. November frei. Grundlage ist das ${h.src('ftg-he', 'Hessische Feiertagsgesetz')}. In ${h.src('ftg-nw', 'Nordrhein-Westfalen')} gehören beide Tage zum Gesetz.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { land: 'HE' }, c: 'Brücken um Fronleichnam planen' })}`,
    },
    en: {
      slug: 'corpus-christi', nav: 'Corpus Christi', card: 'Where the Thursday is off, including Saxony and Thuringia',
      title: 'Corpus Christi 2027 Germany: date, states, bridge day',
      description: 'Corpus Christi 2027 falls on 27 May: which German states give the day off, which places in Saxony and Thuringia join them, and how to use the Friday bridge.',
      h1: 'Corpus Christi 2027: where it is a day off',
      intro: 'Pick your state and municipality: the list shows whether Corpus Christi applies to you, with every other holiday of the year and the working days.',
      resume: `Corpus Christi falls on ${wdEn(fl(2027))}, sixty days after Easter Sunday; in 2026 it was ${wdEn(fl(2026))}, and in 2028 it is ${wdEn(fl(2028))}. It is a statutory holiday throughout six states: Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate and Saarland. In Saxony it applies, under the Corpus Christi ordinance, in some Catholic places of Sorbian Lusatia such as Crostwitz, Ralbitz-Rosenthal or Wittichenau; in Thuringia in municipalities with a predominantly Catholic population where it was already a holiday in 1994, mainly in the Eichsfeld. Corpus Christi always falls on a Thursday. The Friday after is therefore one of the most reliable bridge days: one leave day gives four days off. In 2027 Corpus Christi is especially early, only ten days after Whit Monday; together with Ascension Day on 6 May the three holidays form a run of bridges within three weeks. If you work in the north or east without the holiday, 27 May is an ordinary working day.`,
      faqs: [
        { q: 'Which German states have Corpus Christi off?', a: 'Statewide in Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate and Saarland, plus some places in Saxony and Thuringia. In Berlin, Brandenburg, Bremen, Hamburg, Mecklenburg-Western Pomerania, Lower Saxony, Saxony-Anhalt and Schleswig-Holstein Corpus Christi is not a statutory holiday. For commuters, the holiday at the workplace counts.' },
        { q: 'Why is Corpus Christi always on a Thursday?', a: 'Because the feast is held on the Thursday after Trinity Sunday, the sixtieth day after Easter Sunday. The Thursday recalls the Last Supper on Maundy Thursday. So Corpus Christi moves with Easter every year, between 21 May and 24 June.' },
        { q: 'Which places in Saxony have Corpus Christi off?', a: "The places listed in Saxony's 1993 Corpus Christi ordinance, in the former districts of Bautzen, Hoyerswerda and Kamenz. They include Crostwitz, Nebelschütz, Ostro, Panschwitz-Kuckau, Ralbitz, Räckelwitz, Rosenthal, Radibor, Neschwitz, Königswartha and Wittichenau. After municipal mergers the holiday applies only in the village concerned." },
      ],
      body: (h) => `<h2>Corpus Christi in the coming years</h2>
${h.table(['Year', 'Date', 'Bridge day'], [2026, 2027, 2028, 2029, 2030].map((y) => [y, wdEn(fl(y)), new Date(`${K.toIso(K.fromIso(fl(y)) + 1)}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })]), 'Corpus Christi and the Friday after, 2026 to 2030', ['r', 'l', 'l'])}
<h2>Saxony and Thuringia: a holiday in part of the state</h2>
<p>In Saxony the ${h.src('ftg-sn', 'Sunday and holiday act')} lets the state government designate Corpus Christi for municipalities with a predominantly Catholic population. The 1993 ${h.src('sn-fl', 'Corpus Christi ordinance')} names those places one by one; they lie in the area of the Catholic Sorbs between Bautzen, Kamenz and Hoyerswerda, where Corpus Christi processions are still held in two languages.</p>
<p>In Thuringia the ${h.src('ftg-th', 'holiday and commemoration act')} also provides for an ordinance that was never issued. The transitional rule therefore applies: Corpus Christi stays a holiday wherever it was one in 1994. That essentially means the district of Eichsfeld and some Catholic places in the Unstrut-Hainich and Wartburg districts. There is no official list; the local council will know.</p>
<h2>Hesse: Corpus Christi without All Saints'</h2>
<p>${h.a('feiertage-hessen', 'Hesse')} is the only state that keeps Corpus Christi but not All Saints' Day; every other state with Corpus Christi also has 1 November off. The basis is the ${h.src('ftg-he', 'Hesse holiday act')}. In ${h.src('ftg-nw', 'North Rhine-Westphalia')} both days are in the act.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { land: 'HE' }, c: 'Plan bridges around Corpus Christi' })}`,
    },
  }),
];
