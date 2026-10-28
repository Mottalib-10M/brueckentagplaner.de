/**
 * Trousse de rédaction : tout chiffre et toute date écrits dans une page viennent d'ici, jamais tapés à la main.
 *   K.P                 paramètres datés (params-2026.json)
 *   K.feiertage, K.uebersicht, K.ostersonntag, K.nthWeekday …   moteur des jours fériés (engine/feiertage.ts)
 *   K.optimiere, K.bruecken, K.brueckentage, K.arbeitstage …     ponts et jours ouvrés (engine/brueckentage.ts)
 *   K.tool(kind, lang, args, valeurs)  lance un simulateur de tool-specs.ts et rend sa carte de résultat
 */
import P from '../data/params-2026.json';
import * as F from './engine/feiertage';
import * as B from './engine/brueckentage';
import { runTool } from './tool-specs';
import { LAST_UPDATED } from '../data/site-config';

export const KIT = { P, ...F, ...B, tool: runTool, LESEDATUM: LAST_UPDATED };
export type Kit = typeof KIT;
