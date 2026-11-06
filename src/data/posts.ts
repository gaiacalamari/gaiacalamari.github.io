import type { Localized, Post } from './types';

/** Snapshot of published articles (2026-11-06), used when the WordPress API is unreachable. */
export const postsSnapshot: Post[] = [
  { id: 'webcquisition', slug: 'webcquisition', title: 'WEBCQUISITION', url: 'https://strangerforensics.wordpress.com/2026/09/30/webcquisition/', date: '2026-09-30', image: null, excerpt: '' },
  { id: 'cloud-forensics', slug: 'cloud-forensics', title: 'Cloud Forensics', url: 'https://strangerforensics.wordpress.com/2026/09/28/cloud-forensics/', date: '2026-09-28', image: null, excerpt: '' },
  { id: 'xt_extractdocsmail', slug: 'xt_extractdocsmail', title: 'XT_ExtractDocsMail', url: 'https://strangerforensics.wordpress.com/2026/07/28/xt_extractdocsmail/', date: '2026-07-28', image: null, excerpt: '' },
  { id: 'bfu', slug: 'what-can-we-do-with-a-bfu', title: 'What can we do with a BFU', url: 'https://strangerforensics.wordpress.com/2026/05/25/what-can-we-do-with-a-bfu/', date: '2026-05-25', image: 'https://strangerforensics.wordpress.com/wp-content/uploads/2026/05/pexels-noah-erickson-97554-404280-e1779694448273.jpg', excerpt: '' },
  { id: '376', slug: '376', title: 'Spostamenti Google', url: 'https://strangerforensics.wordpress.com/2026/04/28/376/', date: '2026-04-28', image: 'https://strangerforensics.wordpress.com/wp-content/uploads/2026/04/image.png', excerpt: '' },
  { id: 'ios', slug: 'advanced-data-extraction-in-ios-forensics-file-protection-and-device-security', title: 'Advanced Data Extraction in iOS Forensics: File Protection and Device Security', url: 'https://strangerforensics.wordpress.com/2026/03/23/advanced-data-extraction-in-ios-forensics-file-protection-and-device-security/', date: '2026-03-23', image: null, excerpt: '' },
  { id: 'footprint', slug: 'forensic-footprint-accesso-volontario-o-involontario', title: 'Forensic Footprint: accesso volontario o involontario?', url: 'https://strangerforensics.wordpress.com/2026/02/17/forensic-footprint-accesso-volontario-o-involontario/', date: '2026-02-17', image: null, excerpt: '' },
  { id: 'mvs25', slug: 'magnet-virtual-summit-2025-mobile', title: 'Magnet Virtual Summit 2025 – Mobile', url: 'https://strangerforensics.wordpress.com/2026/02/05/magnet-virtual-summit-2025-mobile/', date: '2026-02-05', image: null, excerpt: '' },
  { id: 'insider', slug: 'insider-lab', title: 'Insider Lab', url: 'https://strangerforensics.wordpress.com/2026/02/03/insider-lab/', date: '2026-02-03', image: null, excerpt: '' },
  { id: 'kidnapper', slug: 'kidnapper-case', title: 'Kidnapper case', url: 'https://strangerforensics.wordpress.com/2026/02/03/kidnapper-case/', date: '2026-02-03', image: null, excerpt: '' },
  { id: 'mrgamer', slug: 'mr-gamer', title: 'Mr. Gamer', url: 'https://strangerforensics.wordpress.com/2026/01/30/mr-gamer/', date: '2026-01-30', image: null, excerpt: '' },
  { id: 'jailbroken', slug: 'jailbroken-lab', title: 'Jailbroken Lab', url: 'https://strangerforensics.wordpress.com/2026/01/28/jailbroken-lab/', date: '2026-01-28', image: null, excerpt: '' },
];

/**
 * Short summaries written for this site (not copied from the articles),
 * shown for highlighted posts. Keyed by slug.
 */
export const postSummaries: Record<string, Localized> = {
  webcquisition: {
    en: 'Why the manual half of a web acquisition should be automated, and how WEBCQUISITION leaves the analyst with only the investigative part: browsing and deciding what to document.',
    it: "Perché la parte manuale di un'acquisizione web va automatizzata, e come WEBCQUISITION lascia all'analista solo la parte investigativa: navigare e decidere cosa documentare.",
  },
  'cloud-forensics': {
    en: 'How cloud computing changes where digital evidence lives, and which acquisition and analysis methods hold up when the system is not physically reachable.',
    it: "Come il cloud cambia il luogo in cui vivono le evidenze digitali, e quali metodologie di acquisizione e analisi reggono quando il sistema non è fisicamente accessibile.",
  },
  xt_extractdocsmail: {
    en: 'Exporting documents, spreadsheets, pictures, video and e-mail from an X-Ways case by category, automatically and from the command line.',
    it: 'Esportare documenti, fogli di calcolo, immagini, video ed e-mail da un caso X-Ways per categoria, in automatico e da riga di comando.',
  },
  'what-can-we-do-with-a-bfu': {
    en: 'File-Based Encryption on Android and what is still reachable on a device in Before First Unlock state.',
    it: "La File-Based Encryption su Android e cosa è ancora accessibile su un dispositivo in stato Before First Unlock.",
  },
  '376': {
    en: 'Google Location History is now Timeline ("Spostamenti"): what changed, and how the artefacts differ between Android and iOS.',
    it: 'La Cronologia delle posizioni ora si chiama Spostamenti: cosa è cambiato e come differiscono gli artefatti tra Android e iOS.',
  },
};
