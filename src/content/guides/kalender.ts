/** Kalender 2027 et 2028 : calendrier annuel avec semaines ISO et jours fériés du Land choisi. Chiffres : moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';
import { LAENDER, ORT_STANDARD } from '../../lib/engine/feiertage';

const span = (y: number) => { const v = LAENDER.map((l) => K.arbeitstage(y, l, ORT_STANDARD(l)).reduce((a, b) => a + b, 0)); return [Math.min(...v), Math.max(...v)]; };
const [min27, max27] = span(2027), [min28, max28] = span(2028);
const kw = (iso: string) => K.isoWeek(iso).week;

export default [
  defineGuide({
    id: 'kalender-2027', group: 'werkzeuge', order: 5, tool: 'kalender', toolArg: { jahr: 2027 },
    related: ['feiertage-2027', 'arbeitstage-2027', 'home', 'kalender-2028'],
    sources: ['einigungsvertrag', 'ftg-nw', 'ftg-by'],
    de: {
      slug: 'kalender-2027', nav: 'Kalender 2027', card: 'Jahreskalender mit Kalenderwochen und Feiertagen',
      title: 'Kalender 2027 mit Feiertagen und Kalenderwochen, je Land',
      description: 'Kalender 2027 mit allen Kalenderwochen nach ISO 8601 und den Feiertagen Ihres Bundeslands: zwölf Monate auf einer Seite, mit der Zahl der Arbeitstage im Jahr.',
      h1: 'Kalender 2027 mit Kalenderwochen und Feiertagen',
      intro: 'Bundesland wählen: Der Kalender markiert die Feiertage 2027 Ihres Landes, zeigt die Kalenderwoche jeder Zeile und zählt die Arbeitstage.',
      resume: `Das Jahr 2027 beginnt an einem Freitag und endet an einem Freitag; es hat 365 Tage und ${K.weeksInYear(2027)} Kalenderwochen. Die erste Kalenderwoche beginnt am Montag, 4. Januar 2027, denn nach der Norm ISO 8601 ist KW 1 die Woche mit dem ersten Donnerstag des Jahres. Der 1. bis 3. Januar 2027 gehören deshalb noch zur KW ${kw('2027-01-01')} des Jahres 2026. Von Montag bis Freitag zählt das Jahr ${K.werktageMoFr(2027)} Tage; nach Abzug der Feiertage bleiben je nach Land ${min27} bis ${max27} Arbeitstage. Ostersonntag fällt auf den 28. März, am selben Tag beginnt die Sommerzeit. Christi Himmelfahrt liegt in KW ${kw('2027-05-06')}, Pfingstmontag in KW ${kw('2027-05-17')}, Fronleichnam in KW ${kw('2027-05-27')}. Ungewöhnlich viele Feiertage fallen 2027 auf ein Wochenende: der 1. Mai, der 3. Oktober, der Reformationstag und beide Weihnachtstage. Der Kalender oben zeigt sie farbig, damit Sie Urlaub und Termine auf einen Blick planen können.`,
      faqs: [
        { q: 'Wie viele Kalenderwochen hat 2027?', a: `${K.weeksInYear(2027)}. Die KW 1 beginnt am Montag, 4. Januar 2027, die KW ${K.weeksInYear(2027)} endet am Sonntag, 2. Januar 2028. Ein Jahr hat nur dann 53 Kalenderwochen, wenn es an einem Donnerstag beginnt oder ein Schaltjahr an einem Mittwoch beginnt; das war 2026 der Fall.` },
        { q: 'In welcher Kalenderwoche ist Ostern 2027?', a: `Karfreitag, 26. März, und Ostersonntag, 28. März, liegen in KW ${kw('2027-03-28')}; Ostermontag, 29. März, eröffnet KW ${kw('2027-03-29')}. Wer die Woche nach Ostern frei nimmt, braucht dafür vier Urlaubstage. Am selben Wochenende beginnt auch die Sommerzeit, in der Nacht auf Ostersonntag werden die Uhren vorgestellt.` },
        { q: 'Kann ich den Kalender 2027 ausdrucken?', a: 'Ja. Die Druckfunktion Ihres Browsers gibt die zwölf Monate mit den Feiertagen des gewählten Landes aus. Die Auswahl steht danach in der Adresszeile, sodass Sie denselben Kalender später wieder öffnen oder als Link weitergeben können. Gespeichert oder übertragen wird dabei nichts, alles bleibt in Ihrem Browser.' },
      ],
      body: (h) => `<h2>Was 2027 im Kalender auffällt</h2>
<p>Der Jahreswechsel liegt günstig: Neujahr ist ein Freitag, und in Baden-Württemberg, Bayern und Sachsen-Anhalt folgt am Mittwoch, 6. Januar, Heilige Drei Könige. Danach kommen bis Ostern keine bundesweiten Feiertage. In Berlin und Mecklenburg-Vorpommern fällt der Frauentag am 8. März auf einen Montag.</p>
<p>Ostern ist früh: Ostersonntag am 28. März ist einer der frühesten Termine des Jahrzehnts. Damit rücken auch Christi Himmelfahrt am 6. Mai, Pfingsten am 16. und 17. Mai und Fronleichnam am 27. Mai zusammen. In diesen vier Wochen liegen die beiden echten Brückentage des Jahres.</p>
<p>Die zweite Jahreshälfte ist arm an Feiertagen. Mariä Himmelfahrt, der Tag der Deutschen Einheit und der Reformationstag fallen auf Sonntage, Weihnachten auf Samstag und Sonntag. Arbeitstage gibt es deshalb viele: Für die Planung nach Monaten gibt es die ${h.a('arbeitstage-2027', 'Arbeitstage 2027')}, alle Feiertage nach Ländern stehen unter ${h.a('feiertage-2027', 'Feiertage 2027')}.</p>
<h2>Kalenderwochen nach ISO 8601</h2>
<p>In Deutschland gilt für Kalenderwochen die Norm DIN ISO 8601. Die Woche beginnt am Montag, und die erste Woche des Jahres ist die, die den ersten Donnerstag enthält. Dadurch können die ersten Januartage zur letzten Woche des Vorjahres gehören, wie 2027. In den USA und in manchen Kalenderprogrammen beginnt die Woche dagegen am Sonntag, und die Zählung weicht um eine Woche ab.</p>
${h.mini('kw', { p: ['kw'], d: { jahr: 2027, kw: 20 }, c: 'Kalenderwoche 2027 nachschlagen' })}`,
    },
    en: {
      slug: 'calendar-2027', nav: 'Calendar 2027', card: 'Year calendar with week numbers and holidays',
      title: 'Calendar 2027 Germany with holidays and week numbers',
      description: 'German calendar 2027 with every ISO 8601 week number and the public holidays of your state: twelve months on one page, with the year\'s working days in total.',
      h1: 'Calendar 2027 with week numbers and holidays',
      intro: "Pick a state: the calendar marks that state's 2027 public holidays, shows the week number on each row and counts the working days.",
      resume: `2027 starts on a Friday and ends on a Friday; it has 365 days and ${K.weeksInYear(2027)} ISO weeks. Week 1 begins on Monday 4 January 2027, because under ISO 8601 week 1 is the week containing the year's first Thursday. 1 to 3 January 2027 therefore still belong to week ${kw('2027-01-01')} of 2026. Monday to Friday, the year has ${K.werktageMoFr(2027)} days; after public holidays, ${min27} to ${max27} working days remain depending on the state. Easter Sunday falls on 28 March, the same day summer time begins. Ascension Day is in week ${kw('2027-05-06')}, Whit Monday in week ${kw('2027-05-17')}, Corpus Christi in week ${kw('2027-05-27')}. An unusual number of holidays land on a weekend in 2027: 1 May, 3 October, Reformation Day and both Christmas holidays. The calendar above highlights them so you can plan leave and appointments at a glance.`,
      faqs: [
        { q: 'How many weeks does 2027 have?', a: `${K.weeksInYear(2027)} ISO weeks. Week 1 begins on Monday 4 January 2027 and week ${K.weeksInYear(2027)} ends on Sunday 2 January 2028. A year only has 53 weeks if it starts on a Thursday, or is a leap year starting on a Wednesday; that was the case in 2026.` },
        { q: 'Which week number is Easter 2027?', a: `Good Friday, 26 March, and Easter Sunday, 28 March, are in week ${kw('2027-03-28')}; Easter Monday, 29 March, opens week ${kw('2027-03-29')}. Taking the week after Easter off costs four leave days. Summer time begins the same weekend, in the night before Easter Sunday.` },
        { q: 'Can I print the 2027 calendar?', a: "Yes. Your browser's print function outputs the twelve months with the holidays of the chosen state. Your choice is then stored in the address bar, so you can reopen the same calendar later or share it as a link. Nothing is stored or sent; everything stays in your browser." },
      ],
      body: (h) => `<h2>What stands out in the 2027 calendar</h2>
<p>The turn of the year is kind: New Year's Day is a Friday, and in Baden-Württemberg, Bavaria and Saxony-Anhalt Epiphany follows on Wednesday 6 January. After that there are no nationwide holidays until Easter. In Berlin and Mecklenburg-Western Pomerania, Women's Day on 8 March falls on a Monday.</p>
<p>Easter is early: Easter Sunday on 28 March is one of the earliest dates of the decade. Ascension Day on 6 May, Whitsun on 16 and 17 May and Corpus Christi on 27 May therefore close up. The year's two true bridge days fall in those four weeks.</p>
<p>The second half of the year is short of holidays. Assumption Day, German Unity Day and Reformation Day fall on Sundays, Christmas on Saturday and Sunday. That means plenty of working days: for month-by-month planning see ${h.a('arbeitstage-2027', 'working days 2027')}, and every holiday by state is on ${h.a('feiertage-2027', 'public holidays 2027')}.</p>
<h2>Week numbers under ISO 8601</h2>
<p>Germany numbers its weeks according to DIN ISO 8601. Weeks start on Monday, and the first week of the year is the one containing the first Thursday. So the first days of January can belong to the last week of the previous year, as in 2027. In the United States and some calendar apps weeks start on Sunday, and the count can differ by one.</p>
${h.mini('kw', { p: ['kw'], d: { jahr: 2027, kw: 20 }, c: 'Look up a 2027 week' })}`,
    },
  }),
  defineGuide({
    id: 'kalender-2028', group: 'werkzeuge', order: 6, tool: 'kalender', toolArg: { jahr: 2028 },
    related: ['feiertage-2028', 'brueckentage-2028', 'kalender-2027', 'home'],
    sources: ['einigungsvertrag', 'ftg-be', 'ftg-sl'],
    de: {
      slug: 'kalender-2028', nav: 'Kalender 2028', card: 'Schaltjahr mit 52 Kalenderwochen und vielen Brücken',
      title: 'Kalender 2028 mit Feiertagen, Kalenderwochen, Schalttag',
      description: 'Kalender 2028 mit Kalenderwochen nach ISO 8601, dem Schalttag am 29. Februar und den Feiertagen Ihres Landes: zwölf Monate auf einer Seite, mit Arbeitstagen.',
      h1: 'Kalender 2028 mit Kalenderwochen und Feiertagen',
      intro: 'Bundesland wählen: Der Kalender zeigt das Schaltjahr 2028 mit den Feiertagen Ihres Landes, den Kalenderwochen und der Zahl der Arbeitstage.',
      resume: `2028 ist ein Schaltjahr mit 366 Tagen; der Schalttag, Dienstag, 29. Februar, fällt in KW ${kw('2028-02-29')}. Das Jahr beginnt an einem Samstag und endet an einem Sonntag. Es hat ${K.weeksInYear(2028)} Kalenderwochen: Die KW 1 beginnt am Montag, 3. Januar 2028, der 1. und 2. Januar gehören noch zur letzten Woche von 2027. Von Montag bis Freitag zählt 2028 ${K.werktageMoFr(2028)} Tage, einen weniger als 2027. Weil aber fast alle Feiertage auf Werktage fallen, bleiben nur ${min28} bis ${max28} Arbeitstage, je nach Land. Ostern ist spät, Ostersonntag am 16. April; Christi Himmelfahrt fällt auf den 25. Mai, Pfingstmontag auf den 5. Juni, Fronleichnam auf den 15. Juni. Der Tag der Deutschen Einheit und der Reformationstag sind Dienstage, Weihnachten fällt auf Montag und Dienstag. In Berlin ist der 17. Juni 2028 einmalig Feiertag, allerdings an einem Samstag. Der Kalender oben markiert alle Feiertage des gewählten Landes.`,
      faqs: [
        { q: 'Hat der Februar 2028 einen 29. Tag?', a: 'Ja. 2028 ist durch vier teilbar und kein volles Jahrhundert, also ein Schaltjahr mit 366 Tagen. Der Schalttag ist Dienstag, 29. Februar 2028. Wer an einem 29. Februar Geburtstag hat, feiert 2028 wieder am eigenen Datum; das nächste Mal danach 2032.' },
        { q: 'An welchem Wochentag beginnt 2028?', a: 'Am Samstag. Neujahr 2028 bringt deshalb keinen freien Werktag. Das Jahr endet an einem Sonntag, und Neujahr 2029 fällt auf einen Montag, was den Jahreswechsel 2028/2029 für Brücken günstig macht. Der 1. Mai 2028 ist ein Montag, der Tag der Deutschen Einheit ein Dienstag.' },
        { q: 'Wie viele Arbeitstage hat 2028?', a: `Je nach Land ${min28} bis ${max28}. Die Spanne entsteht durch die landeseigenen Feiertage, die 2028 fast alle auf Werktage fallen. Am wenigsten Arbeitstage hat eine bayerische Gemeinde mit Mariä Himmelfahrt. Am meisten haben Berlin, Brandenburg, Hessen und die vier norddeutschen Länder mit je ${max28}.` },
      ],
      body: (h) => `<h2>Was 2028 im Kalender auffällt</h2>
<p>Für die Urlaubsplanung ist 2028 das Gegenstück zu 2027. Fast jeder Feiertag fällt auf einen Werktag, viele auf einen Dienstag oder Donnerstag. Daraus entstehen echte Brückentage: am Freitag nach Himmelfahrt, nach Fronleichnam und, in Baden-Württemberg, Bayern und Sachsen-Anhalt, nach Heilige Drei Könige; am Montag vor dem 3. Oktober und vor dem Reformationstag. Wie Sie Ihren Urlaub darauf verteilen, rechnen die ${h.a('brueckentage-2028', 'Brückentage 2028')} aus.</p>
<p>Ostern liegt 2028 knapp drei Wochen später als 2027. Dadurch rückt Pfingsten in den Juni und Fronleichnam auf den 15. Juni. Im Saarland und in vielen bayerischen Gemeinden ist Mariä Himmelfahrt am Dienstag, 15. August, frei; im Saarland gilt das landesweit.</p>
<p>Berlin hat 2028 einen zusätzlichen, einmaligen Feiertag: den 17. Juni zum 75. Jahrestag des Volksaufstands von 1953. Er fällt auf einen Samstag. Alle Feiertage nach Ländern zeigt die Übersicht ${h.a('feiertage-2028', 'Feiertage 2028')}.</p>
<h2>Schaltjahre im Gregorianischen Kalender</h2>
<p>Ein Jahr ist ein Schaltjahr, wenn es durch vier teilbar ist, außer volle Jahrhunderte, die zusätzlich durch 400 teilbar sein müssen. 2000 war deshalb ein Schaltjahr, 2100 wird keines sein. Der Schalttag verschiebt alle Wochentage ab März um einen Tag mehr als in einem gewöhnlichen Jahr.</p>
${h.mini('kw', { p: ['kw'], d: { jahr: 2028, kw: 9 }, c: 'Kalenderwoche 2028 nachschlagen' })}`,
    },
    en: {
      slug: 'calendar-2028', nav: 'Calendar 2028', card: 'Leap year with 52 weeks and many bridges',
      title: 'Calendar 2028 Germany: holidays, week numbers, leap day',
      description: 'German calendar 2028 with ISO 8601 week numbers, the leap day on 29 February and the public holidays of your state: twelve months on one page, working days too.',
      h1: 'Calendar 2028 with week numbers and holidays',
      intro: "Pick a state: the calendar shows the 2028 leap year with that state's public holidays, the week numbers and the number of working days.",
      resume: `2028 is a leap year with 366 days; the leap day, Tuesday 29 February, falls in week ${kw('2028-02-29')}. The year starts on a Saturday and ends on a Sunday. It has ${K.weeksInYear(2028)} ISO weeks: week 1 begins on Monday 3 January 2028, while 1 and 2 January still belong to the last week of 2027. Monday to Friday, 2028 counts ${K.werktageMoFr(2028)} days, one fewer than 2027. But because almost every holiday falls on a weekday, only ${min28} to ${max28} working days remain, depending on the state. Easter is late, with Easter Sunday on 16 April; Ascension Day falls on 25 May, Whit Monday on 5 June and Corpus Christi on 15 June. German Unity Day and Reformation Day are Tuesdays, and Christmas falls on Monday and Tuesday. In Berlin, 17 June 2028 is a one-off holiday, though on a Saturday. The calendar above marks every holiday of the chosen state.`,
      faqs: [
        { q: 'Does February 2028 have 29 days?', a: 'Yes. 2028 is divisible by four and not a full century, so it is a leap year with 366 days. The leap day is Tuesday 29 February 2028. Anyone born on 29 February gets their own date back in 2028, and next in 2032.' },
        { q: 'What day of the week does 2028 start on?', a: "Saturday. New Year's Day 2028 therefore gives no weekday off. The year ends on a Sunday, and New Year's Day 2029 falls on a Monday, which makes the turn of 2028 into 2029 good for bridges. 1 May 2028 is a Monday and German Unity Day a Tuesday." },
        { q: 'How many working days are there in Germany in 2028?', a: `Between ${min28} and ${max28} depending on the state. The range comes from each state's own holidays, which almost all fall on weekdays in 2028. A Bavarian municipality with Assumption Day has the fewest. Berlin, Brandenburg, Hesse and the four northern states have the most, ${max28} each.` },
      ],
      body: (h) => `<h2>What stands out in the 2028 calendar</h2>
<p>For leave planning 2028 is the counterpart of 2027. Almost every holiday falls on a weekday, many on a Tuesday or Thursday. That creates true bridge days: the Friday after Ascension Day, after Corpus Christi and, in Baden-Württemberg, Bavaria and Saxony-Anhalt, after Epiphany; the Monday before 3 October and before Reformation Day. The ${h.a('brueckentage-2028', 'bridge days 2028')} page works out how to spread your leave over them.</p>
<p>Easter falls almost three weeks later in 2028 than in 2027. Whitsun therefore moves into June and Corpus Christi to 15 June. In Saarland and many Bavarian municipalities Assumption Day on Tuesday 15 August is a day off; in Saarland statewide.</p>
<p>Berlin has an extra one-off holiday in 2028: 17 June, for the 75th anniversary of the 1953 uprising. It falls on a Saturday. Every holiday by state is in the overview ${h.a('feiertage-2028', 'public holidays 2028')}.</p>
<h2>Leap years in the Gregorian calendar</h2>
<p>A year is a leap year if it is divisible by four, except full centuries, which must also be divisible by 400. So 2000 was a leap year and 2100 will not be. The leap day shifts every weekday from March onwards by one more day than in an ordinary year.</p>
${h.mini('kw', { p: ['kw'], d: { jahr: 2028, kw: 9 }, c: 'Look up a 2028 week' })}`,
    },
  }),
];
