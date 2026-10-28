/** Feiertage 2026, 2027, 2028 : un calendrier par année, les 16 Länder. Dates : moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { tabelleJahr, tabelleLaender } from '../../lib/bausteine';
import { dLong } from '../../lib/tool-specs';

const d = (iso: string, l: 'de' | 'en') => dLong(iso, l);
const nwWk = (y: number) => K.feiertage(y, 'NW', 'std').filter((f) => !K.isWeekend(K.fromIso(f.date))).length;
const SRC = ['einigungsvertrag', 'ftg-by', 'ftg-nw', 'ftg-bw', 'ftg-be', 'ftg-sn', 'ftg-th'];

export default [
  defineGuide({
    id: 'feiertage-2027', group: 'feiertage', order: 20, tool: 'ft', toolArg: { jahr: 2027 },
    countdown: { date: '2027-01-01', label: { de: 'Neujahr 2027', en: "New Year's Day 2027" } },
    related: ['home', 'kalender-2027', 'arbeitstage-2027', 'feiertage-2028', 'feiertage-bayern', 'feiertage-nrw'],
    sources: SRC,
    de: {
      slug: 'feiertage-2027', nav: 'Feiertage 2027', card: 'Alle gesetzlichen Feiertage 2027, für jedes Land',
      title: 'Feiertage 2027: alle gesetzlichen Feiertage nach Bundesland',
      description: 'Feiertage 2027 in Deutschland: alle gesetzlichen Feiertage mit Datum und Wochentag für die 16 Bundesländer, mit Teil-Feiertagen in Bayern, Sachsen, Thüringen.',
      h1: 'Feiertage 2027 in Deutschland, Land für Land',
      intro: 'Bundesland wählen: Die Liste zeigt jeden gesetzlichen Feiertag 2027 mit Wochentag, wie viele davon auf einen Werktag fallen und wie viele Arbeitstage bleiben.',
      resume: `Bundesweit gibt es 2027 neun gesetzliche Feiertage: Neujahr am Freitag, ${d('2027-01-01', 'de')}, Karfreitag am ${d('2027-03-26', 'de')}, Ostermontag am ${d('2027-03-29', 'de')}, den Tag der Arbeit am Samstag, 1. Mai, Christi Himmelfahrt am ${d('2027-05-06', 'de')}, Pfingstmontag am ${d('2027-05-17', 'de')}, den Tag der Deutschen Einheit am Sonntag, 3. Oktober, sowie den ersten und zweiten Weihnachtstag am Samstag und Sonntag. Je nach Land kommen ein bis vier weitere Tage hinzu: Fronleichnam am ${d('2027-05-27', 'de')} in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland, Allerheiligen am Montag, 1. November, in denselben Ländern außer Hessen, der Reformationstag am Sonntag, 31. Oktober, in neun Ländern im Norden und Osten. Insgesamt hat Berlin 2027 zehn Feiertage, eine bayerische Gemeinde mit Mariä Himmelfahrt dreizehn. Weil der 1. Mai, der 3. Oktober und Weihnachten auf ein Wochenende fallen, liegen 2027 ungewöhnlich wenige Feiertage auf Werktagen, in Nordrhein-Westfalen nur ${nwWk(2027)}.`,
      faqs: [
        { q: 'Wie viele Feiertage hat Deutschland 2027?', a: 'Bundesweit neun. Dazu kommen je nach Land ein bis vier weitere: Berlin, Bremen, Hamburg, Hessen, Niedersachsen und Schleswig-Holstein haben zehn, Mecklenburg-Vorpommern, Nordrhein-Westfalen, Rheinland-Pfalz, Sachsen, Sachsen-Anhalt und Thüringen elf, Baden-Württemberg, Brandenburg und das Saarland zwölf. In Bayern sind es dreizehn in Gemeinden mit Mariä Himmelfahrt und vierzehn in Augsburg.' },
        { q: 'Welche Feiertage fallen 2027 auf ein Wochenende?', a: 'Der Tag der Arbeit am Samstag, 1. Mai, der Tag der Deutschen Einheit am Sonntag, 3. Oktober, der Reformationstag am Sonntag, 31. Oktober, und beide Weihnachtstage am 25. und 26. Dezember. In Bayern und im Saarland kommt Mariä Himmelfahrt am Sonntag, 15. August, hinzu, in Augsburg das Friedensfest am Sonntag, 8. August. Ersatztage gibt es dafür nicht.' },
        { q: 'Wann ist Fronleichnam 2027?', a: 'Am Donnerstag, 27. Mai 2027, sechzig Tage nach Ostersonntag. Gesetzlicher Feiertag ist Fronleichnam in Baden-Württemberg, Bayern, Hessen, Nordrhein-Westfalen, Rheinland-Pfalz und im Saarland, dazu in einzelnen Gemeinden der sächsischen Lausitz und im thüringischen Eichsfeld. Der Freitag danach, 28. Mai, ist einer der beiden echten Brückentage des Jahres.' },
        { q: 'Ist der Reformationstag 2027 ein Feiertag?', a: 'Ja, in Brandenburg, Bremen, Hamburg, Mecklenburg-Vorpommern, Niedersachsen, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen. 2027 fällt er aber auf einen Sonntag und bringt deshalb keinen zusätzlichen freien Tag. In den übrigen sieben Ländern ist der 31. Oktober kein gesetzlicher Feiertag. Im Jahr 2028 fällt er dagegen auf einen Dienstag.' },
      ],
      body: (h) => `<h2>Alle Feiertage 2027 auf einen Blick</h2>
<p>Die Tabelle nennt jeden Feiertag des Jahres mit den Ländern, in denen er gilt. Die Kürzel stehen in der Überschrift; „teilweise“ heißt, dass der Tag nur in einem Teil des Landes frei ist.</p>
${tabelleJahr(h, 2027)}
<h2>Ein Jahr mit vielen Feiertagen am Wochenende</h2>
<p>Für Arbeitnehmer ist 2027 ein mageres Jahr. Von den neun bundesweiten Feiertagen fallen nur sechs auf Werktage; der 1. Mai, der 3. Oktober und beide Weihnachtstage liegen auf Samstag oder Sonntag. Da kein Land einen Ersatztag kennt, sind diese Tage schlicht verloren. Dafür ist der Jahresanfang günstig: Neujahr am Freitag macht ein langes Wochenende, und wo Heilige Drei Könige gilt, liegt der Feiertag am Mittwoch mitten in der ersten Arbeitswoche.</p>
<p>Ostern liegt 2027 früh, Ostersonntag ist schon am 28. März. Deshalb folgen auch Himmelfahrt, Pfingsten und Fronleichnam früh aufeinander, zwischen dem 6. und dem 27. Mai. Wer seine Brücken um diese drei Wochen plant, holt die meisten freien Tage heraus; der ${h.a('home', 'Brückentage-Optimierer')} rechnet es für Ihr Land aus.</p>
${h.mini('bt', { p: ['land', 'urlaub'], c: 'Brücken 2027 für Ihr Land planen' })}
<h2>Feiertage und Arbeitstage je Land</h2>
<p>Die Zahl der Arbeitstage ergibt sich aus den Werktagen Montag bis Freitag abzüglich der Feiertage, die auf einen dieser Tage fallen. 2027 hat 261 solche Werktage. Wie viele davon übrig bleiben, zeigt die Übersicht.</p>
${tabelleLaender(h, 2027)}
<p>Mehr zu Arbeitstagen, auch für Teilzeit mit vier oder drei Tagen pro Woche, steht unter ${h.a('arbeitstage-2027', 'Arbeitstage 2027')}. Einen druckbaren Jahreskalender mit Kalenderwochen gibt es unter ${h.a('kalender-2027', 'Kalender 2027')}.</p>
<h2>Woher die Daten stammen</h2>
<p>Jedes Land regelt seine Feiertage selbst. Grundlage dieser Liste sind die sechzehn Feiertagsgesetze in der geltenden Fassung, für den 3. Oktober der ${h.src('einigungsvertrag', 'Einigungsvertrag')}. Die beweglichen Feiertage berechnen wir aus dem Osterdatum nach der Gaußschen Formel; feste Feiertage aus ihrem Datum. Für Bayern gilt die amtliche Liste der Gemeinden mit ${h.a('mariae-himmelfahrt', 'Mariä Himmelfahrt')}, für Sachsen und Thüringen die Regeln zu ${h.a('fronleichnam', 'Fronleichnam')}.</p>`,
    },
    en: {
      slug: 'public-holidays-2027', nav: 'Public holidays 2027', card: 'Every statutory holiday in 2027, for each state',
      title: 'Public holidays Germany 2027: every state, every date',
      description: 'Public holidays in Germany 2027: every statutory holiday with date and weekday for all 16 states, including holidays in part of Bavaria, Saxony, Thuringia.',
      h1: 'Public holidays in Germany 2027, state by state',
      intro: 'Pick a state: the list shows every statutory public holiday in 2027 with its weekday, how many fall on a working day and how many working days remain.',
      resume: `Germany has nine nationwide public holidays in 2027: New Year's Day on Friday ${d('2027-01-01', 'en')}, Good Friday on ${d('2027-03-26', 'en')}, Easter Monday on ${d('2027-03-29', 'en')}, Labour Day on Saturday 1 May, Ascension Day on ${d('2027-05-06', 'en')}, Whit Monday on ${d('2027-05-17', 'en')}, German Unity Day on Sunday 3 October, and Christmas Day and Boxing Day on Saturday and Sunday. Depending on the state, one to four more days are added: Corpus Christi on ${d('2027-05-27', 'en')} in Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate and Saarland, All Saints' Day on Monday 1 November in the same states except Hesse, and Reformation Day on Sunday 31 October in nine states in the north and east. In all, Berlin has ten public holidays in 2027 and a Bavarian municipality that keeps Assumption Day has thirteen. Because 1 May, 3 October and Christmas fall on a weekend, unusually few holidays land on weekdays in 2027: only ${nwWk(2027)} in North Rhine-Westphalia.`,
      faqs: [
        { q: 'How many public holidays does Germany have in 2027?', a: 'Nine nationwide, plus one to four more depending on the state. Berlin, Bremen, Hamburg, Hesse, Lower Saxony and Schleswig-Holstein have ten; Mecklenburg-Western Pomerania, North Rhine-Westphalia, Rhineland-Palatinate, Saxony, Saxony-Anhalt and Thuringia eleven; Baden-Württemberg, Brandenburg and Saarland twelve. Bavaria has thirteen in municipalities that keep Assumption Day and fourteen in Augsburg.' },
        { q: 'Which German public holidays fall on a weekend in 2027?', a: 'Labour Day on Saturday 1 May, German Unity Day on Sunday 3 October, Reformation Day on Sunday 31 October and both Christmas holidays on 25 and 26 December. In Bavaria and Saarland, Assumption Day on Sunday 15 August is added, and in Augsburg the Peace Festival on Sunday 8 August. No substitute days are given for any of them.' },
        { q: 'When is Corpus Christi in 2027?', a: 'On Thursday 27 May 2027, sixty days after Easter Sunday. It is a public holiday in Baden-Württemberg, Bavaria, Hesse, North Rhine-Westphalia, Rhineland-Palatinate and Saarland, and in some municipalities of Lusatia in Saxony and the Eichsfeld in Thuringia. The Friday after it, 28 May, is one of the two true bridge days of the year.' },
        { q: 'Is Reformation Day 2027 a public holiday?', a: 'Yes, in Brandenburg, Bremen, Hamburg, Mecklenburg-Western Pomerania, Lower Saxony, Saxony, Saxony-Anhalt, Schleswig-Holstein and Thuringia. In 2027, though, it falls on a Sunday and so gives no extra day off. In the other seven states 31 October is not a public holiday at all.' },
      ],
      body: (h) => `<h2>All 2027 holidays at a glance</h2>
<p>The table lists each holiday of the year with the states where it applies. The abbreviations are in the caption; "in part" means the day is off in only part of that state.</p>
${tabelleJahr(h, 2027)}
<h2>A year with many holidays on the weekend</h2>
<p>For employees 2027 is a lean year. Of the nine nationwide holidays only six fall on weekdays; 1 May, 3 October and both Christmas holidays land on a Saturday or Sunday. As no state gives substitute days, those days are simply lost. The start of the year is kinder: New Year's Day on a Friday makes a long weekend, and where Epiphany applies it sits on a Wednesday in the middle of the first working week.</p>
<p>Easter is early in 2027, with Easter Sunday on 28 March. Ascension Day, Whitsun and Corpus Christi therefore follow each other closely between 6 and 27 May. Plan your bridges around those three weeks to get the most days off; the ${h.a('home', 'bridge-day planner')} works it out for your state.</p>
${h.mini('bt', { p: ['land', 'urlaub'], c: 'Plan your 2027 bridges' })}
<h2>Holidays and working days by state</h2>
<p>The number of working days is the Mondays to Fridays of the year minus the holidays that fall on one of them. 2027 has 261 such weekdays. The overview shows how many remain in each state.</p>
${tabelleLaender(h, 2027)}
<p>More on working days, including part-time with four or three days a week, is on ${h.a('arbeitstage-2027', 'working days 2027')}. A printable year calendar with week numbers is on ${h.a('kalender-2027', 'calendar 2027')}.</p>
<h2>Where the data comes from</h2>
<p>Each state sets its own holidays. This list is based on the sixteen holiday acts as in force, and for 3 October on the ${h.src('einigungsvertrag', 'Unification Treaty')}. Movable holidays are derived from the Easter date by Gauss's formula, fixed ones from their date. For Bavaria the official list of municipalities with ${h.a('mariae-himmelfahrt', 'Assumption Day')} applies, for Saxony and Thuringia the rules on ${h.a('fronleichnam', 'Corpus Christi')}.</p>`,
    },
  }),
  defineGuide({
    id: 'feiertage-2026', group: 'feiertage', order: 19, tool: 'ft', toolArg: { jahr: 2026 },
    countdown: { date: '2026-12-25', label: { de: '1. Weihnachtstag', en: 'Christmas Day' } },
    related: ['feiertage-2027', 'brueckentage-2026', 'kalender-2027', 'feiertage-sachsen'],
    sources: SRC,
    de: {
      slug: 'feiertage-2026', nav: 'Feiertage 2026', card: 'Die Feiertage 2026 und was bis Jahresende noch kommt',
      title: 'Feiertage 2026: alle Termine und was bis Silvester kommt',
      description: 'Feiertage 2026 für alle 16 Bundesländer mit Datum und Wochentag: Reformationstag, Allerheiligen, Buß- und Bettag und Weihnachten, dazu ein Rückblick aufs Jahr.',
      h1: 'Feiertage 2026: die letzten Termine des Jahres und der Rückblick',
      intro: 'Bundesland wählen: Die Liste zeigt alle Feiertage 2026 mit Wochentag. Bis zum Jahresende fehlen nur noch wenige, die meisten davon am Wochenende.',
      resume: `Von den Feiertagen des Jahres 2026 stehen Ende Oktober nur noch wenige aus, und sie liegen ungünstig. Der Reformationstag am ${d('2026-10-31', 'de')} ist ein Samstag, Allerheiligen am 1. November ein Sonntag. In Sachsen folgt am Mittwoch, ${d('2026-11-18', 'de')}, der Buß- und Bettag, der einzige Feiertag im November, der auf einen Werktag fällt. Weihnachten bringt dann ein langes Wochenende: Der erste Weihnachtstag ist ein Freitag, der zweite ein Samstag. Heiligabend am Donnerstag und Silvester am Donnerstag sind gesetzlich normale Arbeitstage. Wer zwischen den Jahren frei nehmen will, kommt mit vier Urlaubstagen vom 28. bis 31. Dezember auf zehn freie Tage am Stück, vom ersten Weihnachtstag bis zum Sonntag, 3. Januar 2027; ist Heiligabend im Betrieb frei, sind es elf. Insgesamt hatte 2026 je nach Land zehn bis dreizehn Feiertage, in Augsburg vierzehn; Neujahr am Donnerstag und der 1. Mai am Freitag machten den Anfang des Jahres besonders günstig.`,
      faqs: [
        { q: 'Welche Feiertage kommen 2026 noch?', a: 'Nach Ende Oktober noch der Reformationstag am Samstag, 31. Oktober, in neun Ländern, Allerheiligen am Sonntag, 1. November, in fünf Ländern, der Buß- und Bettag am Mittwoch, 18. November, nur in Sachsen, und bundesweit der erste und zweite Weihnachtstag am Freitag, 25., und Samstag, 26. Dezember.' },
        { q: 'Ist der Buß- und Bettag 2026 ein Feiertag?', a: 'Nur in Sachsen. Dort ist der Mittwoch, 18. November 2026, gesetzlicher Feiertag. In allen anderen Ländern ist er seit 1995 ein normaler Arbeitstag; er wurde damals zur Finanzierung der Pflegeversicherung gestrichen. Beschäftigte in Sachsen zahlen dafür einen höheren Anteil am Pflegebeitrag.' },
        { q: 'Wie viele Urlaubstage brauche ich zwischen Weihnachten und Neujahr 2026?', a: 'Vier, vom Montag, 28., bis Donnerstag, 31. Dezember. Weil der erste Weihnachtstag 2026 ein Freitag und Neujahr 2027 ein Freitag ist, sind Sie damit vom 25. Dezember bis zum 3. Januar zehn Tage frei. Ist Heiligabend ein Arbeitstag, beginnt der Urlaub erst am 25.; ist Silvester frei, reichen drei Urlaubstage.' },
      ],
      body: (h) => `<h2>Alle Feiertage 2026</h2>
${tabelleJahr(h, 2026)}
<h2>Rückblick: ein gutes Jahr für Brücken</h2>
<p>2026 war für Arbeitnehmer großzügiger als das kommende Jahr. Neujahr fiel auf einen Donnerstag, der Freitag danach war ein Brückentag. In Baden-Württemberg, Bayern und Sachsen-Anhalt kam Heilige Drei Könige am Dienstag dazu, mit dem Montag davor als zweitem Brückentag. Der 1. Mai war ein Freitag, Himmelfahrt am 14. Mai und Fronleichnam am 4. Juni fielen auf Donnerstage. Der Herbst war dagegen schwach: Der 3. Oktober war ein Samstag, Reformationstag und Allerheiligen fielen aufs Wochenende.</p>
<p>Für die letzten Wochen des Jahres lohnt nur noch Weihnachten. Wie Sie die freien Tage um den Jahreswechsel am besten legen, zeigen die ${h.a('brueckentage-2026', 'Brückentage 2026')}; für das nächste Jahr die ${h.a('feiertage-2027', 'Feiertage 2027')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2026, urlaub: 4 }, c: 'Restliche Urlaubstage 2026 verplanen' })}
<h2>Feiertage und Arbeitstage 2026 je Land</h2>
${tabelleLaender(h, 2026)}
<p>Der Buß- und Bettag ist der Grund, warum Sachsen 2026 einen Arbeitstag weniger hat als Länder mit gleich vielen Feiertagen im Sommer. Seine Geschichte und die Regeln stehen unter ${h.a('feiertage-sachsen', 'Feiertage Sachsen')}.</p>`,
    },
    en: {
      slug: 'public-holidays-2026', nav: 'Public holidays 2026', card: 'The 2026 holidays and what is still to come this year',
      title: 'Public holidays Germany 2026: dates left until New Year',
      description: 'Public holidays 2026 for all 16 German states with date and weekday: Reformation Day, All Saints, Day of Repentance, Christmas, and a look back at the year.',
      h1: 'Public holidays in Germany 2026: the last dates of the year',
      intro: 'Pick a state: the list shows every 2026 public holiday with its weekday. Only a few remain before the end of the year, most of them on a weekend.',
      resume: `By the end of October only a few of 2026's public holidays remain, and they fall badly. Reformation Day on ${d('2026-10-31', 'en')} is a Saturday and All Saints' Day on 1 November a Sunday. In Saxony the Day of Repentance and Prayer follows on Wednesday ${d('2026-11-18', 'en')}, the only November holiday on a weekday. Christmas then brings a long weekend: Christmas Day is a Friday and Boxing Day a Saturday. Christmas Eve and New Year's Eve, both Thursdays, are ordinary working days by law. If you want the days between Christmas and New Year off, four leave days from 28 to 31 December give you ten days in a row, from Christmas Day to Sunday 3 January 2027, or eleven if your employer gives Christmas Eve off. Overall 2026 had ten to thirteen public holidays depending on the state, fourteen in Augsburg; New Year's Day on a Thursday and 1 May on a Friday made the start of the year especially generous.`,
      faqs: [
        { q: 'Which German public holidays are still to come in 2026?', a: 'After the end of October: Reformation Day on Saturday 31 October in nine states, All Saints\' Day on Sunday 1 November in five states, the Day of Repentance and Prayer on Wednesday 18 November in Saxony only, and nationwide Christmas Day and Boxing Day on Friday 25 and Saturday 26 December.' },
        { q: 'Is the Day of Repentance and Prayer 2026 a public holiday?', a: 'Only in Saxony, where Wednesday 18 November 2026 is a statutory holiday. Everywhere else it has been an ordinary working day since 1995, when it was dropped to help fund long-term care insurance. In return, employees in Saxony pay a larger share of the care insurance contribution.' },
        { q: 'How many leave days do I need between Christmas and New Year 2026?', a: 'Four, from Monday 28 to Thursday 31 December. As Christmas Day 2026 is a Friday and New Year\'s Day 2027 also a Friday, that gives you ten days off from 25 December to 3 January. If Christmas Eve is a working day your break starts on the 25th; if New Year\'s Eve is off, three leave days are enough.' },
      ],
      body: (h) => `<h2>All public holidays in 2026</h2>
${tabelleJahr(h, 2026)}
<h2>Looking back: a good year for bridges</h2>
<p>2026 was more generous to employees than the year ahead. New Year's Day fell on a Thursday, making the Friday a bridge day. Baden-Württemberg, Bavaria and Saxony-Anhalt added Epiphany on a Tuesday, with the Monday before as a second bridge day. 1 May was a Friday, and Ascension Day on 14 May and Corpus Christi on 4 June fell on Thursdays. The autumn was weak: 3 October was a Saturday, and Reformation Day and All Saints' Day fell on the weekend.</p>
<p>For the last weeks of the year only Christmas is worth planning. How best to place your days off around New Year is on ${h.a('brueckentage-2026', 'bridge days 2026')}; for next year see ${h.a('feiertage-2027', 'public holidays 2027')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2026, urlaub: 4 }, c: 'Plan your remaining 2026 leave' })}
<h2>Holidays and working days in 2026 by state</h2>
${tabelleLaender(h, 2026)}
<p>The Day of Repentance and Prayer is why Saxony has one working day fewer in 2026 than states with the same number of summer holidays. Its history and rules are on ${h.a('feiertage-sachsen', 'public holidays in Saxony')}.</p>`,
    },
  }),
  defineGuide({
    id: 'feiertage-2028', group: 'feiertage', order: 21, tool: 'ft', toolArg: { jahr: 2028 },
    countdown: { date: '2028-01-01', label: { de: 'Neujahr 2028', en: "New Year's Day 2028" } },
    related: ['brueckentage-2028', 'kalender-2028', 'feiertage-2027', 'feiertage-berlin'],
    sources: SRC,
    de: {
      slug: 'feiertage-2028', nav: 'Feiertage 2028', card: 'Feiertage 2028 mit dem einmaligen Berliner Feiertag',
      title: 'Feiertage 2028: alle Termine, mit Berlins Extra-Feiertag',
      description: 'Feiertage 2028 für alle 16 Bundesländer mit Datum und Wochentag: fast alle festen Feiertage auf Werktagen, dazu der einmalige Berliner Feiertag am 17. Juni.',
      h1: 'Feiertage 2028: ein Jahr mit Feiertagen unter der Woche',
      intro: 'Bundesland wählen: Die Liste zeigt jeden Feiertag 2028 mit Wochentag. 2028 fallen fast alle festen Feiertage auf Montag bis Freitag.',
      resume: `2028 ist das Gegenstück zu 2027. Es ist ein Schaltjahr, Ostersonntag fällt auf den ${d('2028-04-16', 'de')}, und fast alle festen Feiertage liegen unter der Woche: der 1. Mai auf einem Montag, der Tag der Deutschen Einheit und der Reformationstag auf Dienstagen, Allerheiligen auf einem Mittwoch, die beiden Weihnachtstage auf Montag und Dienstag. Nur Neujahr ist ein Samstag. In Bayern und im Saarland fällt Mariä Himmelfahrt auf Dienstag, 15. August, in Augsburg das Friedensfest auf Dienstag, 8. August. Berlin hat 2028 einen zusätzlichen, einmaligen Feiertag am 17. Juni zum 75. Jahrestag des Volksaufstands von 1953; er fällt allerdings auf einen Samstag. Die Folge: In Nordrhein-Westfalen fallen ${nwWk(2028)} Feiertage auf einen Werktag, so viele wie seit Jahren nicht, und es bleiben ${K.arbeitstage(2028, 'NW', 'std').reduce((a, b) => a + b, 0)} Arbeitstage. Wer seinen Urlaub für 2028 früh plant, findet zahlreiche Brückentage, vor allem im Oktober und rund um Weihnachten.`,
      faqs: [
        { q: 'Welche Feiertage fallen 2028 auf einen Werktag?', a: 'Fast alle. Bundesweit liegen Karfreitag, Ostermontag, der 1. Mai, Christi Himmelfahrt, Pfingstmontag, der 3. Oktober und beide Weihnachtstage auf Montag bis Freitag; nur Neujahr ist ein Samstag. Dazu kommen je nach Land Heilige Drei Könige am Donnerstag, Fronleichnam am Donnerstag, der Reformationstag am Dienstag und Allerheiligen am Mittwoch.' },
        { q: 'Was ist der Berliner Feiertag am 17. Juni 2028?', a: 'Ein einmaliger gesetzlicher Feiertag nur in Berlin, zum 75. Jahrestag des Volksaufstands in der DDR vom 17. Juni 1953. Das Berliner Feiertagsgesetz nennt ihn ausdrücklich. Der Tag fällt auf einen Samstag, bringt also den meisten Beschäftigten keinen zusätzlichen freien Tag; für Samstagsarbeit gilt er aber als Feiertag.' },
        { q: 'Ist 2028 ein Schaltjahr?', a: 'Ja, 2028 hat 366 Tage mit dem 29. Februar, einem Dienstag. Das ändert an den Feiertagen nichts, verschiebt aber die Wochentage: Alle Termine ab März fallen zwei Wochentage später als im Vorjahr. Deshalb rutschen der 3. Oktober und die Weihnachtstage 2028 vom Wochenende auf Werktage.' },
      ],
      body: (h) => `<h2>Alle Feiertage 2028</h2>
${tabelleJahr(h, 2028)}
<h2>Warum 2028 so viele Brücken hat</h2>
<p>Feste Feiertage wandern jedes Jahr um einen Wochentag weiter, in Schaltjahren ab März um zwei. Von 2027 auf 2028 springen der 3. Oktober, der 31. Oktober und Weihnachten deshalb vom Sonntag oder Samstag auf Dienstag und Montag. Ein Feiertag am Dienstag ist für Brücken ideal: Der Montag davor reicht für vier freie Tage. So entstehen 2028 echte Brückentage am Montag, 2. Oktober, und in den Ländern mit Reformationstag am Montag, 30. Oktober.</p>
<p>Die beweglichen Feiertage liegen 2028 spät: Ostern Mitte April, Himmelfahrt am 25. Mai, Pfingstmontag am 5. Juni, Fronleichnam am 15. Juni. Der Freitag nach Himmelfahrt und der Freitag nach Fronleichnam bleiben Brückentage. Alle Brücken mit Ertrag zeigen die ${h.a('brueckentage-2028', 'Brückentage 2028')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2028 }, c: 'Brücken 2028 vollständig planen' })}
<h2>Feiertage und Arbeitstage 2028 je Land</h2>
${tabelleLaender(h, 2028)}
<p>Berlin hat 2028 rechnerisch einen Feiertag mehr, an der Zahl der Arbeitstage ändert der Samstag aber nichts. Alles zu Berlin unter ${h.a('feiertage-berlin', 'Feiertage Berlin')}; den Jahreskalender mit Kalenderwochen unter ${h.a('kalender-2028', 'Kalender 2028')}.</p>`,
    },
    en: {
      slug: 'public-holidays-2028', nav: 'Public holidays 2028', card: "The 2028 holidays, with Berlin's one-off extra day",
      title: "Public holidays Germany 2028: all dates, Berlin's extra day",
      description: 'Public holidays 2028 for all 16 German states with date and weekday: nearly every fixed holiday on a weekday, plus Berlin’s one-off holiday on 17 June 2028.',
      h1: 'Public holidays in Germany 2028: a year of midweek holidays',
      intro: 'Pick a state: the list shows every 2028 public holiday with its weekday. In 2028 almost every fixed holiday falls between Monday and Friday.',
      resume: `2028 is the mirror image of 2027. It is a leap year, Easter Sunday falls on ${d('2028-04-16', 'en')}, and almost every fixed holiday lands midweek: 1 May on a Monday, German Unity Day and Reformation Day on Tuesdays, All Saints' Day on a Wednesday, and Christmas Day and Boxing Day on Monday and Tuesday. Only New Year's Day is a Saturday. In Bavaria and Saarland, Assumption Day falls on Tuesday 15 August, and in Augsburg the Peace Festival on Tuesday 8 August. Berlin has an extra, one-off public holiday on 17 June 2028 for the 75th anniversary of the 1953 uprising, though it falls on a Saturday. The result: ${nwWk(2028)} holidays fall on a weekday in North Rhine-Westphalia, more than in years, leaving ${K.arbeitstage(2028, 'NW', 'std').reduce((a, b) => a + b, 0)} working days. If you plan your 2028 leave early you will find plenty of bridge days, especially in October and around Christmas.`,
      faqs: [
        { q: 'Which German public holidays fall on a weekday in 2028?', a: 'Almost all of them. Nationwide, Good Friday, Easter Monday, 1 May, Ascension Day, Whit Monday, 3 October and both Christmas holidays fall between Monday and Friday; only New Year\'s Day is a Saturday. Depending on the state, Epiphany on a Thursday, Corpus Christi on a Thursday, Reformation Day on a Tuesday and All Saints\' Day on a Wednesday are added.' },
        { q: 'What is the Berlin public holiday on 17 June 2028?', a: 'A one-off statutory holiday in Berlin only, for the 75th anniversary of the uprising in East Germany on 17 June 1953. Berlin\'s holiday act names it explicitly. It falls on a Saturday, so most employees get no extra day off, but it counts as a public holiday for anyone working that Saturday.' },
        { q: 'Is 2028 a leap year?', a: 'Yes, 2028 has 366 days including Tuesday 29 February. That does not change the holidays themselves but shifts the weekdays: every date from March onwards falls two weekdays later than the year before. That is why 3 October and Christmas move from the weekend in 2027 to weekdays in 2028.' },
      ],
      body: (h) => `<h2>All public holidays in 2028</h2>
${tabelleJahr(h, 2028)}
<h2>Why 2028 has so many bridges</h2>
<p>Fixed holidays move on by one weekday each year, and by two from March in a leap year. From 2027 to 2028, 3 October, 31 October and Christmas therefore jump from Sunday or Saturday to Tuesday and Monday. A Tuesday holiday is ideal for bridging: the Monday before is enough for four days off. That creates true bridge days on Monday 2 October 2028 and, in states with Reformation Day, on Monday 30 October.</p>
<p>The movable holidays are late in 2028: Easter in mid-April, Ascension Day on 25 May, Whit Monday on 5 June, Corpus Christi on 15 June. The Friday after Ascension Day and the Friday after Corpus Christi remain bridge days. Every bridge with its value is on ${h.a('brueckentage-2028', 'bridge days 2028')}.</p>
${h.mini('bt', { p: ['land', 'urlaub'], d: { jahr: 2028 }, c: 'Plan all your 2028 bridges' })}
<h2>Holidays and working days in 2028 by state</h2>
${tabelleLaender(h, 2028)}
<p>On paper Berlin has one more holiday in 2028, but a Saturday does not change its number of working days. Everything about Berlin is on ${h.a('feiertage-berlin', 'public holidays in Berlin')}; the year calendar with week numbers is on ${h.a('kalender-2028', 'calendar 2028')}.</p>`,
    },
  }),
];
