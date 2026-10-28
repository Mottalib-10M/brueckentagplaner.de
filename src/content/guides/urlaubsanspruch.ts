/** Urlaubsanspruch : congé minimal légal (BUrlG §§ 3–5, 7) et ce qu'il rapporte en ponts. Chiffres : params + moteur. */
import { defineGuide } from '../../lib/page-types';
import { KIT as K } from '../../lib/kit';

const U = K.P.urlaub;
const tage = (w: number) => (U.mindestWerktage * w) / U.tageBasis;
const frei20 = K.optimiere(2027, 'NW', 'std', tage(5)).frei;
const frei20_28 = K.optimiere(2028, 'NW', 'std', tage(5)).frei;

export default defineGuide({
  id: 'urlaubsanspruch', group: 'werkzeuge', order: 7, tool: 'ua', toolArg: { jahr: 2027 },
  related: ['home', 'arbeitstage-2027', 'brueckentage-2028', 'brueckentage-2026'],
  sources: ['burlg3', 'burlg4', 'burlg5', 'burlg7'],
  de: {
    slug: 'urlaubsanspruch', nav: 'Urlaubsanspruch', card: 'Gesetzlicher Mindesturlaub, auch bei Teilzeit',
    title: 'Urlaubsanspruch 2027: Mindesturlaub bei 5, 4 oder 3 Tagen',
    description: 'Urlaubsanspruch 2027 nach dem Bundesurlaubsgesetz: 20 Tage bei fünf Arbeitstagen pro Woche, anteilig bei Teilzeit und im ersten Jahr, und was er bringt.',
    h1: 'Urlaubsanspruch: wie viele Urlaubstage Ihnen zustehen',
    intro: 'Arbeitstage pro Woche und Monate im Betrieb wählen: Der Rechner zeigt Ihren gesetzlichen Mindesturlaub und wie viele freie Tage er an Brücken bringt.',
    resume: `Der gesetzliche Mindesturlaub beträgt nach § 3 des Bundesurlaubsgesetzes ${U.mindestWerktage} Werktage im Jahr. Das Gesetz zählt dabei alle Tage außer Sonn- und Feiertagen als Werktage, also sechs pro Woche. Bei der üblichen Fünftagewoche ergibt die Umrechnung ${tage(5)} Arbeitstage, also vier volle Wochen. Wer an vier Tagen pro Woche arbeitet, hat Anspruch auf ${tage(4)} Tage, bei drei Tagen auf ${tage(3)}; frei sind in jedem Fall vier Wochen. Den vollen Anspruch erwirbt man erst nach sechs Monaten im Betrieb (§ 4). Wer im Lauf des Jahres anfängt oder ausscheidet, bekommt nach § 5 ein Zwölftel für jeden vollen Monat; Bruchteile von mindestens einem halben Tag werden aufgerundet. Viele Arbeits- und Tarifverträge sehen mehr vor, häufig 25 bis 30 Tage. Schwerbehinderte Menschen haben fünf Arbeitstage Zusatzurlaub, Jugendliche nach dem Jugendarbeitsschutzgesetz mehr. Mit den ${tage(5)} Tagen des Mindesturlaubs kommen Sie 2027 in Nordrhein-Westfalen auf bis zu ${frei20} freie Tage, 2028 auf ${frei20_28}.`,
    faqs: [
      { q: 'Wie viele Urlaubstage stehen mir bei einer Fünftagewoche zu?', a: `Mindestens ${tage(5)} Arbeitstage im Jahr. Das Gesetz nennt ${U.mindestWerktage} Werktage bei sechs Werktagen pro Woche; umgerechnet auf fünf Arbeitstage sind es ${tage(5)}. Ihr Arbeitsvertrag oder ein Tarifvertrag kann mehr vorsehen, aber nicht weniger. Der Rechner oben rechnet den Wert für Ihre Arbeitswoche aus und zeigt, wie viele freie Tage er an Brücken bringt.` },
      { q: 'Wie berechnet sich Urlaub bei Teilzeit?', a: `Gesetzlicher Urlaub mal Arbeitstage pro Woche, geteilt durch sechs Werktage. Bei vier Tagen sind das ${tage(4)}, bei drei Tagen ${tage(3)}, bei zwei Tagen ${tage(2)} Urlaubstage. Freie Zeit am Stück ist immer gleich: vier Wochen. Wer an wechselnden Tagen arbeitet, rechnet mit dem Jahresdurchschnitt.` },
      { q: 'Wie viel Urlaub habe ich im Jahr des Eintritts?', a: 'Vor Ablauf der sechsmonatigen Wartezeit entsteht Teilurlaub: ein Zwölftel des Jahresurlaubs für jeden vollen Monat. Wer am 1. Juli anfängt, hat nach dem Gesetz Anspruch auf sechs Zwölftel. Bruchteile ab einem halben Tag werden auf einen ganzen Tag aufgerundet, kleinere Bruchteile bleiben stehen.' },
      { q: 'Zählen Feiertage als Urlaubstage?', a: 'Nein. Ein gesetzlicher Feiertag, der in den Urlaub fällt, wird nicht vom Urlaubskonto abgezogen. Deshalb sind Brückentage so ergiebig: Der Feiertag ist ohnehin frei, und wenige Urlaubstage verbinden ihn mit dem Wochenende. Dasselbe gilt für Krankheitstage mit ärztlichem Attest während des Urlaubs.' },
    ],
    body: (h) => `<h2>Mindesturlaub nach Arbeitswoche</h2>
<p>Die Tabelle rechnet den gesetzlichen Mindesturlaub auf die üblichen Arbeitswochen um. Grundlage ist ${h.src('burlg3', '§ 3 des Bundesurlaubsgesetzes')}: ${U.mindestWerktage} Werktage bei sechs Werktagen pro Woche.</p>
${h.table(['Arbeitstage pro Woche', 'Mindesturlaub (Tage)', 'Wochen frei'], [6, 5, 4, 3, 2, 1].map((w) => [w, h.n(tage(w), 0), 4]), 'Gesetzlicher Mindesturlaub nach Arbeitstagen pro Woche', ['r', 'r', 'r'])}
<h2>Teilurlaub, Übertragung und Verfall</h2>
<p>Den vollen Urlaub erwerben Beschäftigte nach ${h.src('burlg4', 'sechs Monaten Wartezeit')}. Bis dahin, und wenn das Arbeitsverhältnis in der ersten Jahreshälfte endet, gilt ${h.src('burlg5', 'Teilurlaub')} von einem Zwölftel je vollem Monat. Wer in der zweiten Jahreshälfte nach erfüllter Wartezeit ausscheidet, behält den vollen gesetzlichen Jahresurlaub.</p>
<p>Urlaub muss nach ${h.src('burlg7', '§ 7')} grundsätzlich im laufenden Jahr genommen werden. Eine Übertragung bis zum 31. März des Folgejahres ist bei dringenden betrieblichen oder persönlichen Gründen möglich. Verfallen kann Urlaub nach der Rechtsprechung aber nur, wenn der Arbeitgeber rechtzeitig und klar darauf hingewiesen hat. Kann der Urlaub wegen des Endes des Arbeitsverhältnisses nicht mehr genommen werden, wird er ausbezahlt.</p>
<h2>Was der Mindesturlaub an Brücken bringt</h2>
<p>Mit ${tage(5)} Urlaubstagen, klug auf Brücken verteilt, kommen Sie 2027 in Nordrhein-Westfalen auf ${frei20} freie Tage am Stück, 2028 auf ${frei20_28}. Der Rechner oben zeigt den Wert für Ihr Land. Die genaue Verteilung mit allen Daten liefert der ${h.a('home', 'Brückentage-Optimierer')}; für 2028 lohnt es sich besonders, früh zu planen, siehe ${h.a('brueckentage-2028', 'Brückentage 2028')}.</p>
${h.mini('ua', { p: ['woche', 'monate'], c: 'Ihren Urlaubsanspruch berechnen' })}`,
  },
  en: {
    slug: 'leave-entitlement', nav: 'Leave entitlement', card: 'Statutory minimum leave, part-time too',
    title: 'Leave entitlement Germany 2027: minimum annual leave',
    description: 'German statutory annual leave in 2027 under the Federal Leave Act: 20 days on a five-day week, pro rata for part-time and the year you join, and what it buys.',
    h1: 'Leave entitlement in Germany: how many days you get',
    intro: 'Pick your working days per week and months employed: the calculator shows your statutory minimum leave and how many days off it buys on bridges.',
    resume: `Under section 3 of the Federal Leave Act the statutory minimum is ${U.mindestWerktage} working days a year. The act counts every day except Sundays and public holidays as a working day, so six a week. On the usual five-day week that converts to ${tage(5)} days, four full weeks. Working four days a week gives ${tage(4)} days, three days a week ${tage(3)}; in every case you get four weeks off. The full entitlement is only earned after six months with the employer (section 4). If you join or leave during the year, section 5 gives one twelfth for each full month; fractions of at least half a day are rounded up. Many contracts and collective agreements give more, often 25 to 30 days. People with a severe disability get five extra working days, and young workers more under the Youth Employment Protection Act. With the ${tage(5)} minimum days you can reach up to ${frei20} days off in North Rhine-Westphalia in 2027, and ${frei20_28} in 2028.`,
    faqs: [
      { q: 'How many days of leave do I get on a five-day week in Germany?', a: `At least ${tage(5)} working days a year. The act sets ${U.mindestWerktage} working days on a six-day week; converted to five days that is ${tage(5)}. Your contract or a collective agreement can give more, but never less. The calculator above works it out for your working week.` },
      { q: 'How is leave calculated for part-time work?', a: `Statutory leave times your working days per week, divided by six. Four days a week gives ${tage(4)} days, three days ${tage(3)}, two days ${tage(2)}. The time off in a row is always the same: four weeks. If your working days vary, use the annual average.` },
      { q: 'How much leave do I get in the year I start a job?', a: 'Before the six-month waiting period is over, partial leave applies: one twelfth of the annual leave for each full month. Starting on 1 July gives six twelfths under the act. Fractions of half a day or more are rounded up to a full day; smaller fractions stay as they are.' },
      { q: 'Do public holidays count as leave days?', a: 'No. A statutory holiday that falls during your leave is not deducted from your allowance. That is why bridge days pay off so well: the holiday is off anyway, and a few leave days join it to the weekend. The same applies to sick days with a doctor\'s certificate during leave.' },
    ],
    body: (h) => `<h2>Minimum leave by working week</h2>
<p>The table converts the statutory minimum to the usual working weeks. It is based on ${h.src('burlg3', 'section 3 of the Federal Leave Act')}: ${U.mindestWerktage} working days on a six-day week.</p>
${h.table(['Working days per week', 'Minimum leave (days)', 'Weeks off'], [6, 5, 4, 3, 2, 1].map((w) => [w, h.n(tage(w), 0), 4]), 'Statutory minimum leave by working days per week', ['r', 'r', 'r'])}
<h2>Partial leave, carry-over and lapse</h2>
<p>Employees earn their full leave after a ${h.src('burlg4', 'six-month waiting period')}. Until then, and if employment ends in the first half of the year, ${h.src('burlg5', 'partial leave')} of one twelfth per full month applies. Anyone who leaves in the second half of the year after the waiting period keeps the full statutory annual leave.</p>
<p>Under ${h.src('burlg7', 'section 7')} leave must in principle be taken in the current year. It can be carried over until 31 March of the next year for pressing operational or personal reasons. According to the case law, though, leave can only lapse if the employer gave clear and timely notice. If leave can no longer be taken because employment ends, it is paid out.</p>
<h2>What the minimum buys in bridges</h2>
<p>Spread wisely over bridges, ${tage(5)} leave days give ${frei20} consecutive days off in North Rhine-Westphalia in 2027, and ${frei20_28} in 2028. The calculator above shows the figure for your state. The exact plan with every date comes from the ${h.a('home', 'bridge-day planner')}; for 2028 it pays to plan especially early, see ${h.a('brueckentage-2028', 'bridge days 2028')}.</p>
${h.mini('ua', { p: ['woche', 'monate'], c: 'Work out your leave entitlement' })}`,
  },
});
