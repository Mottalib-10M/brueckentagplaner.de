/** Termine : Ostern 2027, Pfingsten 2027, Zeitumstellung, Muttertag 2027. Dates : moteur (Gauß/PTB, règle UE). */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { sommerzeit } from '../../lib/tool-specs';

const off = (iso: string, d: number) => K.toIso(K.fromIso(iso) + d);
const L = (iso: string, l: 'de' | 'en') => new Date(`${iso}T12:00:00Z`).toLocaleDateString(l === 'de' ? 'de-DE' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const OS27 = K.ostersonntag(2027), OS28 = K.ostersonntag(2028);
const Z27 = sommerzeit(2027), Z28 = sommerzeit(2028);
const MT = (y: number) => K.nthWeekday(y, 5, 0, 2);
const tage = K.fromIso(Z27.ende) - K.fromIso(Z27.beginn);
const ostern = (l: 'de' | 'en') => [2027, 2028, 2029, 2030, 2031, 2032].map((y) => { const o = K.ostersonntag(y); return [y, L(off(o, -2), l), L(o, l), L(off(o, 1), l)]; });

export default [
  defineGuide({
    id: 'ostern-2027', group: 'termine', order: 60, tool: 'os', toolArg: { jahr: 2027 },
    countdown: { date: OS27, label: { de: 'Ostersonntag 2027', en: 'Easter Sunday 2027' } },
    related: ['pfingsten-2027', 'feiertage-2027', 'zeitumstellung', 'home'],
    sources: ['ostern-ptb', 'einigungsvertrag', 'ftg-bb'],
    de: {
      slug: 'ostern-2027', nav: 'Ostern 2027', card: 'Ostersonntag am 28. März, mit Countdown und Osterformel',
      title: 'Ostern 2027: Datum, Countdown und die Feiertage um Ostern',
      description: 'Ostern 2027 ist am Sonntag, 28. März: Karfreitag, Ostermontag und die Brücken drumherum, mit Countdown und der Gaußschen Osterformel Schritt für Schritt.',
      h1: 'Ostern 2027: Sonntag, 28. März',
      intro: 'Jahr wählen: Der Rechner bestimmt Ostersonntag nach der Gaußschen Osterformel und leitet daraus Karfreitag, Himmelfahrt, Pfingsten und Fronleichnam ab.',
      resume: `Ostersonntag fällt 2027 auf den 28. März, so früh wie seit 2016 nicht mehr. Karfreitag ist am 26. März, Ostermontag am 29. März; beide sind in allen sechzehn Ländern gesetzliche Feiertage. Ostersonntag selbst ist nur in Brandenburg ausdrücklich als Feiertag im Gesetz genannt, als Sonntag aber überall arbeitsfrei. Gründonnerstag, der 25. März, ist kein gesetzlicher Feiertag. Ostern ist der erste Sonntag nach dem ersten Vollmond im Frühling, frühestens am 22. März und spätestens am 25. April. Die Physikalisch-Technische Bundesanstalt veröffentlicht dafür die Gaußsche Osterformel, nach der auch dieser Rechner arbeitet. Weil das Osterdatum alle beweglichen Feiertage bestimmt, liegen 2027 auch Christi Himmelfahrt am 6. Mai, Pfingsten am 16. und 17. Mai und Fronleichnam am 27. Mai früh. Mit vier Urlaubstagen vor oder nach Ostern sind zehn freie Tage möglich, mit acht sechzehn. In derselben Nacht auf den Ostersonntag beginnt 2027 die Sommerzeit: Die Uhren werden um 2 Uhr auf 3 Uhr vorgestellt.`,
      faqs: [
        { q: 'Warum ist Ostern 2027 so früh?', a: 'Weil der erste Frühlingsvollmond nach der kirchlichen Rechnung 2027 auf Montag, 22. März, fällt; die Gaußsche Formel nennt dieses Datum Ostergrenze. Der folgende Sonntag ist der 28. März. Frühere Ostertermine gab es zuletzt 2016 mit dem 27. März; 2008 war Ostern sogar am 23. März.' },
        { q: 'Wann ist Ostern 2028?', a: 'Am Sonntag, 16. April 2028, knapp drei Wochen später als 2027. Karfreitag ist der 14. April, Ostermontag der 17. April. Entsprechend später liegen 2028 auch Himmelfahrt, Pfingsten und Fronleichnam. 2029 fällt Ostern auf den 1. April, 2030 auf den 21. April.' },
        { q: 'Ist Gründonnerstag ein Feiertag?', a: 'Nein, in keinem Land als gesetzlicher Feiertag mit Arbeitsruhe. Baden-Württemberg nennt ihn als kirchlichen Feiertag, an dem der Gottesdienst geschützt ist. Schulen haben am Gründonnerstag meist schon Osterferien, Betriebe arbeiten normal. Karfreitag am folgenden Tag ist dagegen überall gesetzlicher Feiertag und stiller Tag.' },
      ],
      body: (h) => `<h2>Ostern in den nächsten Jahren</h2>
${h.table(['Jahr', 'Karfreitag', 'Ostersonntag', 'Ostermontag'], ostern('de'), 'Ostertermine 2027 bis 2032 nach der Gaußschen Osterformel', ['r', 'l', 'l', 'l'])}
<h2>Wie das Osterdatum berechnet wird</h2>
<p>Das Konzil von Nicäa legte 325 fest, dass Ostern am Sonntag nach dem ersten Vollmond ab Frühlingsanfang gefeiert wird. Kirchlich gilt dabei immer der 21. März als Frühlingsanfang und ein rechnerischer, kein astronomischer Vollmond. Carl Friedrich Gauß hat daraus 1800 eine Formel gemacht, die ohne Tabellen auskommt; die ${h.src('ostern-ptb', 'Physikalisch-Technische Bundesanstalt')} veröffentlicht sie in einer ergänzten Fassung. Der Rechner oben zeigt jeden Zwischenschritt für das gewählte Jahr.</p>
<p>Aus Ostersonntag folgen alle beweglichen Feiertage: Karfreitag zwei Tage vorher, Christi Himmelfahrt 39 Tage danach, Pfingstsonntag nach 49, Fronleichnam nach 60 Tagen. Die vollständige Liste für 2027 steht unter ${h.a('feiertage-2027', 'Feiertage 2027')}.</p>
<h2>Brücken um Ostern 2027</h2>
<p>Karfreitag und Ostermontag umrahmen ein langes Wochenende von vier Tagen. Vier Urlaubstage von Montag bis Donnerstag der Karwoche, 22. bis 25. März, verlängern es auf zehn Tage ab Samstag, 20. März. Dasselbe gilt für die Woche nach Ostern, 30. März bis 2. April. Beide Wochen zusammen kosten acht Urlaubstage und bringen sechzehn freie Tage. Wie das zu Ihren übrigen Brücken passt, rechnet der ${h.a('home', 'Brückentage-Optimierer')} aus.</p>
${h.mini('os', { p: ['jahr'], d: { jahr: 2028 }, c: 'Ostern in einem anderen Jahr' })}`,
    },
    en: {
      slug: 'easter-2027', nav: 'Easter 2027', card: 'Easter Sunday on 28 March, with countdown and formula',
      title: 'Easter 2027 Germany: date, countdown and Easter holidays',
      description: 'Easter 2027 in Germany falls on Sunday 28 March: Good Friday, Easter Monday and the bridges around them, a countdown and Gauss’s Easter formula step by step.',
      h1: 'Easter 2027: Sunday 28 March',
      intro: "Pick a year: the calculator finds Easter Sunday with Gauss's Easter formula and derives Good Friday, Ascension Day, Whitsun and Corpus Christi from it.",
      resume: `Easter Sunday falls on 28 March in 2027, the earliest date since 2016. Good Friday is on 26 March and Easter Monday on 29 March; both are statutory holidays in all sixteen states. Easter Sunday itself is expressly named as a holiday only in Brandenburg's act, but as a Sunday it is a day off everywhere. Maundy Thursday, 25 March, is not a statutory holiday. Easter is the first Sunday after the first full moon of spring, at the earliest on 22 March and at the latest on 25 April. Germany's national metrology institute, the PTB, publishes Gauss's Easter formula for this, and the calculator uses it. Because the Easter date sets every movable holiday, Ascension Day on 6 May, Whitsun on 16 and 17 May and Corpus Christi on 27 May are early in 2027 too. Four leave days before or after Easter give ten days off, eight give sixteen. In the night before Easter Sunday 2027, summer time also begins: clocks go forward from 2:00 to 3:00.`,
      faqs: [
        { q: 'Why is Easter so early in 2027?', a: 'Because, by the church reckoning, the first full moon of spring falls on Monday 22 March 2027; Gauss\'s formula calls this date the paschal limit. The following Sunday is 28 March. The last earlier Easter was in 2016, on 27 March; in 2008 it was as early as 23 March.' },
        { q: 'When is Easter 2028?', a: 'On Sunday 16 April 2028, almost three weeks later than in 2027. Good Friday is on 14 April and Easter Monday on 17 April. Ascension Day, Whitsun and Corpus Christi are correspondingly later in 2028 too. In 2029 Easter falls on 1 April.' },
        { q: 'Is Maundy Thursday a public holiday in Germany?', a: 'No, not as a statutory day off in any state. Baden-Württemberg lists it as a church holiday on which services are protected. Schools are usually already on Easter holiday by then, but businesses work as normal. Good Friday, the next day, is a public holiday everywhere.' },
      ],
      body: (h) => `<h2>Easter in the coming years</h2>
${h.table(['Year', 'Good Friday', 'Easter Sunday', 'Easter Monday'], ostern('en'), "Easter dates 2027 to 2032 by Gauss's Easter formula", ['r', 'l', 'l', 'l'])}
<h2>How the Easter date is worked out</h2>
<p>In 325 the Council of Nicaea ruled that Easter is celebrated on the Sunday after the first full moon from the start of spring. The church always takes 21 March as the start of spring and uses a computed, not an astronomical, full moon. In 1800 Carl Friedrich Gauss turned this into a formula that needs no tables; the ${h.src('ostern-ptb', 'PTB')} publishes it in a corrected version. The calculator above shows every intermediate step for the chosen year.</p>
<p>Every movable holiday follows from Easter Sunday: Good Friday two days before, Ascension Day 39 days after, Whit Sunday after 49 and Corpus Christi after 60 days. The full list for 2027 is on ${h.a('feiertage-2027', 'public holidays 2027')}.</p>
<h2>Bridges around Easter 2027</h2>
<p>Good Friday and Easter Monday frame a four-day weekend. Four leave days from Monday to Thursday of Holy Week, 22 to 25 March, stretch it to ten days from Saturday 20 March. The same goes for the week after Easter, 30 March to 2 April. Both weeks together cost eight leave days and bring sixteen days off. The ${h.a('home', 'bridge-day planner')} shows how that fits with your other bridges.</p>
${h.mini('os', { p: ['jahr'], d: { jahr: 2028 }, c: 'Easter in another year' })}`,
    },
  }),
  defineGuide({
    id: 'pfingsten-2027', group: 'termine', order: 61, tool: 'pf', toolArg: { jahr: 2027 },
    countdown: { date: off(OS27, 49), label: { de: 'Pfingstsonntag 2027', en: 'Whit Sunday 2027' } },
    related: ['ostern-2027', 'fronleichnam', 'feiertage-brandenburg', 'home'],
    sources: ['ostern-ptb', 'ftg-bb', 'einigungsvertrag'],
    de: {
      slug: 'pfingsten-2027', nav: 'Pfingsten 2027', card: 'Pfingstsonntag am 16. Mai, Pfingstmontag frei',
      title: 'Pfingsten 2027: Datum, Countdown und Brückentage im Mai',
      description: 'Pfingsten 2027 ist am 16. und 17. Mai, Pfingstmontag ist überall frei. Mit Countdown, den Terminen bis 2034 und den Brücken von Himmelfahrt bis Fronleichnam.',
      h1: 'Pfingsten 2027: 16. und 17. Mai',
      intro: 'Jahr wählen: Der Rechner nennt Pfingstsonntag und Pfingstmontag und die Termine der folgenden Jahre, abgeleitet aus dem Osterdatum.',
      resume: `Pfingsten fällt 2027 auf Sonntag, 16. Mai, und Montag, 17. Mai. Pfingstmontag ist in allen sechzehn Ländern gesetzlicher Feiertag. Pfingstsonntag nennt nur Brandenburg ausdrücklich als Feiertag; als Sonntag ist er überall arbeitsfrei. Pfingsten liegt immer 49 Tage nach Ostersonntag, also sieben Wochen, und damit zwischen dem 10. Mai und dem 13. Juni. Weil Ostern 2027 früh ist, ist auch Pfingsten früh: 2028 fällt es erst auf den 4. und 5. Juni. Für die Urlaubsplanung ist Pfingsten 2027 das Mittelstück einer Folge von drei Feiertagen innerhalb von drei Wochen: Christi Himmelfahrt am Donnerstag, 6. Mai, Pfingstmontag am 17. Mai und in sechs Ländern Fronleichnam am Donnerstag, 27. Mai. Vier Urlaubstage von Dienstag, 18., bis Freitag, 21. Mai, machen aus dem langen Pfingstwochenende neun freie Tage. In Ländern mit Fronleichnam lassen sich die Woche nach Pfingsten und der Brückentag am 28. Mai verbinden.`,
      faqs: [
        { q: 'Ist Pfingstsonntag ein Feiertag?', a: 'Rechtlich ausdrücklich nur in Brandenburg, dessen Feiertagsgesetz Ostersonntag und Pfingstsonntag aufzählt. In den anderen Ländern ist er ein gewöhnlicher Sonntag mit Sonntagsruhe. Für Beschäftigte ändert das nur etwas bei Zuschlägen für Arbeit an Feiertagen. Geschäfte sind an beiden Pfingsttagen geschlossen.' },
        { q: 'Wann ist Pfingsten 2028?', a: 'Am Sonntag, 4. Juni, und Montag, 5. Juni 2028, drei Wochen später als 2027. Fronleichnam folgt am Donnerstag, 15. Juni. Zwischen Pfingstmontag und Fronleichnam liegen 2028 wie in jedem Jahr zehn Tage. Pfingsten fällt frühestens auf den 10. Mai und spätestens auf den 13. Juni.' },
        { q: 'Welche Brücken bringt Pfingsten 2027?', a: 'Vier Urlaubstage nach Pfingstmontag, 18. bis 21. Mai, ergeben neun freie Tage vom 15. bis 23. Mai. Wo Fronleichnam gilt, bringt der Freitag, 28. Mai, mit einem Urlaubstag vier freie Tage. Wer beides verbindet, braucht acht Urlaubstage für sechzehn freie Tage vom 15. bis 30. Mai.' },
      ],
      body: (h) => `<h2>Drei Feiertage in drei Wochen</h2>
<p>2027 liegen die Feiertage nach Ostern dicht beieinander. Wer im Mai Urlaub plant, hat die Wahl zwischen kurzen Brücken mit hohem Ertrag und einer langen Pause. Die Tabelle zeigt die Möglichkeiten für ein Land mit Fronleichnam, etwa Nordrhein-Westfalen.</p>
${h.table(['Urlaub', 'Urlaubstage', 'Frei', 'Freie Tage'], [['Freitag, 7. Mai', 1, '6. – 9. Mai', 4], ['18. – 21. Mai', 4, '15. – 23. Mai', 9], ['Freitag, 28. Mai', 1, '27. – 30. Mai', 4], ['18. – 26. Mai und 28. Mai', 8, '15. – 30. Mai', 16]], 'Brücken um Himmelfahrt, Pfingsten und Fronleichnam 2027 (Land mit Fronleichnam)', ['l', 'r', 'l', 'r'])}
<p>In Ländern ohne Fronleichnam bleiben die ersten beiden Brücken. Welche Variante bei Ihrem Urlaubsbudget die meisten freien Tage bringt, rechnet der ${h.a('home', 'Brückentage-Optimierer')} aus.</p>
<h2>Woher das Pfingstdatum kommt</h2>
<p>Pfingsten bedeutet „der fünfzigste Tag“: Der Pfingstsonntag ist der fünfzigste Tag der Osterzeit, wenn man Ostersonntag mitzählt. Deshalb hängt Pfingsten wie alle beweglichen Feiertage am Osterdatum, das nach der ${h.src('ostern-ptb', 'Gaußschen Osterformel')} berechnet wird. Mehr zum Osterdatum steht unter ${h.a('ostern-2027', 'Ostern 2027')}, zum Donnerstag danach unter ${h.a('fronleichnam', 'Fronleichnam')}.</p>
${h.mini('pf', { p: ['jahr'], d: { jahr: 2028 }, c: 'Pfingsten in einem anderen Jahr' })}`,
    },
    en: {
      slug: 'whitsun-2027', nav: 'Whitsun 2027', card: 'Whit Sunday on 16 May, Whit Monday off',
      title: 'Whitsun 2027 Germany: date, countdown and May bridge days',
      description: 'Whitsun (Pentecost) 2027 in Germany falls on 16 and 17 May; Whit Monday is off in every state. With a countdown, the dates to 2034 and the May bridge days.',
      h1: 'Whitsun 2027: 16 and 17 May',
      intro: 'Pick a year: the calculator gives Whit Sunday and Whit Monday and the dates in the following years, derived from the Easter date.',
      resume: `Whitsun falls on Sunday 16 May and Monday 17 May in 2027. Whit Monday is a statutory holiday in all sixteen states. Only Brandenburg expressly lists Whit Sunday as a holiday; as a Sunday it is a day off everywhere. Whitsun always falls 49 days, or seven weeks, after Easter Sunday, so between 10 May and 13 June. Because Easter is early in 2027, so is Whitsun: in 2028 it only comes on 4 and 5 June. For leave planning, Whitsun 2027 is the middle of a run of three holidays within three weeks: Ascension Day on Thursday 6 May, Whit Monday on 17 May and, in six states, Corpus Christi on Thursday 27 May. Four leave days from Tuesday 18 to Friday 21 May turn the long Whitsun weekend into nine days off. In states with Corpus Christi, the week after Whitsun and the bridge day on 28 May can be joined.`,
      faqs: [
        { q: 'Is Whit Sunday a public holiday in Germany?', a: "Legally, only in Brandenburg, whose holiday act lists Easter Sunday and Whit Sunday. In the other states it is an ordinary Sunday with Sunday rest. For employees it only makes a difference to supplements for work on public holidays. Shops are closed on both days." },
        { q: 'When is Whitsun 2028?', a: 'On Sunday 4 June and Monday 5 June 2028, three weeks later than in 2027. Corpus Christi follows on Thursday 15 June. As every year, ten days separate Whit Monday and Corpus Christi. Whitsun falls between 10 May and 13 June.' },
        { q: 'Which bridges does Whitsun 2027 offer?', a: 'Four leave days after Whit Monday, 18 to 21 May, give nine days off from 15 to 23 May. Where Corpus Christi applies, Friday 28 May gives four days off for one leave day. Joining both takes eight leave days for sixteen days off, from 15 to 30 May.' },
      ],
      body: (h) => `<h2>Three holidays in three weeks</h2>
<p>In 2027 the holidays after Easter are close together. If you plan leave in May, you can choose between short, high-yield bridges and one long break. The table shows the options for a state with Corpus Christi, such as North Rhine-Westphalia.</p>
${h.table(['Leave', 'Leave days', 'Off', 'Days off'], [['Friday 7 May', 1, '6 – 9 May', 4], ['18 – 21 May', 4, '15 – 23 May', 9], ['Friday 28 May', 1, '27 – 30 May', 4], ['18 – 26 May and 28 May', 8, '15 – 30 May', 16]], 'Bridges around Ascension, Whitsun and Corpus Christi 2027 (state with Corpus Christi)', ['l', 'r', 'l', 'r'])}
<p>In states without Corpus Christi the first two bridges remain. Which option buys the most days off for your leave budget is worked out by the ${h.a('home', 'bridge-day planner')}.</p>
<h2>Where the Whitsun date comes from</h2>
<p>Pentecost means "the fiftieth day": Whit Sunday is the fiftieth day of Eastertide, counting Easter Sunday. So, like every movable holiday, Whitsun depends on the Easter date, computed with ${h.src('ostern-ptb', "Gauss's Easter formula")}. More on the Easter date is on ${h.a('ostern-2027', 'Easter 2027')}, and on the Thursday after on ${h.a('fronleichnam', 'Corpus Christi')}.</p>
${h.mini('pf', { p: ['jahr'], d: { jahr: 2028 }, c: 'Whitsun in another year' })}`,
    },
  }),
  defineGuide({
    id: 'zeitumstellung', group: 'termine', order: 62, tool: 'zu', toolArg: { jahr: 2027 },
    countdown: { date: Z27.beginn, time: '02:00', label: { de: 'Zeitumstellung März 2027', en: 'Clocks change March 2027' } },
    related: ['ostern-2027', 'kalender-2027', 'home', 'muttertag-2027'],
    sources: ['eu-sommerzeit'],
    de: {
      slug: 'zeitumstellung', nav: 'Zeitumstellung', card: 'Uhr vor am 28. März 2027, zurück am 31. Oktober',
      title: 'Zeitumstellung 2027: Uhr vor am 28. März, zurück im Oktober',
      description: 'Zeitumstellung 2027: Am 28. März wird die Uhr um 2 Uhr auf 3 Uhr vorgestellt, am 31. Oktober von 3 auf 2 Uhr zurück. Mit Countdown und Terminen bis 2033.',
      h1: 'Zeitumstellung 2027: wann die Uhr umgestellt wird',
      intro: 'Jahr wählen: Der Rechner nennt Beginn und Ende der Sommerzeit und die Termine der folgenden Jahre nach der europäischen Regel.',
      resume: `Die nächste Zeitumstellung ist am Sonntag, 28. März 2027: Um 2 Uhr mitteleuropäischer Zeit werden die Uhren auf 3 Uhr vorgestellt, die Nacht ist eine Stunde kürzer. Am Sonntag, 31. Oktober 2027, endet die Sommerzeit; dann werden die Uhren um 3 Uhr auf 2 Uhr zurückgestellt, und die Stunde von 2 bis 3 Uhr gibt es zweimal. 2027 dauert die Sommerzeit ${tage} Tage. Die Regel ist in der ganzen Europäischen Union gleich: Die Sommerzeit beginnt am letzten Sonntag im März und endet am letzten Sonntag im Oktober, jeweils um 1 Uhr Weltzeit. 2028 fallen die Termine auf den 26. März und den 29. Oktober. Ein Vorschlag der EU-Kommission von 2018, die Umstellung abzuschaffen, ist bisher nicht umgesetzt, weil sich die Mitgliedstaaten nicht auf eine gemeinsame Zeit einigen konnten. Funkuhren stellen sich über das Zeitsignal der Physikalisch-Technischen Bundesanstalt selbst um, Telefone und Computer über das Netz. Ostersonntag 2027 fällt auf denselben 28. März.`,
      faqs: [
        { q: 'Wird die Uhr im März vor- oder zurückgestellt?', a: 'Im März wird sie vorgestellt, von 2 auf 3 Uhr; im Oktober zurück, von 3 auf 2 Uhr. Eine Merkhilfe: Im Frühjahr stellt man die Gartenmöbel vor das Haus, im Herbst zurück in den Schuppen. Im März fehlt also eine Stunde Schlaf.' },
        { q: 'Wird die Zeitumstellung abgeschafft?', a: 'Bisher nicht. Das Europäische Parlament hat 2019 für die Abschaffung gestimmt, der Rat der Mitgliedstaaten hat aber nicht entschieden. Ohne Einigung, ob dauerhaft Sommer- oder Winterzeit gelten soll, bleibt die Richtlinie von 2000 in Kraft, und die Uhren werden weiter zweimal im Jahr umgestellt.' },
        { q: 'Wann ist die Zeitumstellung im Oktober 2027?', a: `Am Sonntag, 31. Oktober 2027, um 3 Uhr Sommerzeit; die Uhren springen auf 2 Uhr zurück. 2028 ist es der 29. Oktober. Die Nacht der Rückstellung hat 25 Stunden, was bei Nachtschichten zu einer zusätzlichen bezahlten Stunde führen kann. Wer schläft, gewinnt eine Stunde.` },
      ],
      body: (h) => `<h2>Die Regel</h2>
<p>Die ${h.src('eu-sommerzeit', 'Richtlinie 2000/84/EG')} legt für alle Mitgliedstaaten dieselben Termine fest: Beginn am letzten Sonntag im März, Ende am letzten Sonntag im Oktober, jeweils um 1 Uhr koordinierter Weltzeit. In Deutschland ist das 2 Uhr im März und 3 Uhr im Oktober. Weil der letzte Sonntag eines Monats immer zwischen dem 25. und dem 31. liegt, wandern die Termine innerhalb dieser Woche.</p>
${h.table(['Jahr', 'Uhr vor', 'Uhr zurück'], [2027, 2028, 2029, 2030].map((y) => { const z = sommerzeit(y); return [y, L(z.beginn, 'de'), L(z.ende, 'de')]; }), 'Zeitumstellung 2027 bis 2030', ['r', 'l', 'l'])}
<h2>Was die Umstellung im Alltag ändert</h2>
<p>Für Arbeitszeiten zählt die tatsächlich gearbeitete Zeit. Wer in der Märznacht eine Schicht von 22 bis 6 Uhr hat, arbeitet nur sieben Stunden, in der Oktobernacht neun. Wie das bezahlt wird, regeln Tarifverträge und Betriebsvereinbarungen. Züge, die zur Umstellung unterwegs sind, halten im Oktober eine Stunde, im März fahren sie mit Verspätung weiter.</p>
<p>2027 fällt der Beginn der Sommerzeit mit Ostersonntag zusammen; die Nacht vor dem Fest ist eine Stunde kürzer. Mehr zum Osterdatum unter ${h.a('ostern-2027', 'Ostern 2027')}; der ${h.a('kalender-2027', 'Kalender 2027')} zeigt beide Termine im Jahresüberblick.</p>
${h.mini('zu', { p: ['jahr'], d: { jahr: 2028 }, c: 'Zeitumstellung in einem anderen Jahr' })}`,
    },
    en: {
      slug: 'clocks-change', nav: 'Clocks change', card: 'Forward on 28 March 2027, back on 31 October',
      title: 'Clocks change Germany 2027: forward 28 March, back October',
      description: 'Daylight saving time in Germany 2027: clocks go forward from 2:00 to 3:00 on 28 March and back on 31 October. With a countdown and every date up to 2033.',
      h1: 'Clocks change in Germany 2027: when to adjust',
      intro: 'Pick a year: the calculator gives the start and end of summer time and the dates in the following years under the European rule.',
      resume: `The next clock change is on Sunday 28 March 2027: at 2:00 Central European Time clocks go forward to 3:00, and the night is an hour shorter. Summer time ends on Sunday 31 October 2027, when clocks go back from 3:00 to 2:00 and the hour from 2:00 to 3:00 happens twice. In 2027 summer time lasts ${tage} days. The rule is the same across the European Union: summer time begins on the last Sunday in March and ends on the last Sunday in October, each time at 1:00 UTC. In 2028 the dates are 26 March and 29 October. A 2018 European Commission proposal to end the clock changes has not been implemented, because member states could not agree on a common time. Radio-controlled clocks change themselves via the time signal of the national metrology institute, PTB, and phones and computers over the network. Easter Sunday 2027 falls on the same 28 March.`,
      faqs: [
        { q: 'Do clocks go forward or back in March in Germany?', a: 'Forward in March, from 2:00 to 3:00, and back in October, from 3:00 to 2:00. A memory aid: in spring the garden furniture goes out in front of the house, in autumn back into the shed. So March costs you an hour of sleep.' },
        { q: 'Will the clock change be abolished in the EU?', a: 'Not so far. The European Parliament voted for abolition in 2019, but the Council of member states has not decided. Without agreement on whether permanent summer or winter time should apply, the 2000 directive stays in force and clocks keep changing twice a year.' },
        { q: 'When do the clocks go back in October 2027?', a: 'On Sunday 31 October 2027 at 3:00 summer time; clocks jump back to 2:00. In 2028 it is 29 October. The night the clocks go back lasts 25 hours, which can mean an extra paid hour for night shifts. If you are asleep, you gain an hour.' },
      ],
      body: (h) => `<h2>The rule</h2>
<p>${h.src('eu-sommerzeit', 'Directive 2000/84/EC')} sets the same dates for every member state: start on the last Sunday in March, end on the last Sunday in October, each at 1:00 Coordinated Universal Time. In Germany that is 2:00 in March and 3:00 in October. Because the last Sunday of a month always falls between the 25th and the 31st, the dates move within that week.</p>
${h.table(['Year', 'Clocks forward', 'Clocks back'], [2027, 2028, 2029, 2030].map((y) => { const z = sommerzeit(y); return [y, L(z.beginn, 'en'), L(z.ende, 'en')]; }), 'Clock changes 2027 to 2030', ['r', 'l', 'l'])}
<h2>What the change means day to day</h2>
<p>For working hours, the time actually worked counts. Someone on a 22:00 to 6:00 shift works only seven hours on the March night and nine on the October night. How that is paid is set by collective and works agreements. Trains running at the time of the change wait an hour in October, while in March they carry on with a delay.</p>
<p>In 2027 the start of summer time coincides with Easter Sunday; the night before the feast is an hour shorter. More on the Easter date is on ${h.a('ostern-2027', 'Easter 2027')}; the ${h.a('kalender-2027', 'calendar 2027')} shows both dates in the year overview.</p>
${h.mini('zu', { p: ['jahr'], d: { jahr: 2028 }, c: 'Clock changes in another year' })}`,
    },
  }),
  defineGuide({
    id: 'muttertag-2027', group: 'termine', order: 63, tool: 'mt', toolArg: { jahr: 2027 },
    countdown: { date: MT(2027), label: { de: 'Muttertag 2027', en: "Mother's Day 2027" } },
    related: ['pfingsten-2027', 'ostern-2027', 'feiertage-2027', 'home'],
    sources: ['ostern-ptb', 'einigungsvertrag'],
    de: {
      slug: 'muttertag-2027', nav: 'Muttertag 2027', card: 'Sonntag, 9. Mai, drei Tage nach dem Vatertag',
      title: 'Muttertag 2027: Datum, Countdown und Vatertag im Mai',
      description: 'Muttertag 2027 ist am Sonntag, 9. Mai, wie immer am zweiten Sonntag im Mai. Mit Countdown, den Terminen bis 2033 und dem Vatertag an Christi Himmelfahrt.',
      h1: 'Muttertag 2027: Sonntag, 9. Mai',
      intro: 'Jahr wählen: Der Rechner nennt Muttertag und Vatertag und zeigt, ob Muttertag mit Pfingsten zusammenfällt.',
      resume: `Muttertag ist 2027 am Sonntag, 9. Mai. In Deutschland fällt er immer auf den zweiten Sonntag im Mai, also zwischen den 8. und den 14. Mai. Er ist kein gesetzlicher Feiertag, aber als Sonntag ohnehin für die meisten arbeitsfrei. Der Vatertag, auch Herrentag genannt, wird in Deutschland an Christi Himmelfahrt begangen, 2027 am Donnerstag, 6. Mai, drei Tage vor dem Muttertag; Himmelfahrt ist ein bundesweiter gesetzlicher Feiertag. Weil der Vatertag am Osterdatum hängt und der Muttertag am Kalender, ändert sich ihr Abstand jedes Jahr: 2028 liegt der Muttertag am 14. Mai, der Vatertag erst am 25. Mai. Fällt Pfingsten auf den zweiten Sonntag im Mai, wie zuletzt 2008, wird der Muttertag in vielen Familien eine Woche vorgezogen, was jedoch keine feste Regel ist. Der Brauch kam nach dem Ersten Weltkrieg aus den USA nach Deutschland. Wer am Freitag nach Himmelfahrt frei nimmt, verbindet 2027 Vatertag und Muttertag zu einem langen Wochenende mit einem zusätzlichen Sonntag.`,
      faqs: [
        { q: 'Ist Muttertag ein Feiertag?', a: 'Nein. Muttertag ist in keinem Land ein gesetzlicher Feiertag. Weil er auf einen Sonntag fällt, ist er für die meisten Beschäftigten trotzdem frei. Geschäfte sind geschlossen; Blumenläden dürfen nach den Ladenöffnungsgesetzen der Länder an Sonntagen oft für einige Stunden öffnen.' },
        { q: 'Wann ist Vatertag 2027?', a: 'Am Donnerstag, 6. Mai 2027, an Christi Himmelfahrt. Der Tag ist ein bundesweiter gesetzlicher Feiertag. Mit einem Urlaubstag am Freitag, 7. Mai, haben Sie vier freie Tage bis Sonntag, 9. Mai, dem Muttertag. Viele feiern ihn mit Ausflügen; wie an jedem Feiertag sind Geschäfte geschlossen.' },
        { q: 'Wann ist Muttertag 2028?', a: 'Am Sonntag, 14. Mai 2028, dem spätestmöglichen Termin, weil der 1. Mai 2028 ein Montag ist. Der Vatertag folgt 2028 erst elf Tage später, am 25. Mai. Der früheste mögliche Termin ist der 8. Mai, wenn der 1. Mai ein Sonntag ist, wie 2022.' },
      ],
      body: (h) => `<h2>Muttertag und Vatertag in den nächsten Jahren</h2>
${h.table(['Jahr', 'Muttertag', 'Vatertag (Himmelfahrt)'], [2027, 2028, 2029, 2030, 2031].map((y) => [y, L(MT(y), 'de'), L(off(K.ostersonntag(y), 39), 'de')]), 'Muttertag (zweiter Sonntag im Mai) und Vatertag 2027 bis 2031', ['r', 'l', 'l'])}
<p>Der Vatertag folgt aus dem ${h.src('ostern-ptb', 'Osterdatum')}: Christi Himmelfahrt ist 39 Tage nach Ostersonntag. Deshalb kann er vor oder nach dem Muttertag liegen. 2027 sind es nur drei Tage dazwischen, weil Ostern früh ist; 2028 und 2030 liegt er weit hinter dem Muttertag.</p>
<h2>Woher der Muttertag kommt</h2>
<p>Die Amerikanerin Anna Jarvis setzte sich ab 1907 für einen Ehrentag der Mütter ein; seit 1914 ist der zweite Sonntag im Mai in den USA offizieller Muttertag. In Deutschland verbreitete sich der Tag in den 1920er-Jahren, getragen auch vom Verband der Blumengeschäftsinhaber. Andere Länder feiern an anderen Tagen, Großbritannien etwa am vierten Fastensonntag, Frankreich meist am letzten Sonntag im Mai.</p>
<p>Für die Urlaubsplanung bringt der Muttertag keinen zusätzlichen Tag, die Woche davor aber schon: Himmelfahrt am 6. Mai und der Brückentag am 7. Mai machen das Wochenende lang. Alle Brücken im Mai stehen unter ${h.a('pfingsten-2027', 'Pfingsten 2027')}.</p>
${h.mini('mt', { p: ['jahr'], d: { jahr: 2028 }, c: 'Muttertag in einem anderen Jahr' })}`,
    },
    en: {
      slug: 'mothers-day-2027', nav: "Mother's Day 2027", card: "Sunday 9 May, three days after Father's Day",
      title: "Mother's Day Germany 2027: date, countdown, Father's Day",
      description: "Mother's Day 2027 in Germany falls on Sunday 9 May, the second Sunday in May as always. With a countdown, the dates up to 2033 and Father's Day on Ascension.",
      h1: "Mother's Day in Germany 2027: Sunday 9 May",
      intro: "Pick a year: the calculator gives Mother's Day and Father's Day and shows whether Mother's Day coincides with Whitsun.",
      resume: `Mother's Day falls on Sunday 9 May in 2027. In Germany it is always the second Sunday in May, so between 8 and 14 May. It is not a public holiday, but as a Sunday it is a day off for most people anyway. Father's Day, also called Men's Day, is marked in Germany on Ascension Day, Thursday 6 May in 2027, three days before Mother's Day; Ascension Day is a nationwide public holiday. Because Father's Day depends on the Easter date and Mother's Day on the calendar, the gap between them changes every year: in 2028 Mother's Day falls on 14 May and Father's Day only on 25 May. When Whitsun falls on the second Sunday in May, as last in 2008, many families move Mother's Day a week earlier, though that is not a fixed rule. The custom came to Germany from the United States after the First World War. Taking the Friday after Ascension Day off in 2027 joins Father's Day and Mother's Day into a long weekend.`,
      faqs: [
        { q: "Is Mother's Day a public holiday in Germany?", a: "No. Mother's Day is not a statutory holiday in any state. Because it falls on a Sunday, most employees have it off anyway. Shops are closed; under the states' shop opening laws, florists are often allowed to open for a few hours on Sundays." },
        { q: "When is Father's Day 2027 in Germany?", a: 'On Thursday 6 May 2027, Ascension Day. It is a nationwide public holiday. One leave day on Friday 7 May gives four days off through to Sunday 9 May, Mother\'s Day. Shops are closed, as on every public holiday, and many people go on day trips.' },
        { q: "When is Mother's Day 2028 in Germany?", a: "On Sunday 14 May 2028, the latest possible date, because 1 May 2028 is a Monday. Father's Day only follows eleven days later in 2028, on 25 May. The earliest possible date is 8 May, when 1 May is a Sunday, as in 2022." },
      ],
      body: (h) => `<h2>Mother's Day and Father's Day in the coming years</h2>
${h.table(['Year', "Mother's Day", "Father's Day (Ascension)"], [2027, 2028, 2029, 2030, 2031].map((y) => [y, L(MT(y), 'en'), L(off(K.ostersonntag(y), 39), 'en')]), "Mother's Day (second Sunday in May) and Father's Day 2027 to 2031", ['r', 'l', 'l'])}
<p>Father's Day follows from the ${h.src('ostern-ptb', 'Easter date')}: Ascension Day is 39 days after Easter Sunday. So it can fall before or after Mother's Day. In 2027 there are only three days between them because Easter is early; in 2028 and 2030 it falls well after Mother's Day.</p>
<h2>Where Mother's Day comes from</h2>
<p>The American Anna Jarvis campaigned for a day honouring mothers from 1907; since 1914 the second Sunday in May has been the official Mother's Day in the United States. In Germany the day spread in the 1920s, backed among others by the florists' association. Other countries celebrate on other days: the United Kingdom on the fourth Sunday of Lent, France usually on the last Sunday in May.</p>
<p>For leave planning, Mother's Day adds no extra day, but the week before does: Ascension Day on 6 May and the bridge day on 7 May make the weekend long. Every bridge in May is on ${h.a('pfingsten-2027', 'Whitsun 2027')}.</p>
${h.mini('mt', { p: ['jahr'], d: { jahr: 2028 }, c: "Mother's Day in another year" })}`,
    },
  }),
];
