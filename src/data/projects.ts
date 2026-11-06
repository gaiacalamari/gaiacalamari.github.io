import type { Localized, Project } from './types';

const cat = {
  web: { en: 'Web acquisition', it: 'Acquisizione web' },
  doc: { en: 'Document analysis', it: 'Analisi documentale' },
  img: { en: 'Image & media analysis', it: 'Analisi immagini e media' },
  ext: { en: 'Data extraction', it: 'Estrazione dati' },
  mob: { en: 'Mobile forensics', it: 'Mobile forensics' },
  awa: { en: 'Security awareness', it: 'Forensic Readness' },
  oth: { en: 'Other', it: 'Altro' },
} satisfies Record<string, Localized>;

/** Curated metadata layered on top of the GitHub API data, keyed by repository name. */
export const curated: Record<string, Partial<Project> & { category: Localized }> = {
  WEBCQUISITION: {
    capabilities: [
      { en: 'Restarts from a clean VM snapshot and checks identity, network adapters and snapshot', it: 'Riparte da uno snapshot pulito e verifica identità, schede di rete e snapshot' },
      { en: 'Verified PCAPNG capture on the right network adapter', it: 'Cattura PCAPNG verificata sulla scheda di rete corretta' },
      { en: 'TLS secrets logged (SSLKEYLOGFILE) to decrypt HTTPS later', it: 'Segreti TLS registrati (SSLKEYLOGFILE) per decifrare l’HTTPS' },
      { en: 'Screenshots with hashes and metadata', it: 'Screenshot con hash e metadati' },
      { en: 'Case folder copied to the host with double SHA-256 check', it: 'Copia della cartella del caso sull’host con doppia verifica SHA-256' },
      { en: 'acquisition.json, HTML report and hash-chained event log', it: 'acquisition.json, report HTML e log eventi a catena di hash' },
    ],
    category: cat.web,
    article: 'https://strangerforensics.wordpress.com/2026/09/30/webcquisition/',
    summary: {
      en: 'Automates the repetitive steps of a forensic web acquisition inside a Windows VM on VMware Workstation Pro: clean snapshot, verified PCAPNG capture, TLS key logging, hashed screenshots, a double SHA-256 copy to the host and an HTML report with a hash-chained event log. The analyst keeps only the investigative work.',
      it: "Automatizza i passaggi ripetitivi di un'acquisizione forense web in una VM Windows su VMware Workstation Pro: snapshot pulito, cattura PCAPNG verificata, registrazione dei segreti TLS, screenshot con hash, copia sull'host con doppia verifica SHA-256 e report HTML con log eventi a catena di hash. All'analista resta solo il lavoro investigativo.",
    },
  },
  PDFTrace: {
    capabilities: [
      { en: 'SHA-256, SHA-1 and MD5 of the file, opened read-only', it: 'SHA-256, SHA-1 e MD5 del file, aperto in sola lettura' },
      { en: 'Info and XMP metadata compared, earlier revisions recovered', it: 'Confronto metadati Info e XMP, revisioni precedenti' },
      { en: 'OCR compared with the text layer to expose hidden text', it: 'OCR confrontato con il livello di testo per far emergere testo nascosto' },
      { en: 'Signatures, certificates and data appended after signing', it: 'Firme, certificati e dati aggiunti dopo la firma' },
      { en: 'Same data read by pdfminer, pikepdf, pypdf and PDFium', it: 'Stessi dati letti da pdfminer, pikepdf, pypdf e PDFium' },
      { en: 'Reports in JSON, CSV, Markdown and HTML', it: 'Report in JSON, CSV, Markdown e HTML' },
    ],
    category: cat.doc,
    summary: {
      en: 'Open-source application for the forensic analysis of PDF files. The file is opened read-only and examined for metadata, revisions, fonts, embedded images, hidden or overlapping text, signatures and disagreements between parsers, with a desktop UI, a CLI and JSON, CSV, Markdown and HTML reports.',
      it: "Applicazione open source per l'analisi forense dei file PDF. Il file viene aperto in sola lettura ed esaminato per metadati, revisioni, font, immagini incorporate, testo nascosto o sovrapposto, firme e discrepanze tra parser, con interfaccia desktop, CLI e report JSON, CSV, Markdown e HTML.",
    },
    note: {
      en: 'Developed by the Digital Forensic team at Defence Tech S.p.A.',
      it: 'Sviluppato dal team di Digital Forensic di Defence Tech S.p.A.',
    },
  },
  ForensicVisionPro: {
    capabilities: [
      { en: 'Acquisition with verified hashes and chain of custody', it: 'Acquisizione con hash verificati e catena di custodia' },
      { en: 'File structure, metadata and timeline analysis', it: 'Struttura dei file, metadati e analisi temporale' },
      { en: 'JPEG compression history, copy-move and median filter', it: 'Storia di compressione JPEG, copy-move e filtro mediano' },
      { en: 'PRNU and steganalysis', it: 'PRNU e steganalisi' },
      { en: 'Image comparison and hex viewer', it: 'Confronto tra immagini e hex viewer' },
      { en: 'Windows installer, portable build and SHA256SUMS', it: 'Installer Windows, versione portable e SHA256SUMS' },
    ],
    category: cat.img,
    summary: {
      en: 'Desktop suite for the forensic analysis of images, with partial support for video and audio: hash-verified acquisition and chain of custody, file structure, metadata, timeline, JPEG compression history, copy-move, PRNU, steganalysis, image comparison, hex viewer and reporting.',
      it: "Suite desktop per l'analisi forense di immagini, e in parte di video e audio: acquisizione con hash verificati e catena di custodia, struttura dei file, metadati, analisi temporale, storia di compressione JPEG, copy-move, PRNU, steganalisi, confronto tra immagini, hex viewer e report.",
    },
  },
  'XT_ExtractDocsMail-': {
    capabilities: [
      { en: 'One command, no GUI interaction', it: 'Un solo comando, nessuna interazione con la GUI' },
      { en: 'Every category assigned by X-Ways is exported', it: 'Esporta ogni categoria assegnata da X-Ways' },
      { en: 'Original path rebuilt from each item’s parents', it: 'Percorso originale ricostruito risalendo ai parent' },
      { en: 'Long paths beyond 260 characters handled', it: 'Gestione dei percorsi oltre i 260 caratteri' },
    ],
    displayName: 'XT_ExtractDocsMail',
    category: cat.ext,
    article: 'https://strangerforensics.wordpress.com/2026/07/28/xt_extractdocsmail/',
    summary: {
      en: 'X-Tension for X-Ways Forensics (x64) that exports the files of a forensic image organised by category, rebuilding each original path. It runs entirely from the command line, handles long paths and exports every category X-Ways assigns.',
      it: "X-Tension per X-Ways Forensics (x64) che esporta i file di un'immagine forense organizzati per categoria, ricostruendo il percorso originale. Funziona interamente da riga di comando, gestisce i percorsi lunghi ed esporta tutte le categorie assegnate da X-Ways.",
    },
  },
  'Query-SQL-WhatsApp-db': {
    language: 'SQL',
    category: cat.mob,
    summary: {
      en: 'SQL queries for WhatsApp databases on Android and iOS: number and time range of deleted messages, deleted messages still recoverable, and messages with attachments.',
      it: 'Query SQL per i database WhatsApp di Android e iOS: numero e intervallo temporale dei messaggi cancellati, messaggi cancellati ancora recuperabili e messaggi con allegati.',
    },
  },
  'phishing-demo': {
    category: cat.awa,
    summary: {
      en: 'Educational demo of how a phishing page looks and behaves, with a mock server and no real data collection. Built for awareness training.',
      it: 'Demo didattica di come appare e si comporta una pagina di phishing, con server simulato e nessuna raccolta reale di dati. Pensata per la formazione e la sensibilizzazione.',
    },
  },
};

export const otherCategory = cat.oth;

/**
 * Snapshot of the public repositories (2026-11-06).
 * Used when the GitHub API is unreachable or rate-limited.
 */
export const projectsSnapshot: Array<Pick<Project, 'name' | 'description' | 'language' | 'topics' | 'updatedAt'>> = [
  { name: 'ForensicVisionPro', language: 'Python', topics: [], updatedAt: '2026-11-05T14:05:29Z', description: "Suite desktop per l'analisi forense di immagini (e, in parte, video e audio)." },
  { name: 'PDFTrace', language: 'Python', topics: [], updatedAt: '2026-11-05T11:11:49Z', description: "Tool open source sviluppato dal team di Digital Forensic della Defence Tech S.p.A. per supportare l'analisi tecnica e forense di documenti PDF." },
  { name: 'WEBCQUISITION', language: 'Python', topics: [], updatedAt: '2026-11-05T11:10:33Z', description: 'Automated forensic acquisition of web activity in a Windows VM on VMware Workstation Pro.' },
  { name: 'XT_ExtractDocsMail-', language: 'Pascal', topics: ['dfir', 'freepascal', 'x-tension', 'xways'], updatedAt: '2026-07-30T07:49:18Z', description: "X-Tension per X-Ways Forensics (x64): estrae automaticamente da riga di comando i file di un'immagine forense organizzati per categoria." },
  { name: 'phishing-demo', language: 'HTML', topics: [], updatedAt: '2026-01-31T15:48:08Z', description: 'phishing test' },
  { name: 'Query-SQL-WhatsApp-db', language: null, topics: [], updatedAt: '2025-11-24T08:28:32Z', description: 'Some usefull queries for WhatsApp databases' },
  { name: 'From-PA-to-a-readable-chat', language: 'Python', topics: [], updatedAt: '2025-10-21T10:15:27Z', description: "I developed this code to make PA's printed PDF chat reports easier to read, without loosing any information." },
];
