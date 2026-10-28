import { describe, it, expect } from 'vitest';
import { ostersonntag, ostersonntagMeeus, bussUndBettag, feiertage, LAENDER, nthWeekday, uebersicht } from '../src/lib/engine/feiertage';
import { optimiere, bruecken, arbeitstage, isoWeek, weeksInYear } from '../src/lib/engine/brueckentage';

describe('Ostern', () => {
  it('stimmt mit der Osterfesttabelle der PTB überein', () => {
    // PTB, Osterfesttabelle 1980–2031 (Auswahl)
    expect(ostersonntag(2024)).toBe('2024-03-31');
    expect(ostersonntag(2025)).toBe('2025-04-20');
    expect(ostersonntag(2026)).toBe('2026-04-05');
    expect(ostersonntag(2027)).toBe('2027-03-28');
    expect(ostersonntag(2028)).toBe('2028-04-16');
    expect(ostersonntag(2029)).toBe('2029-04-01');
    expect(ostersonntag(2030)).toBe('2030-04-21');
    expect(ostersonntag(1981)).toBe('1981-04-19');
    expect(ostersonntag(2019)).toBe('2019-04-21');
  });
  it('liefert für 1600 bis 2600 dasselbe wie der Algorithmus von Meeus', () => {
    for (let y = 1600; y <= 2600; y++) expect(ostersonntag(y)).toBe(ostersonntagMeeus(y));
  });
});
describe('Feste Regeln', () => {
  it('Buß- und Bettag', () => {
    expect(bussUndBettag(2026)).toBe('2026-11-18');
    expect(bussUndBettag(2027)).toBe('2027-11-17');
    expect(bussUndBettag(2028)).toBe('2028-11-22');
    for (let y = 2000; y < 2100; y++) { const d = Number(bussUndBettag(y).slice(8)); expect(d >= 16 && d <= 22).toBe(true); }
  });
  it('Zeitumstellung und Muttertag', () => {
    expect(nthWeekday(2027, 3, 0, -1)).toBe('2027-03-28');
    expect(nthWeekday(2027, 10, 0, -1)).toBe('2027-10-31');
    expect(nthWeekday(2026, 10, 0, -1)).toBe('2026-10-25');
    expect(nthWeekday(2028, 3, 0, -1)).toBe('2028-03-26');
    expect(nthWeekday(2027, 5, 0, 2)).toBe('2027-05-09');
    expect(nthWeekday(2026, 5, 0, 2)).toBe('2026-05-10');
  });
});
describe('Feiertage je Land', () => {
  const count = (y: number, l: any, o?: any) => feiertage(y, l, o).length;
  it('Anzahl 2027', () => {
    const want: Record<string, number> = { BW: 12, BY: 13, BE: 10, BB: 12, HB: 10, HH: 10, HE: 10, MV: 11, NI: 10, NW: 11, RP: 11, SL: 12, SN: 11, ST: 11, SH: 10, TH: 11 };
    for (const l of LAENDER) expect([l, count(2027, l)]).toEqual([l, want[l]]);
    expect(count(2027, 'BY', 'std')).toBe(12);
    expect(count(2027, 'BY', 'augsburg')).toBe(14);
    expect(count(2027, 'SN', 'fl')).toBe(12);
    expect(count(2027, 'TH', 'fl')).toBe(12);
  });
  it('Berlin 2028: einmaliger Feiertag am 17. Juni', () => {
    expect(feiertage(2028, 'BE').some((f) => f.date === '2028-06-17')).toBe(true);
    expect(feiertage(2027, 'BE').some((f) => f.date.endsWith('06-17'))).toBe(false);
  });
  it('bewegliche Feiertage 2027', () => {
    const d = Object.fromEntries(feiertage(2027, 'NW').map((f) => [f.id, f.date]));
    expect(d).toMatchObject({ karfreitag: '2027-03-26', ostermontag: '2027-03-29', himmelfahrt: '2027-05-06', pfingstmontag: '2027-05-17', fronleichnam: '2027-05-27' });
  });
  it('Übersicht enthält jeden Tag einmal', () => {
    const u = uebersicht(2027); expect(new Set(u.map((x) => x.id)).size).toBe(u.length);
  });
});
describe('Brückentage', () => {
  it('Kalenderwochen', () => {
    expect(isoWeek('2027-01-01')).toEqual({ year: 2026, week: 53 });
    expect(isoWeek('2027-01-04')).toEqual({ year: 2027, week: 1 });
    expect(weeksInYear(2026)).toBe(53); expect(weeksInYear(2027)).toBe(52);
  });
  it('Freitag nach Himmelfahrt 2027 ist eine Brücke 1 → 4', () => {
    const b = bruecken(2027, 'NW', 'std').find((x) => x.urlaubVon === '2027-05-07');
    expect(b).toMatchObject({ urlaub: 1, frei: 4, freiVon: '2027-05-06', freiBis: '2027-05-09' });
  });
  it('Optimierer: nie mehr Urlaub als das Budget, und mehr Budget bringt nie weniger', () => {
    for (const l of ['BY', 'BE', 'NW', 'SN'] as const) {
      let prev = 0;
      for (let b = 0; b <= 30; b++) { const p = optimiere(2027, l, l === 'BY' ? 'mh' : 'std', b); expect(p.urlaub).toBeLessThanOrEqual(b); expect(p.frei).toBeGreaterThanOrEqual(prev); prev = p.frei; }
    }
  });
  it('Arbeitstage 2027 NRW', () => { expect(arbeitstage(2027, 'NW', 'std').reduce((a, b) => a + b, 0)).toBe(254); });
});
import { berlinInstant } from '../src/lib/zeit';
describe('Deutsche Zeit', () => {
  it('Mitternacht und Umstellung', () => {
    expect(berlinInstant('2027-03-28', '02:00')).toBe('2027-03-28T01:00:00.000Z');
    expect(berlinInstant('2027-10-31', '03:00')).toBe('2027-10-31T01:00:00.000Z');
    expect(berlinInstant('2027-01-01')).toBe('2026-12-31T23:00:00.000Z');
    expect(berlinInstant('2027-05-16')).toBe('2027-05-15T22:00:00.000Z');
  });
});
