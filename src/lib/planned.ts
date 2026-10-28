/** Toutes les pages prévues (id = nom du fichier de src/content/guides, ou id d'une entrée d'un fichier à plusieurs pages).
 *  Les tests acceptent un lien vers ces ids pendant la rédaction ; « toutes les pages existent » échoue tant qu'il en manque. */
export const LAND_IDS = ['feiertage-baden-wuerttemberg', 'feiertage-bayern', 'feiertage-berlin', 'feiertage-brandenburg', 'feiertage-bremen', 'feiertage-hamburg', 'feiertage-hessen', 'feiertage-mecklenburg-vorpommern', 'feiertage-niedersachsen', 'feiertage-nrw', 'feiertage-rheinland-pfalz', 'feiertage-saarland', 'feiertage-sachsen', 'feiertage-sachsen-anhalt', 'feiertage-schleswig-holstein', 'feiertage-thueringen'];
export const PLANNED_GUIDES = [
  'brueckentage-2026', 'brueckentage-2028', 'arbeitstage-2027', 'urlaubsanspruch',
  'feiertage-2026', 'feiertage-2027', 'feiertage-2028', 'kalender-2027', 'kalender-2028', 'mariae-himmelfahrt', 'fronleichnam',
  ...LAND_IDS,
  'ostern-2027', 'pfingsten-2027', 'zeitumstellung', 'muttertag-2027',
];
export const PLANNED_IDS = new Set<string>([...PLANNED_GUIDES, 'home', 'method', 'about', 'widget', 'contact', 'editorial', 'privacy', 'terms', 'cookies']);
