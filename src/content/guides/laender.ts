/** Une page par Land : jours fériés 2026 à 2028, ponts 2027, particularités de la loi du Land. Dates : moteur. */
import { defineGuide, type GuideDef, type FAQ, type Helpers } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabelleLand, tabelleBruecken } from '../../lib/bausteine';
import type { Land, Ort } from '../../lib/engine/feiertage';

type L = 'de' | 'en';
interface Txt { slug: string; nav: string; card: string; title: string; description: string; h1: string; intro: string; resume: string; faqs: FAQ[]; text: (h: Helpers) => string }
interface Def { id: string; land: Land; order: number; ort?: Ort; sources: string[]; related: string[]; de: Txt; en: Txt }

const cnt = (land: Land, y: number, ort?: Ort) => K.feiertage(y, land, ort ?? K.ORT_STANDARD(land)).length;
const wk = (land: Land, y: number, ort?: Ort) => K.feiertage(y, land, ort ?? K.ORT_STANDARD(land)).filter((f) => !K.isWeekend(K.fromIso(f.date))).length;
const at = (land: Land, y: number, ort?: Ort) => K.arbeitstage(y, land, ort ?? K.ORT_STANDARD(land)).reduce((a, b) => a + b, 0);
const opt = (land: Land, y: number, b: number, ort?: Ort) => K.optimiere(y, land, ort ?? K.ORT_STANDARD(land), b);

function build(d: Def): GuideDef {
  const body = (lang: L) => (h: Helpers) => {
    const name = h.land(d.land), o = d.ort ?? K.ORT_STANDARD(d.land), p = opt(d.land, 2027, 10, o);
    const T = (de: string, en: string) => (lang === 'de' ? de : en);
    return `<h2>${T(`Feiertage ${name} 2026, 2027 und 2028`, `${name} public holidays 2026, 2027 and 2028`)}</h2>
${tabelleLand(h, d.land, o)}
${d[lang].text(h)}
<h2>${T(`Brückentage 2027 in ${name}`, `Bridge days 2027 in ${name}`)}</h2>
<p>${T(`Mit zehn Urlaubstagen kommen Sie 2027 in ${name} auf ${p.frei} freie Tage am Stück, verteilt auf ${p.bloecke.length} Blöcke. 2028 sind es mit derselben Zahl ${opt(d.land, 2028, 10, o).frei}.`, `With ten leave days you get ${p.frei} consecutive days off in ${name} in 2027, spread over ${p.bloecke.length} blocks. In 2028 the same number buys ${opt(d.land, 2028, 10, o).frei}.`)}</p>
${tabelleBruecken(h, 2027, d.land)}
${h.mini('bt', { p: ['urlaub', 'jahr'], d: { land: d.land }, c: T(`Alle Brücken in ${name} planen`, `Plan every bridge in ${name}`) })}`;
  };
  return defineGuide({
    id: d.id, group: 'laender', order: d.order, tool: 'ft', toolArg: { land: d.land, jahr: 2027 },
    related: d.related, sources: d.sources,
    de: {...d.de, body: body('de') }, en: {...d.en, body: body('en') },
  });
}

/* ------------------------------------------------------------------ Die 16 Länder */
const MH = K.P.bayern_mh;
const M = { de: { mit: MH.mit.toLocaleString('de-DE'), gemeinden: MH.gemeinden.toLocaleString('de-DE'), ohne: MH.ohne }, en: { mit: MH.mit.toLocaleString('en-GB'), gemeinden: MH.gemeinden.toLocaleString('en-GB'), ohne: MH.ohne } };
const DEFS: Def[] = [
  {
    id: 'feiertage-baden-wuerttemberg', land: 'BW', order: 40, sources: ['ftg-bw', 'einigungsvertrag'], related: ['feiertage-bayern', 'feiertage-hessen', 'feiertage-2027', 'home'],
    de: {
      slug: 'feiertage-baden-wuerttemberg', nav: 'Baden-Württemberg', card: `${cnt('BW', 2027)} Feiertage, mit Heilige Drei Könige und Allerheiligen`,
      title: 'Feiertage Baden-Württemberg 2027: alle 12 Termine im Jahr',
      description: 'Feiertage in Baden-Württemberg 2027, 2026 und 2028 mit Datum und Wochentag: Heilige Drei Könige, Fronleichnam, Allerheiligen und die besten Brückentage im Land.',
      h1: 'Feiertage in Baden-Württemberg 2027',
      intro: 'Die gesetzlichen Feiertage in Baden-Württemberg mit Wochentag, die Zahl der Arbeitstage und die Brücken, die 2027 im Land am meisten bringen.',
      resume: `Baden-Württemberg hat ${cnt('BW', 2027)} gesetzliche Feiertage, mehr als die meisten Länder. Zu den neun bundesweiten Tagen kommen nach § 1 des Feiertagsgesetzes das Erscheinungsfest am 6. Januar, im Land meist Heilige Drei Könige genannt, Fronleichnam und Allerheiligen am 1. November. 2027 fallen ${wk('BW', 2027)} davon auf Montag bis Freitag: Heilige Drei Könige ist ein Mittwoch, Fronleichnam ein Donnerstag, Allerheiligen ein Montag. Es bleiben ${at('BW', 2027)} Arbeitstage. Der Gründonnerstag und der Reformationstag sind in Baden-Württemberg nur kirchliche Feiertage: Sie stehen in § 2 des Gesetzes, Geschäfte und Betriebe arbeiten aber normal. Für Brücken ist 2027 der Januar besonders ergiebig, weil Neujahr ein Freitag ist und Heilige Drei Könige mitten in der folgenden Woche liegt. 2028 fallen alle zwölf Feiertage bis auf Neujahr auf Werktage.`,
      faqs: [
        { q: 'Ist Heilige Drei Könige in Baden-Württemberg ein Feiertag?', a: 'Ja. Das Feiertagsgesetz nennt den 6. Januar als Erscheinungsfest; er ist in ganz Baden-Württemberg arbeitsfrei. 2027 fällt er auf einen Mittwoch, 2028 auf einen Donnerstag mit dem Freitag als Brückentag. Außer Baden-Württemberg kennen nur Bayern und Sachsen-Anhalt diesen Feiertag. Schulen und Behörden bleiben geschlossen.' },
        { q: 'Ist Gründonnerstag in Baden-Württemberg frei?', a: 'Nein, nicht als gesetzlicher Feiertag. Der Gründonnerstag steht im Feiertagsgesetz unter den kirchlichen Feiertagen, zusammen mit dem Reformationsfest und dem Buß- und Bettag. An diesen Tagen ist der Gottesdienst geschützt, Arbeit und Handel laufen aber regulär weiter. Viele Schulen haben an diesem Tag allerdings schon Osterferien.' },
        { q: 'Wie viele Arbeitstage hat Baden-Württemberg 2027?', a: `${at('BW', 2027)} Arbeitstage von Montag bis Freitag. Von den ${cnt('BW', 2027)} Feiertagen fallen 2027 nur ${wk('BW', 2027)} auf einen Werktag, weil der 1. Mai, der 3. Oktober und beide Weihnachtstage auf einem Wochenende liegen. 2028 sind es nur ${at('BW', 2028)} Arbeitstage. Bayern liegt 2027 gleichauf.` },
      ],
      text: (h) => `<h2>Was in Baden-Württemberg anders ist</h2>
<p>Baden-Württemberg gehört mit Bayern zu den Ländern mit den meisten Feiertagen. Das ${h.src('ftg-bw', 'Feiertagsgesetz')} stammt in seinen Grundzügen aus den 1950er-Jahren und spiegelt die katholische Prägung großer Teile des Landes, obwohl Württemberg historisch evangelisch ist. Deshalb gelten Fronleichnam und Allerheiligen landesweit, in Stuttgart ebenso wie in Freiburg; eine Unterscheidung nach Gemeinden wie in Bayern gibt es nicht.</p>
<p>Eine Besonderheit ist der 6. Januar: Er ist der einzige Feiertag zwischen Neujahr und Ostern. 2027 liegt er auf einem Mittwoch. Mit zwei Urlaubstagen am 4. und 5. Januar sind Sie vom 1. bis 6. Januar frei; mit zwei weiteren am 7. und 8. Januar reicht die Pause bis zum 10. Januar.</p>`,
    },
    en: {
      slug: 'public-holidays-baden-wuerttemberg', nav: 'Baden-Württemberg', card: `${cnt('BW', 2027)} holidays, including Epiphany and All Saints`,
      title: 'Public holidays Baden-Württemberg 2027: all 12 dates',
      description: 'Public holidays in Baden-Württemberg for 2026 to 2028 with date and weekday: Epiphany, Corpus Christi, All Saints’ Day and the best bridge days in the state.',
      h1: 'Public holidays in Baden-Württemberg 2027',
      intro: "Baden-Württemberg's statutory public holidays with weekdays, the number of working days and the bridges that pay off most in the state in 2027.",
      resume: `Baden-Württemberg has ${cnt('BW', 2027)} statutory public holidays, more than most states. On top of the nine nationwide days, section 1 of its holiday act adds Epiphany on 6 January, Corpus Christi and All Saints' Day on 1 November. In 2027, ${wk('BW', 2027)} of them fall between Monday and Friday: Epiphany is a Wednesday, Corpus Christi a Thursday, All Saints' Day a Monday. That leaves ${at('BW', 2027)} working days. Maundy Thursday and Reformation Day are only church holidays in Baden-Württemberg: they appear in section 2 of the act, but shops and businesses work as normal. For bridges, January 2027 is especially rewarding because New Year's Day is a Friday and Epiphany falls in the middle of the following week. In 2028 every one of the twelve holidays except New Year's Day falls on a weekday.`,
      faqs: [
        { q: 'Is Epiphany a public holiday in Baden-Württemberg?', a: 'Yes. The holiday act lists 6 January as Epiphany and it is a day off throughout Baden-Württemberg. In 2027 it falls on a Wednesday, in 2028 on a Thursday, with the Friday as a bridge day. Apart from Baden-Württemberg, only Bavaria and Saxony-Anhalt keep this holiday.' },
        { q: 'Is Maundy Thursday a day off in Baden-Württemberg?', a: 'No, not as a public holiday. Maundy Thursday is listed in the holiday act among the church holidays, together with Reformation Day and the Day of Repentance and Prayer. Church services are protected on those days, but work and trade carry on as usual.' },
        { q: 'How many working days does Baden-Württemberg have in 2027?', a: `${at('BW', 2027)} working days from Monday to Friday. Of the ${cnt('BW', 2027)} public holidays only ${wk('BW', 2027)} fall on a weekday in 2027, because 1 May, 3 October and both Christmas holidays are on a weekend. In 2028 there are only ${at('BW', 2028)} working days.` },
      ],
      text: (h) => `<h2>What is different in Baden-Württemberg</h2>
<p>Baden-Württemberg is, with Bavaria, one of the states with the most public holidays. Its ${h.src('ftg-bw', 'holiday act')} goes back to the 1950s and reflects the Catholic character of large parts of the state, even though Württemberg was historically Protestant. That is why Corpus Christi and All Saints' Day apply statewide, in Stuttgart as much as in Freiburg; there is no split by municipality as in Bavaria.</p>
<p>6 January stands out: it is the only holiday between New Year and Easter. In 2027 it falls on a Wednesday. Two leave days on 4 and 5 January give you 1 to 6 January off; two more on 7 and 8 January stretch the break to 10 January.</p>`,
    },
  },
  {
    id: 'feiertage-bayern', land: 'BY', order: 41, ort: 'mh', sources: ['ftg-by', 'by-mh', 'einigungsvertrag'], related: ['mariae-himmelfahrt', 'feiertage-baden-wuerttemberg', 'feiertage-2027', 'home'],
    de: {
      slug: 'feiertage-bayern', nav: 'Bayern', card: 'Bis zu 14 Feiertage, je nach Gemeinde',
      title: 'Feiertage Bayern 2027: alle Termine, auch Mariä Himmelfahrt',
      description: 'Feiertage in Bayern 2027, 2026 und 2028: alle Termine mit Wochentag, Mariä Himmelfahrt nach Gemeinde, Augsburger Friedensfest und die Brückentage im Freistaat.',
      h1: 'Feiertage in Bayern 2027, nach Gemeinde',
      intro: 'In Bayern hängt die Zahl der Feiertage vom Ort ab. Wählen Sie Ihre Gemeindeart: Die Liste zeigt jeden Feiertag mit Wochentag und die Arbeitstage.',
      resume: `Bayern hat die meisten Feiertage in Deutschland, aber nicht überall gleich viele. Landesweit gelten nach Art. 1 des Feiertagsgesetzes zwölf Tage: die neun bundesweiten, Heilige Drei Könige, Fronleichnam und Allerheiligen. Mariä Himmelfahrt am 15. August ist nur in Gemeinden mit überwiegend katholischer Bevölkerung Feiertag; das sind nach der Feststellung des Landesamts für Statistik ${M.de.mit} von ${M.de.gemeinden} Gemeinden, darunter München, Regensburg und Würzburg, nicht aber Nürnberg, Fürth oder Erlangen. Die Stadt Augsburg hat zusätzlich am 8. August das Hohe Friedensfest und damit ${cnt('BY', 2027, 'augsburg')} Feiertage, so viele wie kein anderer Ort in Deutschland. 2027 fallen Mariä Himmelfahrt und das Friedensfest auf einen Sonntag, 2028 beide auf einen Dienstag. In einer Gemeinde mit Mariä Himmelfahrt fallen 2027 ${wk('BY', 2027)} von ${cnt('BY', 2027)} Feiertagen auf einen Werktag; es bleiben ${at('BY', 2027)} Arbeitstage.`,
      faqs: [
        { q: 'Ist Mariä Himmelfahrt in ganz Bayern ein Feiertag?', a: `Nein. Der 15. August ist nur in Gemeinden mit überwiegend katholischer Bevölkerung gesetzlicher Feiertag. Welche das sind, stellt das Landesamt für Statistik nach jeder Volkszählung fest; seit August 2025 gilt die Liste auf Grundlage des Zensus 2022 mit ${M.de.mit} von ${M.de.gemeinden} Gemeinden. In Teilen Frankens ist der Tag ein normaler Arbeitstag.` },
        { q: 'Warum hat Augsburg einen Feiertag mehr?', a: 'Weil das bayerische Feiertagsgesetz das Augsburger Hohe Friedensfest am 8. August als Feiertag nur für das Stadtgebiet Augsburg festlegt. Es erinnert an den Westfälischen Frieden von 1648 und die Gleichberechtigung der Konfessionen in der Stadt. Im Landkreis Augsburg gilt der Tag nicht.' },
        { q: 'Wie viele Feiertage hat Bayern 2027?', a: `Je nach Gemeinde ${cnt('BY', 2027, 'std')}, ${cnt('BY', 2027, 'mh')} oder ${cnt('BY', 2027, 'augsburg')}. Zwölf gelten überall, Mariä Himmelfahrt in den meisten Gemeinden, das Friedensfest nur in der Stadt Augsburg. Weil 2027 viele Feiertage auf ein Wochenende fallen, fallen in einer Gemeinde mit Mariä Himmelfahrt nur ${wk('BY', 2027)} auf einen Werktag.` },
        { q: 'Was bringt das Jahr 2028 in Bayern?', a: `2028 ist ein sehr gutes Brückenjahr. Mariä Himmelfahrt fällt auf Dienstag, 15. August, sodass der Montag davor ein Brückentag ist; dazu kommen Brückentage nach Heilige Drei Könige, Himmelfahrt und Fronleichnam und am Montag vor dem 3. Oktober. Zehn Urlaubstage ergeben ${opt('BY', 2028, 10).frei} freie Tage.` },
      ],
      text: (h) => `<h2>Mariä Himmelfahrt und das Friedensfest</h2>
<p>Bayern ist das einzige Land, in dem ein Feiertag von der Konfession der Gemeinde abhängt. Das ${h.src('ftg-by', 'Feiertagsgesetz')} verweist dafür auf eine Feststellung des ${h.src('by-mh', 'Landesamts für Statistik')}, die nach jeder Volkszählung neu getroffen wird. Seit dem 15. August 2025 gilt die Liste auf Grundlage des Zensus 2022: ${M.de.mit} Gemeinden haben den Feiertag, ${M.de.ohne} nicht. Fast alle Gemeinden ohne Feiertag liegen in Mittel- und Oberfranken. Ob Ihre Gemeinde dazugehört, zeigt die ${h.a('mariae-himmelfahrt', 'Gemeindesuche zu Mariä Himmelfahrt')}.</p>
<p>Den Feiertag stellt der Rechner oben unter „Ihr Ort“ ein. Wer in Nürnberg wohnt und in Fürth arbeitet, hat am 15. August normal Dienst; wer in Nürnberg wohnt und in München arbeitet, hat frei. Es zählt der Ort des Betriebs, nicht der Wohnort.</p>`,
    },
    en: {
      slug: 'public-holidays-bavaria', nav: 'Bavaria', card: 'Up to 14 holidays, depending on the municipality',
      title: 'Public holidays Bavaria 2027: all dates, Assumption Day',
      description: 'Public holidays in Bavaria for 2027, 2026 and 2028: every date with weekday, Assumption Day by municipality, the Augsburg Peace Festival and the bridge days.',
      h1: 'Public holidays in Bavaria 2027, by municipality',
      intro: 'In Bavaria the number of holidays depends on where you work. Pick your type of municipality: the list shows each holiday with its weekday and the working days.',
      resume: `Bavaria has the most public holidays in Germany, but not the same number everywhere. Statewide, Art. 1 of the holiday act sets twelve days: the nine nationwide ones plus Epiphany, Corpus Christi and All Saints' Day. Assumption Day on 15 August is a holiday only in municipalities with a predominantly Catholic population; according to the State Office for Statistics that is ${M.en.mit} of ${M.en.gemeinden} municipalities, including Munich, Regensburg and Würzburg but not Nuremberg, Fürth or Erlangen. The city of Augsburg also has the Peace Festival on 8 August and so ${cnt('BY', 2027, 'augsburg')} holidays, more than anywhere else in Germany. In 2027 Assumption Day and the Peace Festival both fall on a Sunday, in 2028 both on a Tuesday. In a municipality with Assumption Day, ${wk('BY', 2027)} of ${cnt('BY', 2027)} holidays fall on a weekday in 2027, leaving ${at('BY', 2027)} working days.`,
      faqs: [
        { q: 'Is Assumption Day a public holiday throughout Bavaria?', a: `No. 15 August is a statutory holiday only in municipalities with a predominantly Catholic population. The State Office for Statistics determines which ones after each census; since August 2025 the list based on the 2022 census applies, with ${M.en.mit} of ${M.en.gemeinden} municipalities. In parts of Franconia the day is an ordinary working day.` },
        { q: 'Why does Augsburg have an extra public holiday?', a: 'Because the Bavarian holiday act makes the Augsburg Peace Festival on 8 August a holiday for the city of Augsburg only. It commemorates the Peace of Westphalia of 1648 and the equal standing of the denominations in the city. It does not apply in the surrounding district of Augsburg.' },
        { q: 'How many public holidays does Bavaria have in 2027?', a: `${cnt('BY', 2027, 'std')}, ${cnt('BY', 2027, 'mh')} or ${cnt('BY', 2027, 'augsburg')}, depending on the municipality. Twelve apply everywhere, Assumption Day in most municipalities and the Peace Festival only in the city of Augsburg. Because many holidays fall on a weekend in 2027, only ${wk('BY', 2027)} land on a weekday in a municipality with Assumption Day.` },
        { q: 'What does 2028 look like in Bavaria?', a: `2028 is an excellent year for bridges. Assumption Day falls on Tuesday 15 August, making the Monday before a bridge day, and there are bridge days after Epiphany, Ascension Day and Corpus Christi and on the Monday before 3 October. Ten leave days buy ${opt('BY', 2028, 10).frei} days off.` },
      ],
      text: (h) => `<h2>Assumption Day and the Peace Festival</h2>
<p>Bavaria is the only state where a public holiday depends on the denomination of the municipality. Its ${h.src('ftg-by', 'holiday act')} relies on a determination by the ${h.src('by-mh', 'State Office for Statistics')}, renewed after each census. Since 15 August 2025 the list based on the 2022 census applies: ${M.en.mit} municipalities keep the holiday, ${M.en.ohne} do not. Almost all municipalities without it are in Middle and Upper Franconia. The ${h.a('mariae-himmelfahrt', 'Assumption Day municipality search')} tells you whether yours is one of them.</p>
<p>Set the holiday under "Your municipality" in the calculator above. Someone living in Nuremberg and working in Fürth works on 15 August; someone living in Nuremberg and working in Munich has the day off. What counts is where the workplace is, not where you live.</p>`,
    },
  },
  {
    id: 'feiertage-berlin', land: 'BE', order: 42, sources: ['ftg-be', 'einigungsvertrag'], related: ['feiertage-brandenburg', 'feiertage-mecklenburg-vorpommern', 'feiertage-2028', 'home'],
    de: {
      slug: 'feiertage-berlin', nav: 'Berlin', card: 'Frauentag am 8. März, 2028 dazu der 17. Juni',
      title: 'Feiertage Berlin 2027: alle Termine, mit Frauentag 8. März',
      description: 'Feiertage in Berlin 2026 bis 2028 mit Datum und Wochentag: Frauentag am 8. März, der einmalige Feiertag am 17. Juni 2028 und die Brückentage in der Hauptstadt.',
      h1: 'Feiertage in Berlin 2027',
      intro: 'Die gesetzlichen Feiertage in Berlin mit Wochentag, die Arbeitstage des Jahres und die Brücken, die 2027 in der Hauptstadt etwas bringen.',
      resume: `Berlin hat 2027 ${cnt('BE', 2027)} gesetzliche Feiertage: die neun bundesweiten und den Internationalen Frauentag am 8. März. Berlin hat ihn 2019 als erstes Land eingeführt; 2027 fällt er auf einen Montag und macht ein langes Wochenende vom 6. bis 8. März. Kirchliche Feiertage wie Fronleichnam, Allerheiligen oder den Reformationstag kennt das Berliner Gesetz nicht, daher gehört Berlin zu den Ländern mit den wenigsten freien Tagen. 2027 fallen nur ${wk('BE', 2027)} Feiertage auf einen Werktag, und es bleiben ${at('BE', 2027)} Arbeitstage, mehr als in den meisten Ländern. 2028 kommt ein einmaliger Feiertag hinzu: Am 17. Juni 2028 erinnert Berlin an den Volksaufstand vom 17. Juni 1953, dessen 75. Jahrestag das Gesetz ausdrücklich zum Feiertag erklärt. Er fällt allerdings auf einen Samstag. Wer in Berlin wohnt und in Brandenburg arbeitet, richtet sich nach den Feiertagen am Arbeitsort.`,
      faqs: [
        { q: 'Ist der 8. März in Berlin ein Feiertag?', a: 'Ja, seit 2019 ist der Internationale Frauentag in Berlin gesetzlicher Feiertag; Berlin war das erste Land. Mecklenburg-Vorpommern folgte 2023. 2027 fällt der 8. März auf einen Montag, 2028 auf einen Mittwoch. In Brandenburg und allen anderen Ländern ist der Tag ein normaler Arbeitstag.' },
        { q: 'Ist der 17. Juni 2028 in Berlin frei?', a: 'Der 17. Juni 2028 ist in Berlin einmalig gesetzlicher Feiertag zum 75. Jahrestag des Volksaufstands von 1953. Weil er auf einen Samstag fällt, bringt er Beschäftigten mit Fünftagewoche keinen zusätzlichen freien Tag. Wer samstags arbeitet, arbeitet an einem Feiertag; Geschäfte bleiben geschlossen.' },
        { q: 'Hat Berlin Fronleichnam oder Reformationstag?', a: 'Nein. Das Berliner Feiertagsgesetz nennt weder Fronleichnam noch Allerheiligen noch den Reformationstag. Wie Hessen und die vier norddeutschen Länder fügt Berlin den neun bundesweiten Feiertagen nur einen eigenen hinzu, hier den Frauentag. Wer in Berlin wohnt und in Brandenburg arbeitet, hat dort aber den Reformationstag frei.' },
      ],
      text: (h) => `<h2>Wenige Feiertage, aber ein besonderer</h2>
<p>Das ${h.src('ftg-be', 'Berliner Feiertagsgesetz')} ist kurz: neun bundesweite Tage, der Frauentag und für 2028 der 17. Juni. Vorher war Berlin mit neun Feiertagen das Schlusslicht unter den Ländern; der Frauentag wurde 2019 auch eingeführt, um diesen Abstand zu verringern. Einmalige Feiertage hat Berlin schon öfter beschlossen, etwa zum 75. Jahrestag des Kriegsendes am 8. Mai 2020 und zum 80. Jahrestag am 8. Mai 2025.</p>
<p>Für die Urlaubsplanung 2027 heißt das: Ostern, Himmelfahrt und Pfingsten tragen fast alles. Der Frauentag am Montag ist ein Bonus, mit vier Urlaubstagen vom 9. bis 12. März werden daraus neun freie Tage.</p>`,
    },
    en: {
      slug: 'public-holidays-berlin', nav: 'Berlin', card: "Women's Day on 8 March, plus 17 June in 2028",
      title: "Public holidays Berlin 2027: all dates, Women's Day 8 March",
      description: "Public holidays in Berlin for 2026 to 2028 with date and weekday: Women's Day on 8 March, the one-off holiday on 17 June 2028 and bridge days in the capital.",
      h1: 'Public holidays in Berlin 2027',
      intro: "Berlin's statutory public holidays with weekdays, the year's working days and the bridges that are worth taking in the capital in 2027.",
      resume: `Berlin has ${cnt('BE', 2027)} statutory public holidays in 2027: the nine nationwide ones plus International Women's Day on 8 March. Berlin introduced it in 2019, the first state to do so; in 2027 it falls on a Monday and makes a long weekend from 6 to 8 March. Berlin's act has no church holidays such as Corpus Christi, All Saints' Day or Reformation Day, so Berlin is among the states with the fewest days off. In 2027 only ${wk('BE', 2027)} holidays fall on a weekday, leaving ${at('BE', 2027)} working days, more than in most states. 2028 adds a one-off holiday: on 17 June 2028 Berlin marks the uprising of 17 June 1953, whose 75th anniversary the act expressly makes a public holiday. It falls on a Saturday, though. If you live in Berlin and work in Brandenburg, the holidays of your workplace apply.`,
      faqs: [
        { q: 'Is 8 March a public holiday in Berlin?', a: "Yes. International Women's Day has been a statutory holiday in Berlin since 2019; Berlin was the first state. Mecklenburg-Western Pomerania followed in 2023. In 2027, 8 March falls on a Monday, in 2028 on a Wednesday. In Brandenburg and every other state it is an ordinary working day." },
        { q: 'Is 17 June 2028 a day off in Berlin?', a: '17 June 2028 is a one-off statutory holiday in Berlin for the 75th anniversary of the 1953 uprising. Because it falls on a Saturday, employees on a five-day week get no extra day off. Anyone who works on Saturdays is working on a public holiday, and shops stay closed.' },
        { q: 'Does Berlin have Corpus Christi or Reformation Day?', a: "No. Berlin's holiday act names neither Corpus Christi nor All Saints' Day nor Reformation Day. Like Hesse and the four northern states, Berlin adds just one holiday of its own to the nine nationwide ones, in Berlin's case Women's Day." },
      ],
      text: (h) => `<h2>Few holidays, but a distinctive one</h2>
<p>The ${h.src('ftg-be', 'Berlin holiday act')} is short: nine nationwide days, Women's Day and, for 2028, 17 June. Before 2019 Berlin trailed all other states with nine holidays; Women's Day was introduced partly to close that gap. Berlin has passed one-off holidays before, for the 75th anniversary of the end of the war on 8 May 2020 and for the 80th on 8 May 2025.</p>
<p>For leave planning in 2027 that means Easter, Ascension Day and Whitsun carry almost everything. Women's Day on a Monday is a bonus: four leave days from 9 to 12 March turn it into nine days off.</p>`,
    },
  },
  {
    id: 'feiertage-brandenburg', land: 'BB', order: 43, sources: ['ftg-bb', 'einigungsvertrag'], related: ['feiertage-berlin', 'feiertage-sachsen', 'ostern-2027', 'home'],
    de: {
      slug: 'feiertage-brandenburg', nav: 'Brandenburg', card: 'Mit Ostersonntag, Pfingstsonntag und Reformationstag',
      title: 'Feiertage Brandenburg 2027: alle Termine und Brückentage',
      description: 'Feiertage in Brandenburg 2026 bis 2028 mit Wochentag: Ostersonntag und Pfingstsonntag als gesetzliche Feiertage, der Reformationstag und die Brückentage.',
      h1: 'Feiertage in Brandenburg 2027',
      intro: 'Die gesetzlichen Feiertage in Brandenburg mit Wochentag, die Arbeitstage und die Brücken, die 2027 im Land am meisten bringen.',
      resume: `Brandenburg zählt auf dem Papier ${cnt('BB', 2027)} Feiertage und liegt damit gleichauf mit Baden-Württemberg. Der Grund ist eine Besonderheit von § 2 des Feiertagsgesetzes: Brandenburg nennt als einziges Land auch Ostersonntag und Pfingstsonntag ausdrücklich als gesetzliche Feiertage. Weil beide immer auf einen Sonntag fallen, bringen sie keinen freien Tag, spielen aber eine Rolle für Zuschläge bei Sonntags- und Feiertagsarbeit, etwa in Krankenhäusern, in der Pflege oder im Verkehr. Dazu kommt der Reformationstag am 31. Oktober, den Brandenburg seit 1991 feiert. Rechnet man die Sonntage heraus, bleiben die neun bundesweiten Tage und der Reformationstag. 2027 fallen nur ${wk('BB', 2027)} Feiertage auf einen Werktag, weil der Reformationstag, der 1. Mai, der 3. Oktober und Weihnachten am Wochenende liegen; es bleiben ${at('BB', 2027)} Arbeitstage, so viele wie in kaum einem anderen Land.`,
      faqs: [
        { q: 'Warum ist Ostersonntag in Brandenburg ein Feiertag?', a: 'Weil das Brandenburger Feiertagsgesetz Ostersonntag und Pfingstsonntag ausdrücklich in die Liste der gesetzlichen Feiertage aufnimmt, was kein anderes Land tut. Einen zusätzlichen freien Tag bringt das nicht, denn beide Tage sind Sonntage. Wer an diesen Tagen arbeitet, arbeitet aber an einem gesetzlichen Feiertag, was für Zuschläge zählen kann.' },
        { q: 'Seit wann ist der Reformationstag in Brandenburg frei?', a: 'Seit 1991, kurz nach der Wiedervereinigung. Die ostdeutschen Länder Brandenburg, Mecklenburg-Vorpommern, Sachsen, Sachsen-Anhalt und Thüringen haben den 31. Oktober damals als Feiertag eingeführt; Bremen, Hamburg, Niedersachsen und Schleswig-Holstein folgten erst 2018. 2027 fällt er auf einen Sonntag. 2028 fällt er auf einen Dienstag.' },
        { q: 'Gelten in Brandenburg die Berliner Feiertage?', a: 'Nein. Brandenburg hat ein eigenes Feiertagsgesetz. Der Frauentag am 8. März und der Berliner Feiertag am 17. Juni 2028 gelten nur in Berlin, der Reformationstag nur in Brandenburg. Für Pendler zählt der Arbeitsort: Wer in Potsdam arbeitet, hat den Reformationstag frei, wer in Berlin arbeitet, den Frauentag.' },
      ],
      text: (h) => `<h2>Zwei Sonntage im Gesetz</h2>
<p>Das ${h.src('ftg-bb', 'Brandenburger Feiertagsgesetz')} ist das einzige, das Ostersonntag und Pfingstsonntag neben die übrigen Feiertage stellt. Für den Kalender ist das ohne Folgen, für Arbeitszeitregeln und Zuschläge kann es zählen, weil manche Tarifverträge für Feiertagsarbeit höhere Zuschläge vorsehen als für Sonntagsarbeit. Für die Brückenplanung lassen wir beide Tage beiseite: Sie liegen ohnehin im freien Wochenende.</p>
<p>Zwischen Berlin und Brandenburg pendeln täglich viele Beschäftigte. Weil der Arbeitsort zählt, lohnt bei einem Wechsel ein Blick in beide Kalender: Brandenburg hat den Reformationstag, Berlin den Frauentag. 2028 fällt der Reformationstag auf einen Dienstag, der Montag davor ist ein echter Brückentag.</p>`,
    },
    en: {
      slug: 'public-holidays-brandenburg', nav: 'Brandenburg', card: 'With Easter Sunday, Whit Sunday and Reformation Day',
      title: 'Public holidays Brandenburg 2027: all dates and bridges',
      description: 'Public holidays in Brandenburg for 2026 to 2028 with weekday: Easter Sunday and Whit Sunday as statutory holidays, Reformation Day and the bridge days.',
      h1: 'Public holidays in Brandenburg 2027',
      intro: "Brandenburg's statutory public holidays with weekdays, the working days and the bridges that pay off most in the state in 2027.",
      resume: `On paper Brandenburg counts ${cnt('BB', 2027)} public holidays, level with Baden-Württemberg. The reason is a quirk of section 2 of its holiday act: Brandenburg is the only state that also lists Easter Sunday and Whit Sunday as statutory holidays. As both always fall on a Sunday they give no day off, but they matter for Sunday and holiday pay supplements, for example in hospitals, care or transport. Reformation Day on 31 October, kept in Brandenburg since 1991, is added too. Leave the Sundays aside and you have the nine nationwide days plus Reformation Day. In 2027 only ${wk('BB', 2027)} holidays fall on a weekday, because Reformation Day, 1 May, 3 October and Christmas are on the weekend; that leaves ${at('BB', 2027)} working days, more than almost any other state.`,
      faqs: [
        { q: 'Why is Easter Sunday a public holiday in Brandenburg?', a: "Because Brandenburg's holiday act expressly includes Easter Sunday and Whit Sunday in its list of statutory holidays, which no other state does. It gives no extra day off, since both are Sundays. But anyone working on those days is working on a statutory holiday, which can count for pay supplements." },
        { q: 'Since when has Reformation Day been a holiday in Brandenburg?', a: 'Since 1991, shortly after reunification. The eastern states of Brandenburg, Mecklenburg-Western Pomerania, Saxony, Saxony-Anhalt and Thuringia introduced 31 October as a holiday then; Bremen, Hamburg, Lower Saxony and Schleswig-Holstein only followed in 2018. In 2027 it falls on a Sunday.' },
        { q: "Do Berlin's public holidays apply in Brandenburg?", a: "No. Brandenburg has its own holiday act. Women's Day on 8 March and Berlin's holiday on 17 June 2028 apply only in Berlin, Reformation Day only in Brandenburg. For commuters the workplace counts: work in Potsdam and you get Reformation Day off, work in Berlin and you get Women's Day." },
      ],
      text: (h) => `<h2>Two Sundays in the act</h2>
<p>The ${h.src('ftg-bb', 'Brandenburg holiday act')} is the only one that puts Easter Sunday and Whit Sunday alongside the other holidays. For the calendar this changes nothing; for working-time rules and pay supplements it can, because some collective agreements pay more for holiday work than for Sunday work. For bridge planning we leave both days aside, since they fall within the weekend anyway.</p>
<p>Many people commute between Berlin and Brandenburg every day. Because the workplace counts, it is worth checking both calendars when you change jobs: Brandenburg has Reformation Day, Berlin has Women's Day. In 2028 Reformation Day falls on a Tuesday, making the Monday before a true bridge day.</p>`,
    },
  },
  {
    id: 'feiertage-bremen', land: 'HB', order: 44, sources: ['ftg-hb', 'einigungsvertrag'], related: ['feiertage-niedersachsen', 'feiertage-hamburg', 'feiertage-2028', 'home'],
    de: {
      slug: 'feiertage-bremen', nav: 'Bremen', card: 'Zehn Feiertage, Reformationstag seit 2018',
      title: 'Feiertage Bremen 2027: alle 10 Termine mit Wochentag',
      description: 'Feiertage in Bremen und Bremerhaven 2026 bis 2028 mit Datum und Wochentag: der Reformationstag seit 2018, die Arbeitstage und die besten Brückentage im Land.',
      h1: 'Feiertage in Bremen 2027',
      intro: 'Die gesetzlichen Feiertage im Land Bremen, also in Bremen und Bremerhaven, mit Wochentag, Arbeitstagen und den Brücken für 2027.',
      resume: `Im Land Bremen, das aus den Städten Bremen und Bremerhaven besteht, gibt es ${cnt('HB', 2027)} gesetzliche Feiertage: die neun bundesweiten und den Reformationstag am 31. Oktober. Ihn hat die Bürgerschaft 2018 eingeführt, nachdem er 2017 zum 500. Jahrestag der Reformation einmalig bundesweit frei gewesen war; Niedersachsen, Hamburg und Schleswig-Holstein entschieden im selben Jahr genauso. Grundlage ist das Gesetz über die Sonn-, Gedenk- und Feiertage von 1954 in der geltenden Fassung. 2027 fällt der Reformationstag auf einen Sonntag, sodass nur ${wk('HB', 2027)} Feiertage auf Werktage fallen und ${at('HB', 2027)} Arbeitstage bleiben. 2028 liegt er auf einem Dienstag: Mit einem Urlaubstag am Montag, 30. Oktober, ergeben sich vier freie Tage. Bremen und Niedersachsen haben seit 2018 denselben Feiertagskalender, was für die vielen Pendler aus dem Umland praktisch ist.`,
      faqs: [
        { q: 'Seit wann ist der Reformationstag in Bremen ein Feiertag?', a: 'Seit 2018. Die Bremische Bürgerschaft hat ihn 2018 beschlossen, im selben Jahr wie Hamburg, Niedersachsen und Schleswig-Holstein. Vorher hatte Bremen nur die neun bundesweiten Feiertage. 2017 war der 31. Oktober zum 500. Reformationsjubiläum in ganz Deutschland einmalig frei. 2027 fällt er auf einen Sonntag.' },
        { q: 'Gelten in Bremerhaven dieselben Feiertage wie in Bremen?', a: 'Ja. Bremerhaven gehört zum Land Bremen, und das Feiertagsgesetz gilt für beide Städte gleichermaßen. Es gibt keine Feiertage, die nur in einer der beiden Städte gelten. Bremerhaven ist zwar von Niedersachsen umgeben, aber auch dort sind die Feiertage seit 2018 dieselben.' },
        { q: 'Welche Brückentage gibt es 2027 in Bremen?', a: 'Nur einen echten: den Freitag, 7. Mai, nach Christi Himmelfahrt. Lohnende längere Brücken liegen um Ostern, mit vier Urlaubstagen vor Karfreitag oder nach Ostermontag für jeweils zehn freie Tage, und nach Pfingstmontag mit vier Urlaubstagen für neun freie Tage. Der Planer oben rechnet aus, wie sich diese Brücken mit Ihrem Urlaub kombinieren lassen.' },
      ],
      text: (h) => `<h2>Ein Stadtstaat mit zwei Städten</h2>
<p>Das ${h.src('ftg-hb', 'Bremer Feiertagsgesetz')} heißt vollständig Gesetz über die Sonn-, Gedenk- und Feiertage. Neben den Feiertagen regelt es stille Tage wie Karfreitag, Volkstrauertag und Totensonntag, an denen öffentliche Tanzveranstaltungen eingeschränkt sind. Arbeitsfrei sind davon nur die gesetzlichen Feiertage.</p>
<p>Mit zehn Feiertagen gehört Bremen zu den Ländern mit dem kürzesten Feiertagskalender. Umso mehr zählt die Lage der beweglichen Feiertage: 2027 liegen Ostern, Himmelfahrt und Pfingsten in zehn Wochen zwischen Ende März und Mitte Mai, danach folgt bis Weihnachten kein Feiertag mehr an einem Werktag.</p>`,
    },
    en: {
      slug: 'public-holidays-bremen', nav: 'Bremen', card: 'Ten holidays, Reformation Day since 2018',
      title: 'Public holidays Bremen 2027: all 10 dates with weekday',
      description: 'Public holidays in Bremen and Bremerhaven for 2026 to 2028 with weekday: Reformation Day since 2018, working days and the best bridge days in the state.',
      h1: 'Public holidays in Bremen 2027',
      intro: 'Statutory public holidays in the state of Bremen, which covers Bremen and Bremerhaven, with weekdays, working days and the bridges for 2027.',
      resume: `The state of Bremen, made up of the cities of Bremen and Bremerhaven, has ${cnt('HB', 2027)} statutory public holidays: the nine nationwide ones plus Reformation Day on 31 October. The state parliament introduced it in 2018, after it had been a one-off nationwide holiday in 2017 for the 500th anniversary of the Reformation; Lower Saxony, Hamburg and Schleswig-Holstein decided the same that year. The legal basis is the 1954 act on Sundays, days of remembrance and public holidays, as amended. In 2027 Reformation Day falls on a Sunday, so only ${wk('HB', 2027)} holidays land on weekdays and ${at('HB', 2027)} working days remain. In 2028 it falls on a Tuesday: one leave day on Monday 30 October gives four days off. Since 2018 Bremen and Lower Saxony have had the same holiday calendar, which suits the many commuters from the surrounding area.`,
      faqs: [
        { q: 'Since when has Reformation Day been a public holiday in Bremen?', a: "Since 2018. Bremen's parliament passed it in 2018, the same year as Hamburg, Lower Saxony and Schleswig-Holstein. Before that Bremen had only the nine nationwide holidays. In 2017, 31 October was a one-off holiday across Germany for the 500th anniversary of the Reformation." },
        { q: 'Does Bremerhaven have the same public holidays as Bremen?', a: 'Yes. Bremerhaven belongs to the state of Bremen and the holiday act applies equally to both cities. No holiday applies in only one of them. Bremerhaven is surrounded by Lower Saxony, but there too the holidays have been the same since 2018.' },
        { q: 'Which bridge days does Bremen have in 2027?', a: 'Only one true bridge day: Friday 7 May, after Ascension Day. Worthwhile longer bridges come around Easter, with four leave days before Good Friday or after Easter Monday for ten days off each, and after Whit Monday, where four leave days give nine days off.' },
      ],
      text: (h) => `<h2>A city state with two cities</h2>
<p>The full name of the ${h.src('ftg-hb', 'Bremen holiday act')} is the act on Sundays, days of remembrance and public holidays. Besides the holidays it sets quiet days such as Good Friday, the national day of mourning and the Sunday of the Dead, on which public dances are restricted. Of these, only the statutory holidays are days off.</p>
<p>With ten holidays Bremen has one of the shortest holiday calendars. That makes the timing of the movable holidays all the more important: in 2027 Easter, Ascension Day and Whitsun fall within ten weeks between late March and mid-May, and after that no holiday falls on a weekday until Christmas.</p>`,
    },
  },
  {
    id: 'feiertage-hamburg', land: 'HH', order: 45, sources: ['ftg-hh', 'einigungsvertrag'], related: ['feiertage-schleswig-holstein', 'feiertage-niedersachsen', 'kalender-2027', 'home'],
    de: {
      slug: 'feiertage-hamburg', nav: 'Hamburg', card: 'Zehn Feiertage, mit Reformationstag',
      title: 'Feiertage Hamburg 2027: alle Termine und die Brückentage',
      description: 'Feiertage in Hamburg 2026 bis 2028 mit Wochentag: der Reformationstag seit 2018, die Arbeitstage des Jahres und die besten Brückentage in der Hansestadt.',
      h1: 'Feiertage in Hamburg 2027',
      intro: 'Die gesetzlichen Feiertage in Hamburg mit Wochentag, die Zahl der Arbeitstage und die Brücken, die 2027 in der Hansestadt lohnen.',
      resume: `Hamburg hat ${cnt('HH', 2027)} gesetzliche Feiertage: die neun bundesweiten und seit 2018 den Reformationstag am 31. Oktober. Die Bürgerschaft hat ihn im Februar 2018 beschlossen, als die norddeutschen Länder einen gemeinsamen zusätzlichen Feiertag suchten; Schleswig-Holstein, Niedersachsen und Bremen entschieden sich für denselben Tag. Damit haben die vier Nordländer einen einheitlichen Kalender, was bei der engen Verflechtung des Hamburger Arbeitsmarkts mit dem Umland hilft. 2027 fällt der Reformationstag auf einen Sonntag und bringt keinen freien Tag; nur ${wk('HH', 2027)} Feiertage liegen auf Werktagen, ${at('HH', 2027)} Arbeitstage bleiben. 2028 ist günstiger: Der Reformationstag ist ein Dienstag, der 3. Oktober ebenfalls, und beide Weihnachtstage fallen auf Montag und Dienstag. Wer 2028 den Montag vor dem 3. Oktober und den vor dem Reformationstag frei nimmt, macht aus je einem Urlaubstag vier freie Tage.`,
      faqs: [
        { q: 'Ist der Reformationstag in Hamburg ein Feiertag?', a: 'Ja, seit 2018. Die Hamburgische Bürgerschaft hat den 31. Oktober im Februar 2018 zum gesetzlichen Feiertag erklärt. Er gilt im ganzen Stadtgebiet. 2026 fiel er auf einen Samstag, 2027 fällt er auf einen Sonntag, 2028 auf einen Dienstag mit dem Montag als Brückentag.' },
        { q: 'Wie viele Arbeitstage hat Hamburg 2027?', a: `${at('HH', 2027)} Arbeitstage von Montag bis Freitag. Das ist ein hoher Wert, weil Hamburg nur zehn Feiertage hat und 2027 davon vier auf ein Wochenende fallen. In Bayern sind es in einer Gemeinde mit Mariä Himmelfahrt ${at('BY', 2027)} Arbeitstage. 2028 sind es nur ${at('HH', 2028)}.` },
        { q: 'Gilt in Hamburg der Buß- und Bettag?', a: 'Nein. Der Buß- und Bettag ist seit 1995 nur noch in Sachsen gesetzlicher Feiertag. In Hamburg ist der Mittwoch vor dem 23. November ein normaler Arbeitstag, auch wenn in Kirchen Gottesdienste stattfinden. Der Tag wurde 1995 zur Finanzierung der Pflegeversicherung gestrichen.' },
      ],
      text: (h) => `<h2>Der Norden einigt sich auf den Reformationstag</h2>
<p>Bis 2017 hatten Hamburg, Bremen, Niedersachsen und Schleswig-Holstein nur die neun bundesweiten Feiertage und lagen damit deutlich hinter dem Süden. Nach dem Reformationsjubiläum suchten die vier Länder einen gemeinsamen zusätzlichen Tag. Diskutiert wurden auch der Tag des Grundgesetzes am 23. Mai und der Frauentag; das ${h.src('ftg-hh', 'Hamburger Feiertagsgesetz')} nennt seit 2018 den Reformationstag.</p>
<p>Für die Urlaubsplanung 2027 bleibt Hamburg damit beim Frühjahr: Ostern, Himmelfahrt und Pfingsten. Ein Blick auf den ${h.a('kalender-2027', 'Kalender 2027')} zeigt, dass zwischen Pfingstmontag und dem ersten Weihnachtstag kein Feiertag auf einen Werktag fällt.</p>`,
    },
    en: {
      slug: 'public-holidays-hamburg', nav: 'Hamburg', card: 'Ten holidays, including Reformation Day',
      title: 'Public holidays Hamburg 2027: all dates and bridge days',
      description: 'Public holidays in Hamburg for 2026 to 2028 with date and weekday: Reformation Day since 2018, the year’s working days and the best bridge days in the city.',
      h1: 'Public holidays in Hamburg 2027',
      intro: "Hamburg's statutory public holidays with weekdays, the number of working days and the bridges worth taking in the city in 2027.",
      resume: `Hamburg has ${cnt('HH', 2027)} statutory public holidays: the nine nationwide ones and, since 2018, Reformation Day on 31 October. The city parliament passed it in February 2018, when the northern states were looking for a shared extra holiday; Schleswig-Holstein, Lower Saxony and Bremen chose the same day. The four northern states thus share one calendar, which helps given how closely Hamburg's labour market is tied to its surroundings. In 2027 Reformation Day falls on a Sunday and gives no day off; only ${wk('HH', 2027)} holidays land on weekdays and ${at('HH', 2027)} working days remain. 2028 is kinder: Reformation Day is a Tuesday, so is 3 October, and both Christmas holidays fall on Monday and Tuesday. Take the Mondays before 3 October and Reformation Day off in 2028 and each single leave day becomes four days off.`,
      faqs: [
        { q: 'Is Reformation Day a public holiday in Hamburg?', a: "Yes, since 2018. Hamburg's parliament made 31 October a statutory holiday in February 2018. It applies throughout the city. In 2026 it fell on a Saturday, in 2027 it falls on a Sunday, and in 2028 on a Tuesday with the Monday as a bridge day." },
        { q: 'How many working days does Hamburg have in 2027?', a: `${at('HH', 2027)} working days from Monday to Friday. That is a high figure, because Hamburg has only ten holidays and four of them fall on a weekend in 2027. In a Bavarian municipality with Assumption Day there are ${at('BY', 2027)} working days.` },
        { q: 'Is the Day of Repentance and Prayer a holiday in Hamburg?', a: 'No. Since 1995 the Day of Repentance and Prayer has been a statutory holiday only in Saxony. In Hamburg the Wednesday before 23 November is an ordinary working day, even though churches hold services. The day was dropped in 1995 to fund long-term care insurance.' },
      ],
      text: (h) => `<h2>The north agrees on Reformation Day</h2>
<p>Until 2017 Hamburg, Bremen, Lower Saxony and Schleswig-Holstein had only the nine nationwide holidays, well behind the south. After the Reformation anniversary the four states looked for a shared extra day. Constitution Day on 23 May and Women's Day were also discussed; since 2018 the ${h.src('ftg-hh', 'Hamburg holiday act')} names Reformation Day.</p>
<p>For leave planning in 2027 Hamburg therefore relies on the spring: Easter, Ascension Day and Whitsun. A look at the ${h.a('kalender-2027', 'calendar 2027')} shows that no holiday falls on a weekday between Whit Monday and Christmas Day.</p>`,
    },
  },
  {
    id: 'feiertage-hessen', land: 'HE', order: 46, sources: ['ftg-he', 'einigungsvertrag'], related: ['feiertage-rheinland-pfalz', 'fronleichnam', 'feiertage-2027', 'home'],
    de: {
      slug: 'feiertage-hessen', nav: 'Hessen', card: 'Zehn Feiertage, mit Fronleichnam',
      title: 'Feiertage Hessen 2027: alle Termine, mit Fronleichnam',
      description: 'Feiertage in Hessen 2026 bis 2028 mit Datum und Wochentag: Fronleichnam als einziger Landesfeiertag, die Arbeitstage und die besten Brückentage im Land Hessen.',
      h1: 'Feiertage in Hessen 2027',
      intro: 'Die gesetzlichen Feiertage in Hessen mit Wochentag, die Arbeitstage des Jahres und die Brücken, die 2027 am meisten bringen.',
      resume: `Hessen hat ${cnt('HE', 2027)} gesetzliche Feiertage. Zu den neun bundesweiten kommt nach § 1 des Hessischen Feiertagsgesetzes nur Fronleichnam hinzu, 2027 am Donnerstag, 27. Mai. Damit ist Hessen das einzige Land, das Fronleichnam feiert, Allerheiligen aber nicht; in Rheinland-Pfalz, Nordrhein-Westfalen, Baden-Württemberg, Bayern und im Saarland gehören beide Tage zusammen. Das Gesetz stammt von 1952 und hat diese Liste seitdem nicht geändert. 2027 fallen ${wk('HE', 2027)} der zehn Feiertage auf einen Werktag, und es bleiben ${at('HE', 2027)} Arbeitstage. Für Brücken heißt das: Neben dem Freitag nach Himmelfahrt hat Hessen mit dem Freitag nach Fronleichnam einen zweiten echten Brückentag. 2028 kommen der Montag vor dem 3. Oktober und die Tage um Weihnachten hinzu, weil beide Feiertage dann auf Werktage fallen. Für Pendler nach Frankfurt aus Rheinland-Pfalz unterscheidet sich der Kalender nur an Allerheiligen.`,
      faqs: [
        { q: 'Ist Allerheiligen in Hessen ein Feiertag?', a: 'Nein. Das Hessische Feiertagsgesetz nennt Fronleichnam, aber nicht Allerheiligen. Der 1. November ist in Hessen ein normaler Arbeitstag. Wer in Wiesbaden arbeitet und in Mainz wohnt, hat ihn deshalb nicht frei; wer in Mainz arbeitet, schon, weil Rheinland-Pfalz Allerheiligen feiert.' },
        { q: 'Ist Fronleichnam 2027 in Hessen frei?', a: 'Ja. Fronleichnam ist in ganz Hessen gesetzlicher Feiertag, 2027 am Donnerstag, 27. Mai. Mit einem Urlaubstag am Freitag, 28. Mai, haben Sie vier Tage am Stück frei. Fronleichnam ist der einzige Feiertag, den Hessen über die neun bundesweiten hinaus hat.' },
        { q: 'Wie viele Arbeitstage hat Hessen 2027?', a: `${at('HE', 2027)} Arbeitstage von Montag bis Freitag. Von den zehn hessischen Feiertagen fallen 2027 ${wk('HE', 2027)} auf einen Werktag. 2028 sind es ${at('HE', 2028)} Arbeitstage, weil der 3. Oktober und Weihnachten dann unter die Woche fallen. In Baden-Württemberg sind es ${at('BW', 2027)}, in Hamburg ${at('HH', 2027)}.` },
      ],
      text: (h) => `<h2>Fronleichnam ja, Allerheiligen nein</h2>
<p>Das ${h.src('ftg-he', 'Hessische Feiertagsgesetz')} zählt in § 1 die Feiertage auf und nennt daneben den Volkstrauertag und den Totensonntag als Gedenk- und Trauertage. Arbeitsfrei sind nur die gesetzlichen Feiertage.</p>
<p>Warum Hessen Fronleichnam, aber nicht Allerheiligen kennt, erklärt die Konfessionsverteilung bei der Gründung: Der Norden und die Mitte des Landes sind überwiegend evangelisch, Teile des Südens und Fulda katholisch. Mehr zu diesem Feiertag in ganz Deutschland steht unter ${h.a('fronleichnam', 'Fronleichnam')}.</p>`,
    },
    en: {
      slug: 'public-holidays-hesse', nav: 'Hesse', card: 'Ten holidays, including Corpus Christi',
      title: 'Public holidays Hesse 2027: all dates, with Corpus Christi',
      description: 'Public holidays in Hesse for 2026 to 2028 with date and weekday: Corpus Christi as the only state holiday, the working days and the best bridge days in Hesse.',
      h1: 'Public holidays in Hesse 2027',
      intro: "Hesse's statutory public holidays with weekdays, the year's working days and the bridges that pay off most in 2027.",
      resume: `Hesse has ${cnt('HE', 2027)} statutory public holidays. Section 1 of the Hesse holiday act adds only Corpus Christi to the nine nationwide ones, on Thursday 27 May in 2027. That makes Hesse the only state that keeps Corpus Christi but not All Saints' Day; in Rhineland-Palatinate, North Rhine-Westphalia, Baden-Württemberg, Bavaria and Saarland the two go together. The act dates from 1952 and its list has not changed since. In 2027, ${wk('HE', 2027)} of the ten holidays fall on a weekday, leaving ${at('HE', 2027)} working days. For bridges this means Hesse has a second true bridge day, the Friday after Corpus Christi, besides the Friday after Ascension Day. In 2028 the Monday before 3 October and the days around Christmas are added, because both holidays then fall on weekdays. For commuters into Frankfurt from Rhineland-Palatinate the calendars differ only on All Saints' Day.`,
      faqs: [
        { q: "Is All Saints' Day a public holiday in Hesse?", a: "No. The Hesse holiday act names Corpus Christi but not All Saints' Day, so 1 November is an ordinary working day in Hesse. If you work in Wiesbaden and live in Mainz you do not get it off; if you work in Mainz you do, because Rhineland-Palatinate keeps All Saints' Day." },
        { q: 'Is Corpus Christi 2027 a day off in Hesse?', a: 'Yes. Corpus Christi is a statutory holiday throughout Hesse, on Thursday 27 May in 2027. One leave day on Friday 28 May gives you four days off in a row. It is the only holiday Hesse has beyond the nine nationwide ones.' },
        { q: 'How many working days does Hesse have in 2027?', a: `${at('HE', 2027)} working days from Monday to Friday. Of Hesse's ten holidays, ${wk('HE', 2027)} fall on a weekday in 2027. In 2028 there are ${at('HE', 2028)} working days, because 3 October and Christmas then fall midweek. By comparison, Baden-Württemberg has ${at('BW', 2027)} and Hamburg ${at('HH', 2027)}.` },
      ],
      text: (h) => `<h2>Corpus Christi yes, All Saints no</h2>
<p>Section 1 of the ${h.src('ftg-he', 'Hesse holiday act')} lists the holidays and also names the national day of mourning and the Sunday of the Dead as days of remembrance. Only the statutory holidays are days off.</p>
<p>Why Hesse keeps Corpus Christi but not All Saints' Day comes down to the denominational mix when the state was founded: the north and centre are mainly Protestant, parts of the south and Fulda Catholic. More about this holiday across Germany is on ${h.a('fronleichnam', 'Corpus Christi')}.</p>`,
    },
  },
  {
    id: 'feiertage-mecklenburg-vorpommern', land: 'MV', order: 47, sources: ['ftg-mv', 'einigungsvertrag'], related: ['feiertage-berlin', 'feiertage-schleswig-holstein', 'feiertage-brandenburg', 'home'],
    de: {
      slug: 'feiertage-mecklenburg-vorpommern', nav: 'Mecklenburg-Vorpommern', card: 'Frauentag seit 2023 und Reformationstag',
      title: 'Feiertage Mecklenburg-Vorpommern 2027: alle 11 Termine',
      description: 'Feiertage in Mecklenburg-Vorpommern 2026 bis 2028 mit Wochentag: Frauentag seit 2023, Reformationstag, die Arbeitstage und die Brückentage an der Ostseeküste.',
      h1: 'Feiertage in Mecklenburg-Vorpommern 2027',
      intro: 'Die gesetzlichen Feiertage in Mecklenburg-Vorpommern mit Wochentag, die Arbeitstage und die Brücken für 2027.',
      resume: `Mecklenburg-Vorpommern hat ${cnt('MV', 2027)} gesetzliche Feiertage. Zu den neun bundesweiten kommen nach § 2 des Feiertagsgesetzes der Reformationstag am 31. Oktober, den das Land seit 1991 feiert, und seit 2023 der Internationale Frauentag am 8. März. Mecklenburg-Vorpommern war damit nach Berlin das zweite Land mit diesem Feiertag; der Landtag wollte zugleich den Abstand zu den Ländern im Süden verringern. 2027 fällt der Frauentag auf einen Montag und ergibt ein langes Wochenende, der Reformationstag dagegen auf einen Sonntag. Insgesamt fallen ${wk('MV', 2027)} Feiertage auf Werktage, und es bleiben ${at('MV', 2027)} Arbeitstage. 2028 sieht deutlich besser aus: Frauentag am Mittwoch, Reformationstag am Dienstag, der 3. Oktober ebenfalls am Dienstag. Mit zehn Urlaubstagen sind 2028 ${opt('MV', 2028, 10).frei} freie Tage möglich, 2027 sind es ${opt('MV', 2027, 10).frei}. Ein Urlaubstag am Freitag, 7. Mai, nach Christi Himmelfahrt ergibt 2027 vier freie Tage am Stück.`,
      faqs: [
        { q: 'Seit wann ist der Frauentag in Mecklenburg-Vorpommern frei?', a: 'Seit 2023. Der Landtag hat den Internationalen Frauentag am 8. März in das Feiertagsgesetz aufgenommen; der erste freie 8. März war ein Mittwoch im Jahr 2023. Außer Mecklenburg-Vorpommern hat nur Berlin diesen Feiertag, dort seit 2019. 2027 fällt er auf einen Montag.' },
        { q: 'Welcher Brückentag lohnt 2027 in Mecklenburg-Vorpommern?', a: 'Der Freitag, 7. Mai, nach Christi Himmelfahrt ist der einzige echte Brückentag. Gut sind außerdem vier Urlaubstage nach dem Frauentag, vom 9. bis 12. März, für neun freie Tage, und vier Urlaubstage vor Karfreitag oder nach Ostermontag für jeweils zehn freie Tage.' },
        { q: 'Hat Mecklenburg-Vorpommern Fronleichnam oder Allerheiligen?', a: 'Nein. Beide Tage sind in Mecklenburg-Vorpommern normale Arbeitstage. Das Land ist überwiegend evangelisch beziehungsweise konfessionslos; landeseigene Feiertage sind nur der Reformationstag und der Frauentag. Wer in einem Betrieb mit Sitz in einem anderen Land arbeitet, richtet sich nach den Feiertagen am Arbeitsort, nicht nach denen am Wohnort.' },
      ],
      text: (h) => `<h2>Zwei landeseigene Feiertage</h2>
<p>Das ${h.src('ftg-mv', 'Feiertagsgesetz Mecklenburg-Vorpommern')} wurde mit Wirkung ab 2023 um den Frauentag ergänzt. Für den Tourismus an der Küste spielen Feiertage eine besondere Rolle: An Feiertagen gelten die Regeln zur Sonntagsruhe, Ausnahmen für Bäderorte regelt das Land gesondert. Für Beschäftigte im Gastgewerbe sind Feiertage deshalb oft Arbeitstage mit Zuschlag.</p>
<p>Wer zwischen Mecklenburg-Vorpommern und Schleswig-Holstein oder Brandenburg pendelt, findet fast denselben Kalender; nur der Frauentag ist eine Besonderheit, die Mecklenburg-Vorpommern mit ${h.a('feiertage-berlin', 'Berlin')} teilt.</p>`,
    },
    en: {
      slug: 'public-holidays-mecklenburg-western-pomerania', nav: 'Mecklenburg-W. Pomerania', card: "Women's Day since 2023 and Reformation Day",
      title: 'Public holidays Mecklenburg-W. Pomerania 2027: all 11',
      description: "Public holidays in Mecklenburg-Western Pomerania for 2026 to 2028 with weekday: Women's Day since 2023, Reformation Day, working days and bridges on the coast.",
      h1: 'Public holidays in Mecklenburg-Western Pomerania 2027',
      intro: "Mecklenburg-Western Pomerania's statutory public holidays with weekdays, the working days and the bridges for 2027.",
      resume: `Mecklenburg-Western Pomerania has ${cnt('MV', 2027)} statutory public holidays. Section 2 of its holiday act adds Reformation Day on 31 October, kept since 1991, and since 2023 International Women's Day on 8 March to the nine nationwide ones. That made it the second state with this holiday after Berlin; the state parliament also wanted to narrow the gap with the southern states. In 2027 Women's Day falls on a Monday and makes a long weekend, while Reformation Day falls on a Sunday. In all, ${wk('MV', 2027)} holidays fall on weekdays and ${at('MV', 2027)} working days remain. 2028 looks much better: Women's Day on a Wednesday, Reformation Day on a Tuesday, and 3 October also on a Tuesday. Ten leave days can buy ${opt('MV', 2028, 10).frei} days off in 2028, against ${opt('MV', 2027, 10).frei} in 2027.`,
      faqs: [
        { q: "Since when has Women's Day been a holiday in Mecklenburg-Western Pomerania?", a: "Since 2023. The state parliament added International Women's Day on 8 March to the holiday act; the first 8 March off was a Wednesday in 2023. Besides Mecklenburg-Western Pomerania only Berlin has this holiday, since 2019. In 2027 it falls on a Monday." },
        { q: 'Which bridge day pays off in Mecklenburg-Western Pomerania in 2027?', a: "Friday 7 May, after Ascension Day, is the only true bridge day. Four leave days after Women's Day, 9 to 12 March, for nine days off, and four leave days before Good Friday or after Easter Monday for ten days off each, are also good." },
        { q: "Does Mecklenburg-Western Pomerania have Corpus Christi or All Saints' Day?", a: 'No. Both are ordinary working days in Mecklenburg-Western Pomerania. The state is mainly Protestant or non-religious; its own holidays are only Reformation Day and Women\'s Day. If your employer is based in another state, the holidays at your workplace apply, not those where you live.' },
      ],
      text: (h) => `<h2>Two holidays of its own</h2>
<p>The ${h.src('ftg-mv', 'Mecklenburg-Western Pomerania holiday act')} was extended with Women's Day with effect from 2023. Holidays matter in a special way for tourism on the coast: Sunday rest rules apply on holidays, and the state regulates exceptions for resort towns separately. For people working in hospitality, holidays are therefore often working days with a supplement.</p>
<p>Commuters between Mecklenburg-Western Pomerania and Schleswig-Holstein or Brandenburg find almost the same calendar; only Women's Day stands out, a holiday the state shares with ${h.a('feiertage-berlin', 'Berlin')}.</p>`,
    },
  },
  {
    id: 'feiertage-niedersachsen', land: 'NI', order: 48, sources: ['ftg-ni', 'einigungsvertrag'], related: ['feiertage-bremen', 'feiertage-nrw', 'feiertage-2027', 'home'],
    de: {
      slug: 'feiertage-niedersachsen', nav: 'Niedersachsen', card: 'Zehn Feiertage, Reformationstag seit 2018',
      title: 'Feiertage Niedersachsen 2027: alle 10 Termine im Überblick',
      description: 'Feiertage in Niedersachsen 2026 bis 2028 mit Wochentag: der Reformationstag seit 2018, kirchliche Feiertage ohne Arbeitsruhe und die besten Brückentage.',
      h1: 'Feiertage in Niedersachsen 2027',
      intro: 'Die gesetzlichen Feiertage in Niedersachsen mit Wochentag, die Arbeitstage und die Brücken, die sich 2027 lohnen.',
      resume: `Niedersachsen hat ${cnt('NI', 2027)} gesetzliche Feiertage: die neun bundesweiten und seit 2018 den Reformationstag am 31. Oktober. Der Landtag hat ihn im Juni 2018 mit großer Mehrheit beschlossen, nach einer lebhaften Debatte, in der auch andere Tage vorgeschlagen wurden. § 2 des Niedersächsischen Feiertagsgesetzes zählt die staatlich anerkannten Feiertage auf; daneben kennt das Gesetz kirchliche Feiertage wie Fronleichnam und Allerheiligen, die in katholisch geprägten Gemeinden geschützt sind, aber keine Arbeitsruhe bringen. 2027 fällt der Reformationstag auf einen Sonntag, sodass nur ${wk('NI', 2027)} Feiertage auf Werktage fallen und ${at('NI', 2027)} Arbeitstage bleiben. Der einzige echte Brückentag 2027 ist der Freitag nach Christi Himmelfahrt. 2028 ändert sich das Bild: Der 3. Oktober und der Reformationstag liegen auf Dienstagen, beide Weihnachtstage auf Montag und Dienstag. Wer 2027 vier Urlaubstage an Ostern einsetzt, ist zehn Tage am Stück frei.`,
      faqs: [
        { q: 'Ist Fronleichnam in Niedersachsen ein Feiertag?', a: 'Nicht als gesetzlicher Feiertag mit Arbeitsruhe. Das Niedersächsische Feiertagsgesetz nennt Fronleichnam und Allerheiligen als kirchliche Feiertage. In Gemeinden, in denen sie traditionell gefeiert werden, ist der Tag als Feiertag geschützt; Beschäftigte haben aber keinen gesetzlichen Anspruch auf einen freien Tag, nur auf Gelegenheit zum Gottesdienst.' },
        { q: 'Wann wurde der Reformationstag in Niedersachsen eingeführt?', a: 'Der Landtag hat das Gesetz im Juni 2018 beschlossen; erster freier Reformationstag war Mittwoch, 31. Oktober 2018. Mit Bremen, Hamburg und Schleswig-Holstein haben damit alle norddeutschen Länder denselben zusätzlichen Feiertag. 2027 fällt er auf einen Sonntag, 2028 auf einen Dienstag mit dem Montag als Brückentag.' },
        { q: 'Wie viele Arbeitstage hat Niedersachsen 2027?', a: `${at('NI', 2027)} Arbeitstage von Montag bis Freitag. Von den zehn Feiertagen fallen 2027 nur ${wk('NI', 2027)} auf einen Werktag. 2028 sind es ${at('NI', 2028)} Arbeitstage. Niedersachsen liegt damit gleichauf mit Bremen, Hamburg und Schleswig-Holstein, die denselben Feiertagskalender haben. Kirchliche Feiertage sind dabei nicht abgezogen.` },
      ],
      text: (h) => `<h2>Staatlich anerkannt und kirchlich</h2>
<p>Das ${h.src('ftg-ni', 'Niedersächsische Feiertagsgesetz')} unterscheidet sorgfältig: Staatlich anerkannte Feiertage sind Tage allgemeiner Arbeitsruhe. Kirchliche Feiertage sind nur während der Gottesdienstzeit geschützt; in Gemeinden, in denen Reformationstag, Fronleichnam oder Allerheiligen schon immer ganztägig gefeiert wurden, gilt der Schutz den ganzen Tag. Frei haben Beschäftigte an kirchlichen Feiertagen nur, wenn Tarif- oder Arbeitsvertrag es vorsehen.</p>
<p>Für die Brückenplanung zählen deshalb nur die zehn staatlich anerkannten Tage. Wer im Emsland oder im Eichsfeld bei einem Betrieb mit katholischer Tradition arbeitet, prüft am besten seinen Vertrag; der Rechner bildet nur die gesetzlichen Feiertage ab.</p>`,
    },
    en: {
      slug: 'public-holidays-lower-saxony', nav: 'Lower Saxony', card: 'Ten holidays, Reformation Day since 2018',
      title: 'Public holidays Lower Saxony 2027: all 10 dates at a glance',
      description: 'Public holidays in Lower Saxony for 2026 to 2028 with date and weekday: Reformation Day since 2018, church holidays without a day off and the best bridge days.',
      h1: 'Public holidays in Lower Saxony 2027',
      intro: "Lower Saxony's statutory public holidays with weekdays, the working days and the bridges worth taking in 2027.",
      resume: `Lower Saxony has ${cnt('NI', 2027)} statutory public holidays: the nine nationwide ones and, since 2018, Reformation Day on 31 October. The state parliament passed it in June 2018 by a large majority after a lively debate in which other days were proposed too. Section 2 of the Lower Saxony holiday act lists the state-recognised holidays; the act also knows church holidays such as Corpus Christi and All Saints' Day, which are protected in Catholic municipalities but bring no day off. In 2027 Reformation Day falls on a Sunday, so only ${wk('NI', 2027)} holidays land on weekdays and ${at('NI', 2027)} working days remain. The only true bridge day in 2027 is the Friday after Ascension Day. 2028 changes the picture: 3 October and Reformation Day fall on Tuesdays, and both Christmas holidays on Monday and Tuesday.`,
      faqs: [
        { q: 'Is Corpus Christi a public holiday in Lower Saxony?', a: 'Not as a statutory holiday with a day off. The Lower Saxony holiday act lists Corpus Christi and All Saints\' Day as church holidays. In municipalities where they are traditionally kept, the day is protected; employees have no statutory right to a day off, only to the opportunity to attend a service.' },
        { q: 'When was Reformation Day introduced in Lower Saxony?', a: 'The state parliament passed the act in June 2018; the first Reformation Day off was Wednesday 31 October 2018. With Bremen, Hamburg and Schleswig-Holstein, every northern state now has the same additional holiday. In 2027 it falls on a Sunday, in 2028 on a Tuesday.' },
        { q: 'How many working days does Lower Saxony have in 2027?', a: `${at('NI', 2027)} working days from Monday to Friday. Of the ten holidays only ${wk('NI', 2027)} fall on a weekday in 2027. In 2028 there are ${at('NI', 2028)} working days. That puts Lower Saxony level with Bremen, Hamburg and Schleswig-Holstein, which share the same calendar.` },
      ],
      text: (h) => `<h2>State-recognised and church holidays</h2>
<p>The ${h.src('ftg-ni', 'Lower Saxony holiday act')} draws a careful line: state-recognised holidays are days of general rest from work. Church holidays are protected only during service times; in municipalities where Reformation Day, Corpus Christi or All Saints' Day have always been kept all day, the protection lasts all day. Employees get church holidays off only if their collective agreement or contract says so.</p>
<p>For bridge planning only the ten state-recognised days count. If you work for an employer with a Catholic tradition in the Emsland or the Eichsfeld, check your contract; the calculator covers statutory holidays only.</p>`,
    },
  },
  {
    id: 'feiertage-nrw', land: 'NW', order: 49, sources: ['ftg-nw', 'einigungsvertrag'], related: ['feiertage-rheinland-pfalz', 'feiertage-niedersachsen', 'arbeitstage-2027', 'home'],
    de: {
      slug: 'feiertage-nrw', nav: 'Nordrhein-Westfalen', card: 'Elf Feiertage, mit Fronleichnam und Allerheiligen',
      title: 'Feiertage NRW 2027: alle 11 Termine und die Brückentage',
      description: 'Feiertage in NRW 2027, 2026 und 2028 mit Datum und Wochentag: Fronleichnam und Allerheiligen, die Arbeitstage und die besten Brückentage in Nordrhein-Westfalen.',
      h1: 'Feiertage in Nordrhein-Westfalen 2027',
      intro: 'Die gesetzlichen Feiertage in NRW mit Wochentag, die Arbeitstage und die Brücken, die 2027 im bevölkerungsreichsten Land am meisten bringen.',
      resume: `Nordrhein-Westfalen hat ${cnt('NW', 2027)} gesetzliche Feiertage: die neun bundesweiten sowie Fronleichnam und Allerheiligen, beide nach § 2 des Feiertagsgesetzes NW. 2027 fällt Fronleichnam auf Donnerstag, 27. Mai, Allerheiligen auf Montag, 1. November. ${wk('NW', 2027)} Feiertage liegen auf Werktagen, ${at('NW', 2027)} Arbeitstage bleiben. Zwei echte Brückentage gibt es: den Freitag nach Christi Himmelfahrt, 7. Mai, und den Freitag nach Fronleichnam, 28. Mai. Mit zehn Urlaubstagen sind 2027 in NRW ${opt('NW', 2027, 10).frei} freie Tage am Stück möglich, 2028 sogar ${opt('NW', 2028, 10).frei}. Rosenmontag ist in Köln, Düsseldorf und anderen Karnevalshochburgen für viele Beschäftigte frei, aber kein gesetzlicher Feiertag; ob Sie ihn frei haben, regelt Ihr Arbeitgeber oder Ihr Tarifvertrag. Für Pendler aus Niedersachsen und Hessen unterscheidet sich der Kalender an Fronleichnam, Allerheiligen und am Reformationstag. Wer beide Freitage frei nimmt, hat mit zwei Urlaubstagen zwei lange Wochenenden von je vier Tagen.`,
      faqs: [
        { q: 'Ist Rosenmontag in NRW ein Feiertag?', a: 'Nein. Rosenmontag steht nicht im Feiertagsgesetz NW und ist rechtlich ein normaler Arbeitstag. Viele Betriebe und Verwaltungen im Rheinland geben ihn trotzdem frei, oft auf Grundlage einer Betriebsvereinbarung oder einer langen Übung. 2027 ist Rosenmontag am 8. Februar. Einen Anspruch darauf gibt es nicht.' },
        { q: 'Ist Allerheiligen 2027 in NRW ein Brückentag?', a: 'Nein, Allerheiligen fällt 2027 auf einen Montag und macht ohne Urlaub ein langes Wochenende vom 30. Oktober bis 1. November. Mit vier Urlaubstagen von Dienstag, 2., bis Freitag, 5. November, werden daraus neun freie Tage. 2028 fällt Allerheiligen auf einen Mittwoch.' },
        { q: 'Wie viele Arbeitstage hat NRW 2027?', a: `${at('NW', 2027)} Arbeitstage von Montag bis Freitag. Von den elf Feiertagen fallen 2027 ${wk('NW', 2027)} auf einen Werktag. 2028 sind es ${at('NW', 2028)} Arbeitstage, weil fast alle Feiertage unter der Woche liegen. Der kürzeste Monat ist der Mai mit nur 18 Arbeitstagen, weil Himmelfahrt, Pfingstmontag und Fronleichnam hineinfallen.` },
        { q: 'Ist der Reformationstag in NRW frei?', a: 'Nein. In Nordrhein-Westfalen ist der 31. Oktober ein normaler Arbeitstag, dafür ist am 1. November Allerheiligen frei. Den Reformationstag feiern die nördlichen und östlichen Länder, darunter das Nachbarland Niedersachsen. Wer in NRW wohnt und in Niedersachsen arbeitet, hat am 31. Oktober frei, am 1. November nicht.' },
      ],
      text: (h) => `<h2>Karneval, Fronleichnam, Allerheiligen</h2>
<p>Das ${h.src('ftg-nw', 'Feiertagsgesetz NW')} gilt in seiner heutigen Fassung seit 1989 und nennt in § 2 elf Feiertage. Daneben schützt es stille Tage wie Karfreitag, Volkstrauertag und Totensonntag. Karnevalstage sind keine Feiertage, auch nicht Weiberfastnacht und Rosenmontag; viele Arbeitgeber im Rheinland geben sie dennoch frei.</p>
<p>Für die Urlaubsplanung 2027 in NRW sind Mai und Juni die stärksten Monate: Himmelfahrt am 6. Mai, Pfingstmontag am 17. Mai, Fronleichnam am 27. Mai. Wer die Arbeitstage zwischen diesen Feiertagen kennt, plant besser; die ${h.a('arbeitstage-2027', 'Arbeitstage 2027')} gibt es je Monat.</p>`,
    },
    en: {
      slug: 'public-holidays-north-rhine-westphalia', nav: 'North Rhine-Westphalia', card: "Eleven holidays, with Corpus Christi and All Saints'",
      title: 'Public holidays NRW 2027: all 11 dates and bridge days',
      description: "Public holidays in North Rhine-Westphalia for 2026 to 2028 with weekday: Corpus Christi and All Saints' Day, working days and the best bridge days in NRW.",
      h1: 'Public holidays in North Rhine-Westphalia 2027',
      intro: "NRW's statutory public holidays with weekdays, the working days and the bridges that pay off most in Germany's most populous state in 2027.",
      resume: `North Rhine-Westphalia has ${cnt('NW', 2027)} statutory public holidays: the nine nationwide ones plus Corpus Christi and All Saints' Day, both under section 2 of the NRW holiday act. In 2027 Corpus Christi falls on Thursday 27 May and All Saints' Day on Monday 1 November. ${wk('NW', 2027)} holidays land on weekdays and ${at('NW', 2027)} working days remain. There are two true bridge days: the Friday after Ascension Day, 7 May, and the Friday after Corpus Christi, 28 May. Ten leave days can buy ${opt('NW', 2027, 10).frei} consecutive days off in NRW in 2027, and as many as ${opt('NW', 2028, 10).frei} in 2028. Carnival Monday is a day off for many employees in Cologne, Düsseldorf and other carnival strongholds, but it is not a statutory holiday; whether you get it off depends on your employer or collective agreement. For commuters from Lower Saxony and Hesse the calendars differ on Corpus Christi, All Saints' Day and Reformation Day.`,
      faqs: [
        { q: 'Is Carnival Monday (Rosenmontag) a public holiday in NRW?', a: 'No. Rosenmontag is not in the NRW holiday act and is legally an ordinary working day. Many employers and public offices in the Rhineland still give it off, often under a works agreement or long-standing practice. In 2027 Rosenmontag falls on 8 February.' },
        { q: "Is All Saints' Day 2027 a bridge in NRW?", a: "No. All Saints' Day falls on a Monday in 2027 and makes a long weekend from 30 October to 1 November without any leave. Four leave days from Tuesday 2 to Friday 5 November turn it into nine days off." },
        { q: 'How many working days does NRW have in 2027?', a: `${at('NW', 2027)} working days from Monday to Friday. Of the eleven holidays, ${wk('NW', 2027)} fall on a weekday in 2027. In 2028 there are ${at('NW', 2028)} working days, as almost every holiday falls midweek. May is the shortest month, with only 18 working days.` },
        { q: 'Is Reformation Day a day off in NRW?', a: "No. In North Rhine-Westphalia 31 October is an ordinary working day; instead, 1 November, All Saints' Day, is off. Reformation Day is kept by the northern and eastern states, including neighbouring Lower Saxony. Live in NRW and work in Lower Saxony, and you get 31 October off but not 1 November." },
      ],
      text: (h) => `<h2>Carnival, Corpus Christi, All Saints'</h2>
<p>The ${h.src('ftg-nw', 'NRW holiday act')} has applied in its current form since 1989 and lists eleven holidays in section 2. It also protects quiet days such as Good Friday, the national day of mourning and the Sunday of the Dead. Carnival days are not holidays, neither Weiberfastnacht nor Rosenmontag, though many employers in the Rhineland give them off.</p>
<p>For leave planning in NRW in 2027, May and June are the strongest months: Ascension Day on 6 May, Whit Monday on 17 May, Corpus Christi on 27 May. Knowing the working days between them helps; ${h.a('arbeitstage-2027', 'working days 2027')} lists them month by month.</p>`,
    },
  },
  {
    id: 'feiertage-rheinland-pfalz', land: 'RP', order: 50, sources: ['ftg-rp', 'einigungsvertrag'], related: ['feiertage-saarland', 'feiertage-hessen', 'feiertage-nrw', 'home'],
    de: {
      slug: 'feiertage-rheinland-pfalz', nav: 'Rheinland-Pfalz', card: 'Elf Feiertage, mit Fronleichnam und Allerheiligen',
      title: 'Feiertage Rheinland-Pfalz 2027: alle 11 Termine im Jahr',
      description: 'Feiertage in Rheinland-Pfalz 2026 bis 2028 mit Datum und Wochentag: Fronleichnam, Allerheiligen, die Arbeitstage des Jahres und die besten Brückentage im Land.',
      h1: 'Feiertage in Rheinland-Pfalz 2027',
      intro: 'Die gesetzlichen Feiertage in Rheinland-Pfalz mit Wochentag, die Arbeitstage und die Brücken, die 2027 im Land lohnen.',
      resume: `Rheinland-Pfalz hat ${cnt('RP', 2027)} gesetzliche Feiertage, genauso viele wie Nordrhein-Westfalen und mit denselben Terminen: die neun bundesweiten, Fronleichnam und Allerheiligen. Grundlage ist § 2 des Landesgesetzes über den Schutz der Sonn- und Feiertage. 2027 liegen ${wk('RP', 2027)} Feiertage auf Werktagen, ${at('RP', 2027)} Arbeitstage bleiben. Fronleichnam am Donnerstag, 27. Mai, und Christi Himmelfahrt am Donnerstag, 6. Mai, ergeben je einen echten Brückentag am Freitag danach. Allerheiligen fällt auf einen Montag. 2028 ist das bessere Jahr: Mit zehn Urlaubstagen sind ${opt('RP', 2028, 10).frei} freie Tage möglich, 2027 sind es ${opt('RP', 2027, 10).frei}. Wer in Rheinland-Pfalz wohnt und in Hessen, etwa in Wiesbaden oder Frankfurt, arbeitet, hat an Allerheiligen keinen Feiertag, weil der Arbeitsort zählt. Umgekehrt haben Pendler aus Hessen nach Mainz den 1. November frei. Wer beide Freitage frei nimmt, bekommt mit nur zwei Urlaubstagen zwei lange Wochenenden.`,
      faqs: [
        { q: 'Ist Fronleichnam in Rheinland-Pfalz ein Feiertag?', a: 'Ja, im ganzen Land. 2027 fällt Fronleichnam auf Donnerstag, 27. Mai, 2028 auf Donnerstag, 15. Juni. Der Freitag danach ist jeweils ein echter Brückentag: ein Urlaubstag, vier freie Tage. In Hessen, wohin viele Rheinland-Pfälzer zur Arbeit pendeln, ist Fronleichnam ebenfalls gesetzlicher Feiertag.' },
        { q: 'Welcher Feiertag fehlt in Rheinland-Pfalz gegenüber dem Saarland?', a: 'Mariä Himmelfahrt am 15. August. Das Saarland feiert ihn landesweit, Rheinland-Pfalz nicht. Sonst haben beide Länder dieselben Feiertage. 2027 spielt der Unterschied keine Rolle, denn der 15. August ist ein Sonntag; 2028 fällt er auf einen Dienstag. Für Pendler ins Saarland zählt der Arbeitsort.' },
        { q: 'Wie viele Arbeitstage hat Rheinland-Pfalz 2027?', a: `${at('RP', 2027)} Arbeitstage von Montag bis Freitag, genauso viele wie Nordrhein-Westfalen. 2028 sind es ${at('RP', 2028)}. Von den elf Feiertagen fallen 2027 ${wk('RP', 2027)} auf einen Werktag; der 1. Mai, der 3. Oktober und beide Weihnachtstage liegen am Wochenende. Der kürzeste Monat ist der Mai.` },
      ],
      text: (h) => `<h2>Zwischen Hessen und dem Saarland</h2>
<p>Das ${h.src('ftg-rp', 'Landesgesetz über den Schutz der Sonn- und Feiertage')} regelt neben den Feiertagen die stillen Tage und die Zeiten des Hauptgottesdienstes, in denen öffentliche Veranstaltungen eingeschränkt sind. Die Liste der Feiertage entspricht der des Nachbarn Nordrhein-Westfalen.</p>
<p>An den Grenzen des Landes unterscheiden sich die Kalender: Hessen hat kein Allerheiligen, das Saarland zusätzlich Mariä Himmelfahrt, Baden-Württemberg Heilige Drei Könige. Für Grenzgänger nach Luxemburg gelten wieder andere Regeln, die der Rechner nicht abbildet.</p>`,
    },
    en: {
      slug: 'public-holidays-rhineland-palatinate', nav: 'Rhineland-Palatinate', card: "Eleven holidays, with Corpus Christi and All Saints'",
      title: 'Public holidays Rhineland-Palatinate 2027: all 11 dates',
      description: "Public holidays in Rhineland-Palatinate for 2026 to 2028 with weekday: Corpus Christi, All Saints' Day, the year's working days and the best bridge days.",
      h1: 'Public holidays in Rhineland-Palatinate 2027',
      intro: "Rhineland-Palatinate's statutory public holidays with weekdays, the working days and the bridges worth taking in 2027.",
      resume: `Rhineland-Palatinate has ${cnt('RP', 2027)} statutory public holidays, the same number and dates as North Rhine-Westphalia: the nine nationwide ones plus Corpus Christi and All Saints' Day. The legal basis is section 2 of the state act protecting Sundays and holidays. In 2027, ${wk('RP', 2027)} holidays fall on weekdays and ${at('RP', 2027)} working days remain. Corpus Christi on Thursday 27 May and Ascension Day on Thursday 6 May each create a true bridge day on the Friday after. All Saints' Day falls on a Monday. 2028 is the better year: ten leave days can buy ${opt('RP', 2028, 10).frei} days off, against ${opt('RP', 2027, 10).frei} in 2027. If you live in Rhineland-Palatinate but work in Hesse, say in Wiesbaden or Frankfurt, you do not get All Saints' Day off, because the workplace counts. Conversely, commuters from Hesse into Mainz do get 1 November off.`,
      faqs: [
        { q: 'Is Corpus Christi a public holiday in Rhineland-Palatinate?', a: 'Yes, throughout the state. In 2027 Corpus Christi falls on Thursday 27 May, in 2028 on Thursday 15 June. The Friday after is a true bridge day each time: one leave day, four days off. It is a holiday in neighbouring Hesse too.' },
        { q: 'Which holiday does Rhineland-Palatinate lack compared with Saarland?', a: 'Assumption Day on 15 August. Saarland keeps it statewide, Rhineland-Palatinate does not. Otherwise the two states have the same holidays. In 2027 the difference does not matter, as 15 August is a Sunday; in 2028 it falls on a Tuesday.' },
        { q: 'How many working days does Rhineland-Palatinate have in 2027?', a: `${at('RP', 2027)} working days from Monday to Friday, the same as North Rhine-Westphalia. In 2028 there are ${at('RP', 2028)}. Of the eleven holidays, ${wk('RP', 2027)} fall on a weekday in 2027; 1 May, 3 October and both Christmas holidays are on a weekend. May is the shortest month.` },
      ],
      text: (h) => `<h2>Between Hesse and Saarland</h2>
<p>Besides the holidays, the ${h.src('ftg-rp', 'state act protecting Sundays and holidays')} sets the quiet days and the hours of the main church service, during which public events are restricted. Its list of holidays matches that of neighbouring North Rhine-Westphalia.</p>
<p>At the state's borders the calendars differ: Hesse has no All Saints' Day, Saarland adds Assumption Day, Baden-Württemberg Epiphany. Cross-border commuters to Luxembourg face different rules again, which the calculator does not cover.</p>`,
    },
  },
  {
    id: 'feiertage-saarland', land: 'SL', order: 51, sources: ['ftg-sl', 'einigungsvertrag'], related: ['feiertage-rheinland-pfalz', 'mariae-himmelfahrt', 'feiertage-2028', 'home'],
    de: {
      slug: 'feiertage-saarland', nav: 'Saarland', card: 'Zwölf Feiertage, mit Mariä Himmelfahrt im ganzen Land',
      title: 'Feiertage Saarland 2027: alle 12 Termine mit Wochentag',
      description: 'Feiertage im Saarland 2026 bis 2028 mit Wochentag: Mariä Himmelfahrt im ganzen Land, Fronleichnam, Allerheiligen und die besten Brückentage im Saarland.',
      h1: 'Feiertage im Saarland 2027',
      intro: 'Die gesetzlichen Feiertage im Saarland mit Wochentag, die Arbeitstage und die Brücken für 2027.',
      resume: `Das Saarland hat ${cnt('SL', 2027)} gesetzliche Feiertage und ist das einzige Land, in dem Mariä Himmelfahrt am 15. August überall frei ist. Nach § 2 des Feiertagsgesetzes kommen zu den neun bundesweiten Tagen Fronleichnam, Mariä Himmelfahrt und Allerheiligen hinzu. Die katholische Prägung des Landes ist bis heute die stärkste aller Länder. 2027 fällt Mariä Himmelfahrt allerdings auf einen Sonntag, sodass nur ${wk('SL', 2027)} Feiertage auf Werktage fallen; es bleiben ${at('SL', 2027)} Arbeitstage. 2028 liegt der 15. August auf einem Dienstag, und der Montag davor wird zu einem zusätzlichen Brückentag. Mit zehn Urlaubstagen sind 2028 ${opt('SL', 2028, 10).frei} freie Tage möglich. Für Grenzgänger nach Frankreich und Luxemburg gelten dort eigene Feiertage; in Lothringen ist der 15. August ebenfalls frei, ebenso in Luxemburg. Mit zehn Urlaubstagen kommen Sie 2027 im Saarland auf ${opt('SL', 2027, 10).frei} freie Tage.`,
      faqs: [
        { q: 'Ist Mariä Himmelfahrt im Saarland ein Feiertag?', a: 'Ja, im ganzen Land. Das Saarland ist das einzige Bundesland, in dem der 15. August ohne Unterschied nach Gemeinde gesetzlicher Feiertag ist. In Bayern gilt er nur in Gemeinden mit überwiegend katholischer Bevölkerung, in allen anderen Ländern gar nicht. 2028 fällt der Tag auf einen Dienstag.' },
        { q: 'Wie viele Feiertage hat das Saarland 2027?', a: `${cnt('SL', 2027)}, davon fallen 2027 aber nur ${wk('SL', 2027)} auf einen Werktag, weil der 1. Mai, Mariä Himmelfahrt, der 3. Oktober und beide Weihnachtstage auf ein Wochenende fallen. 2028 fallen ${wk('SL', 2028)} auf einen Werktag. Damit hat das Saarland so viele Feiertage wie Baden-Württemberg.` },
        { q: 'Welche Brückentage hat das Saarland 2028?', a: 'Echte Brückentage mit einem Urlaubstag sind 2028 der Freitag nach Christi Himmelfahrt, der Freitag nach Fronleichnam, der Montag vor Mariä Himmelfahrt und der Montag vor dem Tag der Deutschen Einheit. Dazu kommen längere Brücken um Allerheiligen und Weihnachten. Der Planer oben rechnet die beste Verteilung aus.' },
      ],
      text: (h) => `<h2>Das katholischste Feiertagsgesetz</h2>
<p>Das ${h.src('ftg-sl', 'saarländische Feiertagsgesetz')} ist das einzige, das Mariä Himmelfahrt ohne Einschränkung nennt. Das Saarland ist bis heute das Land mit dem höchsten Anteil katholischer Bevölkerung. Mit Fronleichnam und Allerheiligen hat es drei Feiertage mehr als die norddeutschen Länder.</p>
<p>Wie der 15. August in Bayern geregelt ist, wo jede Gemeinde einzeln zählt, steht unter ${h.a('mariae-himmelfahrt', 'Mariä Himmelfahrt')}. Für die langfristige Planung lohnt ein Blick auf die ${h.a('feiertage-2028', 'Feiertage 2028')}: Im Saarland fallen dann elf von zwölf Feiertagen auf Werktage.</p>`,
    },
    en: {
      slug: 'public-holidays-saarland', nav: 'Saarland', card: 'Twelve holidays, with Assumption Day statewide',
      title: 'Public holidays Saarland 2027: all 12 dates with weekday',
      description: "Public holidays in Saarland for 2026 to 2028 with weekday: Assumption Day statewide, Corpus Christi, All Saints' Day and the best bridge days in the state.",
      h1: 'Public holidays in Saarland 2027',
      intro: "Saarland's statutory public holidays with weekdays, the working days and the bridges for 2027.",
      resume: `Saarland has ${cnt('SL', 2027)} statutory public holidays and is the only state where Assumption Day on 15 August is a day off everywhere. Section 2 of its holiday act adds Corpus Christi, Assumption Day and All Saints' Day to the nine nationwide days. The state's Catholic character is still the strongest of all sixteen. In 2027, though, Assumption Day falls on a Sunday, so only ${wk('SL', 2027)} holidays land on weekdays, leaving ${at('SL', 2027)} working days. In 2028, 15 August falls on a Tuesday and the Monday before becomes an extra bridge day. Ten leave days can buy ${opt('SL', 2028, 10).frei} days off in 2028. Cross-border commuters to France and Luxembourg follow those countries' holidays at work; 15 August is a holiday in Lorraine and in Luxembourg too.`,
      faqs: [
        { q: 'Is Assumption Day a public holiday in Saarland?', a: 'Yes, throughout the state. Saarland is the only German state where 15 August is a statutory holiday regardless of municipality. In Bavaria it applies only in municipalities with a predominantly Catholic population, and in every other state not at all.' },
        { q: 'How many public holidays does Saarland have in 2027?', a: `${cnt('SL', 2027)}, but only ${wk('SL', 2027)} of them fall on a weekday in 2027, because 1 May, Assumption Day, 3 October and both Christmas holidays are on a weekend. In 2028, ${wk('SL', 2028)} fall on a weekday. That is as many as Baden-Württemberg.` },
        { q: 'Which bridge days does Saarland have in 2028?', a: 'True bridge days needing one leave day in 2028 are the Friday after Ascension Day, the Friday after Corpus Christi, the Monday before Assumption Day and the Monday before German Unity Day. Longer bridges come around All Saints\' Day and Christmas.' },
      ],
      text: (h) => `<h2>The most Catholic holiday act</h2>
<p>The ${h.src('ftg-sl', 'Saarland holiday act')} is the only one that names Assumption Day without restriction. Saarland still has the highest share of Catholics of any state. With Corpus Christi and All Saints' Day it has three more holidays than the northern states.</p>
<p>How 15 August works in Bavaria, where each municipality counts separately, is explained on ${h.a('mariae-himmelfahrt', 'Assumption Day')}. For long-term planning, see ${h.a('feiertage-2028', 'public holidays 2028')}: in Saarland eleven of twelve holidays then fall on weekdays.</p>`,
    },
  },
  {
    id: 'feiertage-sachsen', land: 'SN', order: 52, sources: ['ftg-sn', 'sn-fl', 'einigungsvertrag'], related: ['fronleichnam', 'feiertage-thueringen', 'feiertage-sachsen-anhalt', 'home'],
    de: {
      slug: 'feiertage-sachsen', nav: 'Sachsen', card: 'Mit Buß- und Bettag und Fronleichnam in der Lausitz',
      title: 'Feiertage Sachsen 2027: alle Termine, Buß- und Bettag',
      description: 'Feiertage in Sachsen 2026 bis 2028 mit Wochentag: Buß- und Bettag, Reformationstag, Fronleichnam in den sorbischen Gemeinden und die besten Brückentage.',
      h1: 'Feiertage in Sachsen 2027',
      intro: 'Die gesetzlichen Feiertage in Sachsen mit Wochentag, auch Fronleichnam in der Lausitz, die Arbeitstage und die Brücken für 2027.',
      resume: `Sachsen hat ${cnt('SN', 2027)} landesweite Feiertage: die neun bundesweiten, den Reformationstag am 31. Oktober und als einziges Land den Buß- und Bettag, 2027 am Mittwoch, 17. November. Dazu kommt Fronleichnam, das nach der Fronleichnamsverordnung nur in einigen katholisch geprägten Orten der sorbischen Lausitz um Bautzen, Kamenz und Hoyerswerda Feiertag ist, etwa in Crostwitz, Panschwitz-Kuckau, Ralbitz-Rosenthal oder Wittichenau. Dort sind es ${cnt('SN', 2027, 'fl')} Feiertage. Der Buß- und Bettag blieb in Sachsen erhalten, als die anderen Länder ihn 1995 zur Finanzierung der Pflegeversicherung strichen; dafür zahlen Beschäftigte in Sachsen einen höheren Anteil am Pflegebeitrag. 2027 fallen ${wk('SN', 2027)} landesweite Feiertage auf Werktage, ${at('SN', 2027)} Arbeitstage bleiben. Der Buß- und Bettag am Mittwoch lässt sich mit zwei Urlaubstagen zu fünf freien Tagen verlängern. Mit zehn Urlaubstagen sind 2027 in Sachsen ${opt('SN', 2027, 10).frei} freie Tage möglich.`,
      faqs: [
        { q: 'Warum ist der Buß- und Bettag nur in Sachsen frei?', a: 'Weil die Länder 1995 zur Finanzierung der neuen Pflegeversicherung einen Feiertag streichen sollten. Alle Länder außer Sachsen strichen den Buß- und Bettag. Sachsen behielt ihn; im Ausgleich tragen Beschäftigte dort einen um 0,5 Prozentpunkte höheren Anteil am Beitrag zur Pflegeversicherung, der Arbeitgeber entsprechend weniger.' },
        { q: 'Wo ist Fronleichnam in Sachsen ein Feiertag?', a: 'Nur in den Orten, die die sächsische Fronleichnamsverordnung aufzählt. Es sind katholisch geprägte, meist sorbische Gemeinden und Gemeindeteile in den früheren Landkreisen Bautzen, Kamenz und Hoyerswerda, darunter Crostwitz, Nebelschütz, Panschwitz-Kuckau, Ralbitz-Rosenthal, Räckelwitz, Radibor und Wittichenau. Im übrigen Sachsen ist der Tag ein Arbeitstag.' },
        { q: 'Wann ist der Buß- und Bettag 2027?', a: 'Am Mittwoch, 17. November 2027. Er ist immer der Mittwoch vor dem letzten Sonntag des Kirchenjahres, also vor dem Totensonntag, und fällt damit stets zwischen den 16. und den 22. November. 2026 war es der 18. November, 2028 ist es der 22. November.' },
      ],
      text: (h) => `<h2>Buß- und Bettag und die sorbischen Gemeinden</h2>
<p>Das ${h.src('ftg-sn', 'sächsische Sonn- und Feiertagsgesetz')} nennt in § 1 elf landesweite Feiertage und ermächtigt die Staatsregierung, Fronleichnam für Gemeinden mit überwiegend katholischer Bevölkerung festzulegen. Die ${h.src('sn-fl', 'Fronleichnamsverordnung')} zählt diese Orte einzeln auf; die meisten liegen im Siedlungsgebiet der katholischen Sorben zwischen Bautzen, Kamenz und Hoyerswerda. Im Rechner wählen Sie unter „Ihr Ort“, ob Fronleichnam bei Ihnen gilt.</p>
<p>2027 liegt der Buß- und Bettag am Mittwoch, 17. November. Wer Montag und Dienstag oder Donnerstag und Freitag frei nimmt, hat fünf Tage am Stück. Mehr zu Fronleichnam, auch in Thüringen, unter ${h.a('fronleichnam', 'Fronleichnam')}.</p>`,
    },
    en: {
      slug: 'public-holidays-saxony', nav: 'Saxony', card: 'With the Day of Repentance and Corpus Christi in Lusatia',
      title: 'Public holidays Saxony 2027: all dates, Day of Repentance',
      description: 'Public holidays in Saxony for 2026 to 2028 with weekday: Day of Repentance and Prayer, Reformation Day, Corpus Christi in Sorbian villages and bridge days.',
      h1: 'Public holidays in Saxony 2027',
      intro: "Saxony's statutory public holidays with weekdays, including Corpus Christi in Lusatia, the working days and the bridges for 2027.",
      resume: `Saxony has ${cnt('SN', 2027)} statewide public holidays: the nine nationwide ones, Reformation Day on 31 October and, uniquely, the Day of Repentance and Prayer, on Wednesday 17 November in 2027. Corpus Christi is added only in some Catholic places of Sorbian Lusatia around Bautzen, Kamenz and Hoyerswerda, as listed in the Corpus Christi ordinance, for example Crostwitz, Panschwitz-Kuckau, Ralbitz-Rosenthal or Wittichenau. There the count is ${cnt('SN', 2027, 'fl')}. Saxony kept the Day of Repentance when the other states dropped it in 1995 to fund long-term care insurance; in return, employees in Saxony pay a larger share of the care insurance contribution. In 2027, ${wk('SN', 2027)} statewide holidays fall on weekdays and ${at('SN', 2027)} working days remain. The Wednesday Day of Repentance can be stretched to five days off with two leave days.`,
      faqs: [
        { q: 'Why is the Day of Repentance and Prayer a holiday only in Saxony?', a: 'Because in 1995 the states had to drop a holiday to fund the new long-term care insurance. Every state except Saxony dropped the Day of Repentance. Saxony kept it; in exchange, employees there pay a 0.5 percentage point larger share of the care insurance contribution and employers correspondingly less.' },
        { q: 'Where is Corpus Christi a public holiday in Saxony?', a: "Only in the places listed in Saxony's Corpus Christi ordinance: Catholic, mostly Sorbian municipalities and villages in the former districts of Bautzen, Kamenz and Hoyerswerda, including Crostwitz, Nebelschütz, Panschwitz-Kuckau, Ralbitz-Rosenthal, Räckelwitz, Radibor and Wittichenau. Elsewhere in Saxony it is a working day." },
        { q: 'When is the Day of Repentance and Prayer in 2027?', a: 'On Wednesday 17 November 2027. It is always the Wednesday before the last Sunday of the church year, the Sunday of the Dead, so it always falls between 16 and 22 November. In 2026 it was on 18 November, in 2028 it is on 22 November. It always falls on the Wednesday before the Sunday of the Dead. Schools in Saxony are closed that day too.' },
      ],
      text: (h) => `<h2>The Day of Repentance and the Sorbian municipalities</h2>
<p>Section 1 of ${h.src('ftg-sn', "Saxony's Sunday and holiday act")} lists eleven statewide holidays and lets the state government designate Corpus Christi for municipalities with a predominantly Catholic population. The ${h.src('sn-fl', 'Corpus Christi ordinance')} names those places one by one; most lie in the area of the Catholic Sorbs between Bautzen, Kamenz and Hoyerswerda. In the calculator, choose under "Your municipality" whether Corpus Christi applies to you.</p>
<p>In 2027 the Day of Repentance falls on Wednesday 17 November. Take Monday and Tuesday or Thursday and Friday off and you have five days in a row. More on Corpus Christi, including Thuringia, is on ${h.a('fronleichnam', 'Corpus Christi')}.</p>`,
    },
  },
  {
    id: 'feiertage-sachsen-anhalt', land: 'ST', order: 53, sources: ['ftg-st', 'einigungsvertrag'], related: ['feiertage-sachsen', 'feiertage-thueringen', 'feiertage-baden-wuerttemberg', 'home'],
    de: {
      slug: 'feiertage-sachsen-anhalt', nav: 'Sachsen-Anhalt', card: 'Mit Heilige Drei Könige und Reformationstag',
      title: 'Feiertage Sachsen-Anhalt 2027: alle 11 Termine im Jahr',
      description: 'Feiertage in Sachsen-Anhalt 2026 bis 2028 mit Datum und Wochentag: Heilige Drei Könige, der Reformationstag im Lutherland und die besten Brückentage im Jahr.',
      h1: 'Feiertage in Sachsen-Anhalt 2027',
      intro: 'Die gesetzlichen Feiertage in Sachsen-Anhalt mit Wochentag, die Arbeitstage und die Brücken, die 2027 lohnen.',
      resume: `Sachsen-Anhalt hat ${cnt('ST', 2027)} gesetzliche Feiertage: die neun bundesweiten, Heilige Drei Könige am 6. Januar und den Reformationstag am 31. Oktober. Damit ist es das einzige ostdeutsche Land mit Heilige Drei Könige, das sonst nur Baden-Württemberg und Bayern feiern, obwohl Katholiken in Sachsen-Anhalt eine kleine Minderheit sind. Der Reformationstag hat hier besonderes Gewicht: In Wittenberg hat Martin Luther 1517 seine Thesen veröffentlicht, Eisleben ist sein Geburts- und Sterbeort. 2027 fällt Heilige Drei Könige auf einen Mittwoch, der Reformationstag auf einen Sonntag. ${wk('ST', 2027)} Feiertage liegen auf Werktagen, ${at('ST', 2027)} Arbeitstage bleiben. Der Jahresanfang 2027 ist besonders günstig: Neujahr am Freitag, Heilige Drei Könige am Mittwoch, dazwischen zwei Arbeitstage. Mit vier Urlaubstagen sind Sie vom 1. bis 10. Januar frei. Mit zehn Urlaubstagen sind im ganzen Jahr ${opt('ST', 2027, 10).frei} freie Tage möglich.`,
      faqs: [
        { q: 'Ist Heilige Drei Könige in Sachsen-Anhalt ein Feiertag?', a: 'Ja. Das Feiertagsgesetz des Landes nennt den 6. Januar als Feiertag. Sachsen-Anhalt ist damit das einzige Land im Osten mit diesem Tag; außerdem gilt er nur in Baden-Württemberg und Bayern. 2027 ist der 6. Januar ein Mittwoch, 2028 ein Donnerstag.' },
        { q: 'Welche Brücken lohnen in Sachsen-Anhalt Anfang 2027?', a: 'Zwei Urlaubstage am 4. und 5. Januar ergeben sechs freie Tage vom 1. bis 6. Januar; mit zwei weiteren am 7. und 8. Januar reicht die Pause bis Sonntag, 10. Januar. Das ist mit vier Urlaubstagen für zehn freie Tage eine der besten Brücken des Jahres.' },
        { q: 'Wie viele Arbeitstage hat Sachsen-Anhalt 2027?', a: `${at('ST', 2027)} Arbeitstage von Montag bis Freitag. Von den elf Feiertagen fallen 2027 ${wk('ST', 2027)} auf einen Werktag. 2028 sind es ${at('ST', 2028)} Arbeitstage. Am Jahresanfang fehlt mit Heilige Drei Könige ein Arbeitstag, den die meisten anderen Länder haben; im Juni gibt es dafür keinen Feiertag wie Fronleichnam.` },
      ],
      text: (h) => `<h2>Im Lutherland: Reformationstag und Dreikönig</h2>
<p>Das ${h.src('ftg-st', 'Feiertagsgesetz Sachsen-Anhalt')} nennt seit Anfang der 1990er-Jahre neben dem Reformationstag auch Heilige Drei Könige. Seitdem hat das Land elf Feiertage, so viele wie Nordrhein-Westfalen oder Sachsen, aber eine andere Verteilung über das Jahr: Zwei Feiertage liegen am Jahresanfang und im Herbst, keiner im Juni.</p>
<p>Für Pendler nach Sachsen fehlt der Buß- und Bettag, nach Thüringen der Weltkindertag; dafür haben beide Nachbarn keinen 6. Januar.</p>`,
    },
    en: {
      slug: 'public-holidays-saxony-anhalt', nav: 'Saxony-Anhalt', card: 'With Epiphany and Reformation Day',
      title: 'Public holidays Saxony-Anhalt 2027: all 11 dates in a year',
      description: "Public holidays in Saxony-Anhalt for 2026 to 2028 with date and weekday: Epiphany, Reformation Day in Luther's homeland and the best bridge days of the year.",
      h1: 'Public holidays in Saxony-Anhalt 2027',
      intro: "Saxony-Anhalt's statutory public holidays with weekdays, the working days and the bridges worth taking in 2027.",
      resume: `Saxony-Anhalt has ${cnt('ST', 2027)} statutory public holidays: the nine nationwide ones plus Epiphany on 6 January and Reformation Day on 31 October. That makes it the only eastern state with Epiphany, otherwise kept only by Baden-Württemberg and Bavaria, even though Catholics are a small minority in Saxony-Anhalt. Reformation Day carries special weight here: Martin Luther published his theses in Wittenberg in 1517, and Eisleben is where he was born and died. In 2027 Epiphany falls on a Wednesday and Reformation Day on a Sunday. ${wk('ST', 2027)} holidays fall on weekdays and ${at('ST', 2027)} working days remain. The start of 2027 is especially good: New Year's Day on Friday, Epiphany on Wednesday, two working days in between. Four leave days give you 1 to 10 January off.`,
      faqs: [
        { q: 'Is Epiphany a public holiday in Saxony-Anhalt?', a: "Yes. The state's holiday act lists 6 January as a holiday. Saxony-Anhalt is the only eastern state with this day; it otherwise applies only in Baden-Württemberg and Bavaria. In 2027, 6 January is a Wednesday, in 2028 a Thursday. Schools and offices are closed." },
        { q: 'Which bridges pay off in Saxony-Anhalt in early 2027?', a: 'Two leave days on 4 and 5 January give six days off from 1 to 6 January; two more on 7 and 8 January stretch the break to Sunday 10 January. Four leave days for ten days off makes it one of the best bridges of the year.' },
        { q: 'How many working days does Saxony-Anhalt have in 2027?', a: `${at('ST', 2027)} working days from Monday to Friday. Of the eleven holidays, ${wk('ST', 2027)} fall on a weekday in 2027. In 2028 there are ${at('ST', 2028)} working days. Epiphany costs a working day early in the year that most other states keep; in June there is no holiday like Corpus Christi.` },
      ],
      text: (h) => `<h2>Luther country: Reformation Day and Epiphany</h2>
<p>Since the early 1990s the ${h.src('ftg-st', 'Saxony-Anhalt holiday act')} has named Epiphany alongside Reformation Day. Since then the state has had eleven holidays, as many as North Rhine-Westphalia or Saxony, but spread differently over the year: two holidays at the start of the year and in the autumn, none in June.</p>
<p>Commuters to Saxony miss the Day of Repentance, those to Thuringia World Children's Day; but neither neighbour has 6 January.</p>`,
    },
  },
  {
    id: 'feiertage-schleswig-holstein', land: 'SH', order: 54, sources: ['ftg-sh', 'einigungsvertrag'], related: ['feiertage-hamburg', 'feiertage-mecklenburg-vorpommern', 'feiertage-2028', 'home'],
    de: {
      slug: 'feiertage-schleswig-holstein', nav: 'Schleswig-Holstein', card: 'Zehn Feiertage, Reformationstag seit 2018',
      title: 'Feiertage Schleswig-Holstein 2027: alle 10 Termine im Jahr',
      description: 'Feiertage in Schleswig-Holstein 2026 bis 2028 mit Wochentag: der Reformationstag seit 2018, die Arbeitstage des Jahres und die besten Brückentage im Land.',
      h1: 'Feiertage in Schleswig-Holstein 2027',
      intro: 'Die gesetzlichen Feiertage in Schleswig-Holstein mit Wochentag, die Arbeitstage und die Brücken für 2027.',
      resume: `Schleswig-Holstein hat ${cnt('SH', 2027)} gesetzliche Feiertage: die neun bundesweiten und seit 2018 den Reformationstag. Der Landtag in Kiel hat ihn im Februar 2018 als erstes der vier norddeutschen Länder beschlossen, nach einer Debatte, in der auch ein weltlicher Feiertag erwogen wurde. Grundlage ist § 2 des Gesetzes über Sonn- und Feiertage. 2027 liegt der Reformationstag auf einem Sonntag, sodass nur ${wk('SH', 2027)} Feiertage auf Werktage fallen und ${at('SH', 2027)} Arbeitstage bleiben, so viele wie in Bremen, Hamburg oder Niedersachsen. Der einzige echte Brückentag 2027 ist der Freitag nach Christi Himmelfahrt. Ergiebiger sind die Wochen um Ostern und nach Pfingsten. 2028 bringt der Reformationstag am Dienstag einen echten Brückentag am Montag, 30. Oktober, und der 3. Oktober am Dienstag einen weiteren am 2. Oktober. Mit zehn Urlaubstagen sind 2028 ${opt('SH', 2028, 10).frei} freie Tage möglich.`,
      faqs: [
        { q: 'Ist der Reformationstag in Schleswig-Holstein frei?', a: 'Ja, seit 2018. Schleswig-Holstein hat den 31. Oktober im Februar 2018 als erstes norddeutsches Land zum gesetzlichen Feiertag gemacht; Hamburg, Niedersachsen und Bremen folgten. 2027 fällt er auf einen Sonntag, 2028 auf einen Dienstag. Vorher hatte das Land nur die neun bundesweiten Feiertage.' },
        { q: 'Wie viele Feiertage hat Schleswig-Holstein?', a: `${cnt('SH', 2027)}: die neun bundesweiten Feiertage und den Reformationstag. Fronleichnam, Allerheiligen, Heilige Drei Könige und der Buß- und Bettag sind in Schleswig-Holstein normale Arbeitstage. Das sind so viele wie in Bremen, Hamburg und Niedersachsen. Wer in Dänemark arbeitet, richtet sich nach den dänischen Feiertagen.` },
        { q: 'Welche Brückentage hat Schleswig-Holstein 2028?', a: 'Echte Brückentage 2028 sind der Freitag, 26. Mai, nach Christi Himmelfahrt, der Montag, 2. Oktober, vor dem Tag der Deutschen Einheit und der Montag, 30. Oktober, vor dem Reformationstag. Weihnachten 2028 fällt auf Montag und Dienstag: Drei Urlaubstage vom 27. bis 29. Dezember ergeben zehn freie Tage vom 23. Dezember bis Neujahr, Montag, 1. Januar 2029.' },
      ],
      text: (h) => `<h2>Der erste im Norden</h2>
<p>Das ${h.src('ftg-sh', 'Gesetz über Sonn- und Feiertage')} in Schleswig-Holstein ist kurz. Es schützt neben den Feiertagen stille Tage wie Karfreitag, Volkstrauertag und Totensonntag, an denen öffentliche Veranstaltungen eingeschränkt sind.</p>
<p>Wer in Schleswig-Holstein wohnt und in Hamburg arbeitet, hat denselben Kalender. Für Pendler nach Dänemark gelten die dänischen Feiertage am Arbeitsort, etwa der Store Bededag, den Dänemark 2024 abgeschafft hat.</p>`,
    },
    en: {
      slug: 'public-holidays-schleswig-holstein', nav: 'Schleswig-Holstein', card: 'Ten holidays, Reformation Day since 2018',
      title: 'Public holidays Schleswig-Holstein 2027: all 10 dates',
      description: "Public holidays in Schleswig-Holstein for 2026 to 2028 with weekday: Reformation Day since 2018, the year's working days and the best bridge days in the state.",
      h1: 'Public holidays in Schleswig-Holstein 2027',
      intro: "Schleswig-Holstein's statutory public holidays with weekdays, the working days and the bridges for 2027.",
      resume: `Schleswig-Holstein has ${cnt('SH', 2027)} statutory public holidays: the nine nationwide ones and, since 2018, Reformation Day. The state parliament in Kiel passed it in February 2018, the first of the four northern states to do so, after a debate in which a secular holiday was also considered. The legal basis is section 2 of the act on Sundays and public holidays. In 2027 Reformation Day falls on a Sunday, so only ${wk('SH', 2027)} holidays land on weekdays and ${at('SH', 2027)} working days remain, as many as in Bremen, Hamburg or Lower Saxony. The only true bridge day in 2027 is the Friday after Ascension Day. The weeks around Easter and after Whitsun do better. In 2028, Reformation Day on a Tuesday brings a true bridge day on Monday 30 October, and 3 October on a Tuesday another on 2 October. Ten leave days can buy ${opt('SH', 2028, 10).frei} days off in 2028.`,
      faqs: [
        { q: 'Is Reformation Day a day off in Schleswig-Holstein?', a: 'Yes, since 2018. In February 2018 Schleswig-Holstein became the first northern state to make 31 October a statutory holiday; Hamburg, Lower Saxony and Bremen followed. In 2027 it falls on a Sunday, in 2028 on a Tuesday. Before that the state had only the nine nationwide holidays.' },
        { q: 'How many public holidays does Schleswig-Holstein have?', a: `${cnt('SH', 2027)}: the nine nationwide holidays plus Reformation Day. Corpus Christi, All Saints' Day, Epiphany and the Day of Repentance and Prayer are ordinary working days in Schleswig-Holstein. That matches Bremen, Hamburg and Lower Saxony, which have shared one holiday calendar since 2018.` },
        { q: 'Which bridge days does Schleswig-Holstein have in 2028?', a: 'True bridge days in 2028 are Friday 26 May after Ascension Day, Monday 2 October before German Unity Day and Monday 30 October before Reformation Day. Christmas 2028 falls on Monday and Tuesday: three leave days from 27 to 29 December give ten days off, from 23 December to New Year\'s Day, Monday 1 January 2029.' },
      ],
      text: (h) => `<h2>First in the north</h2>
<p>Schleswig-Holstein's ${h.src('ftg-sh', 'act on Sundays and public holidays')} is short. Besides the holidays it protects quiet days such as Good Friday, the national day of mourning and the Sunday of the Dead, on which public events are restricted.</p>
<p>If you live in Schleswig-Holstein and work in Hamburg, the calendar is the same. Commuters to Denmark follow Danish holidays at work; Denmark abolished its Great Prayer Day in 2024.</p>`,
    },
  },
  {
    id: 'feiertage-thueringen', land: 'TH', order: 55, sources: ['ftg-th', 'einigungsvertrag'], related: ['fronleichnam', 'feiertage-sachsen', 'feiertage-sachsen-anhalt', 'home'],
    de: {
      slug: 'feiertage-thueringen', nav: 'Thüringen', card: 'Mit Weltkindertag am 20. September',
      title: 'Feiertage Thüringen 2027: alle Termine, mit Weltkindertag',
      description: 'Feiertage in Thüringen 2026 bis 2028 mit Wochentag: Weltkindertag am 20. September, Reformationstag, Fronleichnam im Eichsfeld und die besten Brückentage.',
      h1: 'Feiertage in Thüringen 2027',
      intro: 'Die gesetzlichen Feiertage in Thüringen mit Wochentag, auch Fronleichnam im Eichsfeld, die Arbeitstage und die Brücken für 2027.',
      resume: `Thüringen hat ${cnt('TH', 2027)} landesweite Feiertage: die neun bundesweiten, den Reformationstag am 31. Oktober und als einziges Land den Weltkindertag am 20. September, den es seit 2019 feiert. 2027 fällt der Weltkindertag auf einen Montag und ergibt ein langes Wochenende vom 18. bis 20. September. Fronleichnam ist nach § 2 des Feier- und Gedenktagsgesetzes Feiertag in Gemeinden mit überwiegend katholischer Bevölkerung; weil die vorgesehene Verordnung nie erlassen wurde, gilt nach § 10 die Regel von 1994 fort. Betroffen ist vor allem der Landkreis Eichsfeld, dazu einzelne Orte im Unstrut-Hainich-Kreis und im Wartburgkreis. Eine amtliche Gemeindeliste ist nicht veröffentlicht; fragen Sie im Zweifel bei Ihrer Gemeinde nach. 2027 fallen ${wk('TH', 2027)} landesweite Feiertage auf Werktage, ${at('TH', 2027)} Arbeitstage bleiben. Mit zehn Urlaubstagen sind ${opt('TH', 2027, 10).frei} freie Tage möglich, 2028 ${opt('TH', 2028, 10).frei}.`,
      faqs: [
        { q: 'Ist der Weltkindertag in Thüringen ein Feiertag?', a: 'Ja, seit 2019 ist der 20. September in Thüringen gesetzlicher Feiertag, als einziges Land in Deutschland. 2027 fällt er auf einen Montag, 2028 auf einen Mittwoch. In allen anderen Ländern ist der Weltkindertag ein normaler Arbeitstag; den Internationalen Kindertag am 1. Juni feiert kein Land als Feiertag.' },
        { q: 'Wo ist Fronleichnam in Thüringen ein Feiertag?', a: 'In Gemeinden mit überwiegend katholischer Bevölkerung, in denen der Tag schon 1994 Feiertag war. Das betrifft vor allem den Landkreis Eichsfeld und einzelne Orte im Unstrut-Hainich-Kreis und im Wartburgkreis. Eine amtliche Liste hat das Land nicht veröffentlicht; Auskunft gibt die Gemeindeverwaltung.' },
        { q: 'Welche Brücken lohnen in Thüringen 2027?', a: 'Der Freitag, 7. Mai, nach Christi Himmelfahrt ist der einzige echte Brückentag. Gut sind vier Urlaubstage nach dem Weltkindertag, vom 21. bis 24. September, für neun freie Tage, und vier Urlaubstage vor Karfreitag oder nach Ostermontag für jeweils zehn. Im Eichsfeld kommt der Freitag nach Fronleichnam hinzu.' },
      ],
      text: (h) => `<h2>Weltkindertag und eine fehlende Verordnung</h2>
<p>Das ${h.src('ftg-th', 'Thüringer Feier- und Gedenktagsgesetz')} sieht vor, dass die Landesregierung die Gemeinden mit Fronleichnam per Verordnung bestimmt. Diese Verordnung gibt es bis heute nicht. § 10 regelt deshalb, dass Fronleichnam dort Feiertag bleibt, wo er es bei Inkrafttreten des Gesetzes 1994 war. Das ist rechtlich sauber, für Beschäftigte aber unübersichtlich; im Rechner wählen Sie unter „Ihr Ort“, ob Fronleichnam bei Ihnen gilt.</p>
<p>Der Weltkindertag kam 2019 hinzu, nachdem Thüringen lange zu den Ländern mit wenigen Feiertagen gehört hatte. Wie sich Thüringen von den Nachbarn unterscheidet, zeigen ${h.a('feiertage-sachsen', 'Sachsen')} mit dem Buß- und Bettag und ${h.a('feiertage-sachsen-anhalt', 'Sachsen-Anhalt')} mit Heilige Drei Könige.</p>`,
    },
    en: {
      slug: 'public-holidays-thuringia', nav: 'Thuringia', card: "With World Children's Day on 20 September",
      title: "Public holidays Thuringia 2027: all dates, Children's Day",
      description: "Public holidays in Thuringia for 2026 to 2028 with weekday: World Children's Day on 20 September, Reformation Day, Corpus Christi in the Eichsfeld and bridges.",
      h1: 'Public holidays in Thuringia 2027',
      intro: "Thuringia's statutory public holidays with weekdays, including Corpus Christi in the Eichsfeld, the working days and the bridges for 2027.",
      resume: `Thuringia has ${cnt('TH', 2027)} statewide public holidays: the nine nationwide ones, Reformation Day on 31 October and, uniquely, World Children's Day on 20 September, kept since 2019. In 2027 World Children's Day falls on a Monday and makes a long weekend from 18 to 20 September. Under section 2 of the holiday and commemoration act, Corpus Christi is a holiday in municipalities with a predominantly Catholic population; because the planned ordinance was never issued, section 10 keeps the 1994 rule in force. It mainly concerns the district of Eichsfeld, plus individual places in the Unstrut-Hainich and Wartburg districts. No official municipality list has been published; ask your local council if in doubt. In 2027, ${wk('TH', 2027)} statewide holidays fall on weekdays and ${at('TH', 2027)} working days remain. Ten leave days can buy ${opt('TH', 2027, 10).frei} days off, and ${opt('TH', 2028, 10).frei} in 2028.`,
      faqs: [
        { q: "Is World Children's Day a public holiday in Thuringia?", a: "Yes. Since 2019, 20 September has been a statutory holiday in Thuringia, the only German state to keep it. In 2027 it falls on a Monday, in 2028 on a Wednesday. In every other state World Children's Day is an ordinary working day; no state keeps International Children's Day on 1 June as a holiday." },
        { q: 'Where is Corpus Christi a public holiday in Thuringia?', a: 'In municipalities with a predominantly Catholic population where it was already a holiday in 1994. That mainly means the district of Eichsfeld and some places in the Unstrut-Hainich and Wartburg districts. The state has published no official list; the local council can tell you.' },
        { q: 'Which bridges pay off in Thuringia in 2027?', a: "Friday 7 May, after Ascension Day, is the only true bridge day. Four leave days after World Children's Day, 21 to 24 September, give nine days off, and four leave days before Good Friday or after Easter Monday ten each. In the Eichsfeld the Friday after Corpus Christi is added." },
      ],
      text: (h) => `<h2>World Children's Day and a missing ordinance</h2>
<p>The ${h.src('ftg-th', 'Thuringian holiday and commemoration act')} provides for the state government to designate the municipalities with Corpus Christi by ordinance. That ordinance still does not exist. Section 10 therefore keeps Corpus Christi as a holiday wherever it was one when the act took effect in 1994. That is legally sound but confusing for employees; in the calculator, choose under "Your municipality" whether Corpus Christi applies to you.</p>
<p>World Children's Day was added in 2019, after Thuringia had long been among the states with few holidays. How Thuringia differs from its neighbours is shown by ${h.a('feiertage-sachsen', 'Saxony')}, with the Day of Repentance, and ${h.a('feiertage-sachsen-anhalt', 'Saxony-Anhalt')}, with Epiphany.</p>`,
    },
  },
];

export default DEFS.map(build);
