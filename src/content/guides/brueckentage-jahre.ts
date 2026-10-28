/** Brückentage 2026 (reste de l'année) et 2028 : optimiseur réglé sur l'année. Chiffres : moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabelleBruecken } from '../../lib/bausteine';
import { LAENDER, LAND_NAME, ORT_STANDARD } from '../../lib/engine/feiertage';

const opt = (y: number, l: Parameters<typeof K.optimiere>[1], b: number) => K.optimiere(y, l, ORT_STANDARD(l), b).frei;
const spanne = (y: number, b: number) => { const v = LAENDER.map((l) => opt(y, l, b)); return [Math.min(...v), Math.max(...v)]; };
const tabelleOpt = (h: Parameters<typeof tabelleBruecken>[0], y: number) => h.table(
  [h.lang === 'de' ? 'Land' : 'State', h.lang === 'de' ? '10 Urlaubstage' : '10 leave days', h.lang === 'de' ? '20 Urlaubstage' : '20 leave days', h.lang === 'de' ? '30 Urlaubstage' : '30 leave days'],
  LAENDER.map((l) => [LAND_NAME[l][h.lang], opt(y, l, 10), opt(y, l, 20), opt(y, l, 30)]),
  h.lang === 'de' ? `Freie Tage am Stück ${y} bei bester Verteilung (Bayern: Gemeinde mit Mariä Himmelfahrt)` : `Days off in a row in ${y} with the best plan (Bavaria: municipality with Assumption Day)`, ['l', 'r', 'r', 'r']);
const [a28, b28] = spanne(2028, 10);
const xmas26 = K.bruecken(2026, 'NW', 'std', { heiligabend: true }).find((b) => b.urlaubVon === '2026-12-28');

export default [
  defineGuide({
    id: 'brueckentage-2028', group: 'werkzeuge', order: 3, tool: 'bt', toolArg: { jahr: 2028 },
    related: ['home', 'feiertage-2028', 'kalender-2028', 'brueckentage-2026', 'urlaubsanspruch'],
    sources: ['ftg-nw', 'ftg-by', 'einigungsvertrag', 'burlg3'],
    de: {
      slug: 'brueckentage-2028', nav: 'Brückentage 2028', card: 'Das beste Brückenjahr seit Langem: früh planen',
      title: 'Brückentage 2028: Urlaub früh planen, bis zu 35 Tage frei',
      description: 'Brückentage 2028 für alle 16 Länder: fast alle Feiertage fallen auf Werktage. Mit zehn Urlaubstagen bis zu 35 freie Tage, berechnet für Ihr Land und Ihren Ort.',
      h1: 'Brückentage 2028: das Jahr für lange Pausen',
      intro: 'Land und Urlaubstage eingeben: Der Planer verteilt Ihren Urlaub 2028 so auf die Brücken, dass möglichst viele freie Tage am Stück entstehen.',
      resume: `2028 ist für Brücken ein ausgezeichnetes Jahr, das Gegenteil von 2027. Fast alle Feiertage fallen auf Montag bis Freitag: Der 1. Mai ist ein Montag, der Tag der Deutschen Einheit ein Dienstag, Allerheiligen ein Mittwoch, Weihnachten fällt auf Montag und Dienstag, Neujahr 2029 wieder auf einen Montag. Nur Neujahr 2028 liegt auf einem Samstag. Dadurch entstehen viele echte Brückentage, an denen ein einziger Urlaubstag vier freie Tage ergibt, etwa am Freitag, 26. Mai, nach Christi Himmelfahrt und am Montag, 2. Oktober, vor dem Tag der Deutschen Einheit. Mit zehn Urlaubstagen kommen Sie je nach Land auf ${a28} bis ${b28} freie Tage, am meisten in Bayern. Weil Ostern 2028 spät liegt, am 16. April, rücken Himmelfahrt, Pfingsten und Fronleichnam in den späten Mai und Juni. Wer Urlaub für 2028 beantragen will, sollte das früh tun: In vielen Betrieben werden die beliebten Brückentage nach dem Eingang der Anträge vergeben.`,
      faqs: [
        { q: 'Warum ist 2028 ein gutes Jahr für Brückentage?', a: 'Weil fast alle Feiertage auf Werktage fallen und viele davon auf einen Dienstag oder Donnerstag. Ein Dienstag braucht den Montag davor als Brücke, ein Donnerstag den Freitag danach. 2028 gilt das für Himmelfahrt, Fronleichnam, den 3. Oktober und in mehreren Ländern für den Reformationstag und Mariä Himmelfahrt.' },
        { q: 'Wie viele freie Tage bringen 30 Urlaubstage 2028?', a: `Je nach Land ${spanne(2028, 30)[0]} bis ${spanne(2028, 30)[1]} freie Tage am Stück, wenn alle Urlaubstage an Brücken liegen. Die Tabelle zeigt den Wert für jedes Land. In der Praxis setzt kaum jemand den ganzen Jahresurlaub an Brücken ein; der Planer zeigt, was mit dem Rest frei planbar bleibt.` },
        { q: 'Wann ist Weihnachten 2028 am günstigsten?', a: 'Weihnachten fällt 2028 auf Montag und Dienstag, Neujahr 2029 auf einen Montag. Drei Urlaubstage vom 27. bis 29. Dezember ergeben zehn freie Tage vom 23. Dezember bis 1. Januar. Wer Heiligabend und Silvester ohnehin frei hat, braucht dieselben drei Tage.' },
      ],
      body: (h) => `<h2>Die besten Brücken 2028</h2>
<p>Die Tabelle zeigt die Brücken 2028 am Beispiel Nordrhein-Westfalens, sortiert nach Ertrag: zuerst die Tage, an denen ein Urlaubstag vier freie Tage bringt, dann die längeren Brücken um Ostern, Pfingsten und Weihnachten.</p>
${tabelleBruecken(h, 2028, 'NW', 10)}
<p>Im Frühjahr liegen die Feiertage 2028 weiter auseinander als 2027. Karfreitag ist am 14. April, Ostermontag am 17. April. Vier Urlaubstage in der Karwoche oder in der Woche nach Ostern ergeben je zehn freie Tage; beide zusammen ergeben mit acht Urlaubstagen sechzehn. Der 1. Mai fällt auf einen Montag und verlängert das Wochenende von selbst.</p>
<h2>So viel Freizeit bringt Ihr Urlaub 2028</h2>
<p>Die zweite Tabelle vergleicht die Länder. Sie rechnet für jedes Land die beste Verteilung von 10, 20 und 30 Urlaubstagen aus. Die Unterschiede kommen von den landeseigenen Feiertagen: Wo Fronleichnam, Mariä Himmelfahrt oder der Reformationstag auf einen Dienstag oder Donnerstag fallen, entstehen zusätzliche Brücken.</p>
${tabelleOpt(h, 2028)}
<p>Wer noch nicht weiß, wie viele Urlaubstage ihm zustehen, findet die gesetzliche Untergrenze unter ${h.a('urlaubsanspruch', 'Urlaubsanspruch')}: Bei fünf Arbeitstagen pro Woche sind es nach dem ${h.src('burlg3', 'Bundesurlaubsgesetz')} mindestens 20 Tage. Die vollständige Liste der Feiertage steht unter ${h.a('feiertage-2028', 'Feiertage 2028')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2028 }, c: 'Brücken 2028 für Ihr Land' })}`,
    },
    en: {
      slug: 'bridge-days-2028', nav: 'Bridge days 2028', card: 'The best bridge year in a long time: plan early',
      title: 'Bridge days Germany 2028: plan early, up to 35 days off',
      description: 'Bridge days 2028 for all 16 German states: almost every holiday falls on a weekday. Ten leave days can buy up to 35 days off, worked out for your state.',
      h1: 'Bridge days 2028: the year for long breaks',
      intro: 'Enter your state and leave days: the planner spreads your 2028 leave over the bridges so you get as many consecutive days off as possible.',
      resume: `2028 is an excellent year for bridges, the opposite of 2027. Almost every public holiday falls between Monday and Friday: 1 May is a Monday, German Unity Day a Tuesday, All Saints' Day a Wednesday, Christmas falls on Monday and Tuesday and New Year's Day 2029 on a Monday again. Only New Year's Day 2028 is on a Saturday. That creates many true bridge days, where a single leave day gives four days off, such as Friday 26 May after Ascension Day and Monday 2 October before German Unity Day. Ten leave days buy ${a28} to ${b28} days off depending on the state, most of all in Bavaria. Because Easter is late in 2028, on 16 April, Ascension Day, Whitsun and Corpus Christi move into late May and June. If you want to book leave for 2028, do it early: many employers hand out the popular bridge days in the order requests arrive.`,
      faqs: [
        { q: 'Why is 2028 a good year for bridge days in Germany?', a: 'Because almost every holiday falls on a weekday, many of them on a Tuesday or Thursday. A Tuesday needs the Monday before as a bridge, a Thursday the Friday after. In 2028 that applies to Ascension Day, Corpus Christi, 3 October and, in several states, Reformation Day and Assumption Day.' },
        { q: 'How many days off do 30 leave days buy in 2028?', a: `Between ${spanne(2028, 30)[0]} and ${spanne(2028, 30)[1]} consecutive days off depending on the state, if every leave day sits on a bridge. The table gives the figure for each state. In practice hardly anyone spends their whole allowance on bridges; the planner shows what remains free to plan.` },
        { q: 'When is the best time to take leave at Christmas 2028?', a: "Christmas falls on Monday and Tuesday in 2028 and New Year's Day 2029 on a Monday. Three leave days from 27 to 29 December give ten days off from 23 December to 1 January. If you already have Christmas Eve and New Year's Eve off, you still need the same three days." },
      ],
      body: (h) => `<h2>The best bridges in 2028</h2>
<p>The table shows the 2028 bridges for North Rhine-Westphalia as an example, sorted by yield: first the days where one leave day buys four days off, then the longer bridges around Easter, Whitsun and Christmas.</p>
${tabelleBruecken(h, 2028, 'NW', 10)}
<p>In spring the holidays of 2028 are further apart than in 2027. Good Friday is on 14 April, Easter Monday on 17 April. Four leave days in Holy Week or in the week after Easter each give ten days off; both together give sixteen for eight leave days. 1 May falls on a Monday and lengthens the weekend by itself.</p>
<h2>What your leave buys in 2028</h2>
<p>The second table compares the states. For each one it works out the best spread of 10, 20 and 30 leave days. The differences come from each state's own holidays: wherever Corpus Christi, Assumption Day or Reformation Day falls on a Tuesday or Thursday, extra bridges appear.</p>
${tabelleOpt(h, 2028)}
<p>If you are not sure how much leave you are entitled to, the statutory floor is on ${h.a('urlaubsanspruch', 'leave entitlement')}: on a five-day week the ${h.src('burlg3', 'Federal Leave Act')} guarantees at least 20 days. The full list of holidays is on ${h.a('feiertage-2028', 'public holidays 2028')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2028 }, c: 'Bridges 2028 for your state' })}`,
    },
  }),
  defineGuide({
    id: 'brueckentage-2026', group: 'werkzeuge', order: 2, tool: 'bt', toolArg: { jahr: 2026, urlaub: 8 },
    countdown: { date: '2026-12-24', label: { de: 'Heiligabend 2026', en: 'Christmas Eve 2026' } },
    related: ['home', 'feiertage-2026', 'feiertage-sachsen', 'brueckentage-2028', 'kalender-2027'],
    sources: ['ftg-sn', 'ftg-nw', 'einigungsvertrag', 'burlg7'],
    de: {
      slug: 'brueckentage-2026', nav: 'Brückentage 2026', card: 'Resturlaub 2026: Weihnachten und Silvester',
      title: 'Brückentage 2026: Resturlaub an Weihnachten gut einsetzen',
      description: 'Brückentage 2026 im Rest des Jahres: Weihnachten am Freitag, Neujahr 2027 am Freitag. So werden aus vier Resturlaubstagen zehn freie Tage, in allen Ländern.',
      h1: 'Brückentage 2026: was vom Jahr noch bleibt',
      intro: 'Das Jahr 2026 ist fast vorbei. Der Planer zeigt, wie Sie Ihren Resturlaub über Weihnachten und den Jahreswechsel am besten verteilen.',
      resume: `Für 2026 bleiben nur noch wenige Feiertage, aber eine sehr gute Brücke. Der Reformationstag am 31. Oktober ist ein Samstag, Allerheiligen am 1. November ein Sonntag; beide bringen keinen freien Tag. In Sachsen fällt der Buß- und Bettag auf Mittwoch, 18. November. Danach kommt Weihnachten: Der erste Weihnachtstag ist ein Freitag, der zweite ein Samstag, und Neujahr 2027 fällt wieder auf einen Freitag. Vier Urlaubstage vom 28. bis 31. Dezember ergeben zehn freie Tage vom 25. Dezember bis 3. Januar. Wer zusätzlich die Woche vor Weihnachten frei nimmt, also den 21. bis 24. Dezember, hat mit acht Urlaubstagen sechzehn Tage am Stück, vom 19. Dezember bis 3. Januar. Sind Heiligabend und Silvester im Betrieb ohnehin frei, reichen drei Urlaubstage zwischen den Jahren für ${xmas26?.frei ?? 11} freie Tage. Resturlaub, den Sie 2026 nicht mehr nehmen können, verfällt nach dem Gesetz grundsätzlich am 31. Dezember, es sei denn, er wird übertragen.`,
      faqs: [
        { q: 'Verfällt mein Resturlaub 2026 am 31. Dezember?', a: 'Grundsätzlich ja, aber nur, wenn der Arbeitgeber Sie rechtzeitig auf den Urlaub und den drohenden Verfall hingewiesen hat. Bei dringenden betrieblichen oder persönlichen Gründen wird der Urlaub bis zum 31. März übertragen. Viele Arbeits- und Tarifverträge sind großzügiger. Im Zweifel klären Sie das schriftlich mit der Personalabteilung.' },
        { q: 'Ist Silvester 2026 ein Arbeitstag?', a: 'Rechtlich ja. Der 31. Dezember ist kein Feiertag, 2026 ist er ein Donnerstag. Viele Arbeits- und Tarifverträge geben ihn ganz oder ab Mittag frei. Im Planer können Sie unter den erweiterten Einstellungen festlegen, dass Heiligabend und Silvester bei Ihnen frei sind.' },
        { q: 'Wann ist der Buß- und Bettag 2026?', a: 'Am Mittwoch, 18. November 2026. Gesetzlicher Feiertag ist er nur in Sachsen. Zwei Urlaubstage am Montag und Dienstag davor oder am Donnerstag und Freitag danach ergeben fünf freie Tage. Er fällt immer auf den Mittwoch vor dem Totensonntag. Schulen in Sachsen haben an diesem Tag ebenfalls frei.' },
      ],
      body: (h) => `<h2>Weihnachten 2026 Schritt für Schritt</h2>
<p>Die Feiertage liegen 2026 und Anfang 2027 so, dass zwei Wochenenden mit je einem Feiertag am Freitag eine Woche einrahmen. Diese Woche ist die Brücke des Winters. Nimmt man die Woche vor Weihnachten dazu, wird daraus eine Pause von gut zwei Wochen.</p>
${h.table(['Variante', 'Urlaubstage', 'Frei am Stück', 'Freie Tage'], [['28. bis 31. Dezember', 4, '25.12.2026 – 3.1.2027', 10], ['21. bis 24. Dezember', 4, '19.12. – 27.12.2026', 9], ['beide Wochen', 8, '19.12.2026 – 3.1.2027', 16], ['28. bis 30. Dezember, Heiligabend und Silvester frei', 3, '24.12.2026 – 3.1.2027', 11]], 'Weihnachten 2026 in allen Ländern', ['l', 'r', 'l', 'r'])}
<p>Die Rechnung gilt in allen sechzehn Ländern, weil Weihnachten und Neujahr bundesweite Feiertage sind. Unterschiede gibt es im Herbst nur in Sachsen, wo der Buß- und Bettag eine kurze Brücke Mitte November ermöglicht.</p>
<h2>Resturlaub: was das Gesetz sagt</h2>
<p>Nach dem ${h.src('burlg7', 'Bundesurlaubsgesetz')} muss der Urlaub im laufenden Jahr genommen werden. Eine Übertragung ins nächste Jahr ist nur bei dringenden Gründen vorgesehen, dann bis Ende März. Seit Urteilen des Europäischen Gerichtshofs und des Bundesarbeitsgerichts verfällt Urlaub aber nur, wenn der Arbeitgeber rechtzeitig und deutlich auf den Verfall hingewiesen hat. Wer noch Urlaub hat, plant ihn am besten jetzt.</p>
<p>Für das nächste Jahr lohnt ein Blick voraus: 2027 ist ein schwaches Brückenjahr, 2028 ein sehr gutes. Den ${h.a('kalender-2027', 'Kalender 2027')} und die ${h.a('brueckentage-2028', 'Brückentage 2028')} finden Sie hier.</p>
${h.mini('bt', { p: ['urlaub'], d: { jahr: 2026, urlaub: 4 }, c: 'Resturlaub 2026 verteilen' })}`,
    },
    en: {
      slug: 'bridge-days-2026', nav: 'Bridge days 2026', card: 'Leftover leave 2026: Christmas and New Year',
      title: 'Bridge days Germany 2026: use leftover leave at Christmas',
      description: "Bridge days in the rest of 2026: Christmas Day is a Friday, New Year's Day 2027 too. How four leftover leave days become ten days off, in all 16 states.",
      h1: 'Bridge days 2026: what is left of the year',
      intro: 'The year 2026 is almost over. The planner shows how best to spread your leftover leave over Christmas and the turn of the year.',
      resume: `Only a few public holidays remain in 2026, but one very good bridge. Reformation Day on 31 October is a Saturday and All Saints' Day on 1 November a Sunday, so neither gives a day off. In Saxony the Day of Repentance and Prayer falls on Wednesday 18 November. Then comes Christmas: Christmas Day is a Friday, Boxing Day a Saturday, and New Year's Day 2027 falls on a Friday again. Four leave days from 28 to 31 December give ten days off, from 25 December to 3 January. Add the week before Christmas, 21 to 24 December, and eight leave days give sixteen days in a row, from 19 December to 3 January. If Christmas Eve and New Year's Eve are already off at your workplace, three leave days between the holidays buy ${xmas26?.frei ?? 11} days off. Leave you cannot take in 2026 generally lapses on 31 December under the law, unless it is carried over.`,
      faqs: [
        { q: 'Does my leftover leave for 2026 lapse on 31 December?', a: 'In principle yes, but only if your employer told you in good time about the leave and that it would lapse. For pressing operational or personal reasons the leave is carried over until 31 March. Many contracts and collective agreements are more generous. If in doubt, settle it in writing with HR.' },
        { q: "Is New Year's Eve 2026 a working day in Germany?", a: "Legally yes. 31 December is not a public holiday; in 2026 it falls on a Thursday. Many contracts and collective agreements give the whole day or the afternoon off. In the planner's advanced settings you can mark Christmas Eve and New Year's Eve as days off." },
        { q: 'When is the Day of Repentance and Prayer in 2026?', a: 'On Wednesday 18 November 2026. It is a statutory holiday only in Saxony. Two leave days on the Monday and Tuesday before, or the Thursday and Friday after, give five days off. It always falls on the Wednesday before the Sunday of the Dead. Schools in Saxony are closed that day too.' },
      ],
      body: (h) => `<h2>Christmas 2026 step by step</h2>
<p>The holidays at the end of 2026 and the start of 2027 fall so that two weekends, each with a holiday on the Friday, frame a single week. That week is the bridge of the winter. Add the week before Christmas and you get a break of just over two weeks.</p>
${h.table(['Option', 'Leave days', 'Off in a row', 'Days off'], [['28 to 31 December', 4, '25 Dec 2026 – 3 Jan 2027', 10], ['21 to 24 December', 4, '19 – 27 Dec 2026', 9], ['both weeks', 8, '19 Dec 2026 – 3 Jan 2027', 16], ["28 to 30 December, Christmas Eve and New Year's Eve off", 3, '24 Dec 2026 – 3 Jan 2027', 11]], 'Christmas 2026 in every state', ['l', 'r', 'l', 'r'])}
<p>The sums hold in all sixteen states, because Christmas and New Year are nationwide holidays. In the autumn only Saxony differs, where the Day of Repentance allows a short bridge in mid-November.</p>
<h2>Leftover leave: what the law says</h2>
<p>Under the ${h.src('burlg7', 'Federal Leave Act')} leave must be taken in the current year. Carrying it over into the next year is only foreseen for pressing reasons, and then until the end of March. Following rulings by the European Court of Justice and the Federal Labour Court, however, leave only lapses if the employer gave clear and timely notice. If you still have leave, plan it now.</p>
<p>It pays to look ahead too: 2027 is a weak year for bridges, 2028 a very good one. See the ${h.a('kalender-2027', 'calendar 2027')} and the ${h.a('brueckentage-2028', 'bridge days 2028')}.</p>
${h.mini('bt', { p: ['urlaub'], d: { jahr: 2026, urlaub: 4 }, c: 'Spread your 2026 leftover leave' })}`,
    },
  }),
];
