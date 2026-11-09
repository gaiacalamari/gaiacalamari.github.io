import type { Localized } from './types';

export interface EvidenceRef { label: string; href: string; kind: 'tool' | 'article' }
export interface ExpertiseArea { id: string; title: Localized; text: Localized; evidence: EvidenceRef[]; casework?: boolean }

const B = 'https://strangerforensics.wordpress.com';
const G = 'https://github.com/gaiacalamari';

/**
 * Every area lists the public work that documents it.
 * Areas with no public evidence are shown as interests, not as skills.
 */
export const expertise: ExpertiseArea[] = [
  {
    id: 'computer',
    title: { en: 'Computer forensics', it: 'Computer forensics' },
    text: {
      en: 'Reconstructing user activity on Windows systems: registry, file access, browser traces, event logs, remote connections and the history of USB drives and external disks connected to the machine. Used in insider-threat, data-exfiltration and phishing cases.',
      it: "Ricostruzione dell'attività utente su sistemi Windows: registro, accesso ai file, tracce del browser, log degli eventi, connessioni remote e cronologia di pendrive e dischi esterni collegati. Applicata a casi di dipendente infedele, esfiltrazione di dati e phishing.",
    },
    evidence: [
      { kind: 'article', label: 'Forensic Footprint', href: `${B}/2026/02/17/forensic-footprint-accesso-volontario-o-involontario/` },
      { kind: 'article', label: 'MVS 2023 CTF – Windows 11', href: `${B}/2026/01/16/pc-mus-001-ctf-magnet/` },
      { kind: 'tool', label: 'XT_ExtractDocsMail', href: `${G}/XT_ExtractDocsMail-` },
    ],
  },
  {
    id: 'mobile',
    title: { en: 'Mobile forensics', it: 'Mobile forensics' },
    text: {
      en: 'Android and iOS acquisition and analysis with Cellebrite, GrayKey, Oxygen Forensics, Magnet AXIOM and the LEAPP parsers: encryption states (BFU/AFU), location artefacts, messaging databases, OS logs and timeline reconstruction at a given moment.',
      it: 'Acquisizione e analisi Android e iOS con Cellebrite, GrayKey, Oxygen Forensics, Magnet AXIOM e i parser LEAPP: stati di cifratura (BFU/AFU), artefatti di posizione, database di messaggistica, log di sistema e ricostruzione degli eventi in un dato istante.',
    },
    evidence: [
      { kind: 'article', label: 'What can we do with a BFU', href: `${B}/2026/05/25/what-can-we-do-with-a-bfu/` },
      { kind: 'article', label: 'iOS data extraction', href: `${B}/2026/03/23/advanced-data-extraction-in-ios-forensics-file-protection-and-device-security/` },
      { kind: 'article', label: 'Spostamenti Google', href: `${B}/2026/04/28/376/` },
      { kind: 'tool', label: 'Query-SQL-WhatsApp-db', href: `${G}/Query-SQL-WhatsApp-db` },
    ],
  },
  {
    id: 'cloud',
    title: { en: 'Cloud forensics', it: 'Cloud forensics' },
    text: {
      en: 'Acquisition and analysis methods for evidence held by cloud services rather than on a seized device.',
      it: 'Metodologie di acquisizione e analisi per evidenze conservate da servizi cloud anziché su un dispositivo sequestrato.',
    },
    evidence: [{ kind: 'article', label: 'Cloud Forensics', href: `${B}/2026/09/28/cloud-forensics/` }],
  },
  {
    id: 'web',
    title: { en: 'Web forensics', it: 'Web forensics' },
    text: {
      en: 'Forensically sound capture of web pages and online activity, with network traffic and TLS secrets preserved.',
      it: "Acquisizione forense di pagine web e attività online, con conservazione del traffico di rete e dei segreti TLS.",
    },
    evidence: [
      { kind: 'tool', label: 'WEBCQUISITION', href: `${G}/WEBCQUISITION` },
      { kind: 'article', label: 'Automating web acquisition', href: `${B}/2026/09/30/webcquisition/` },
    ],
  },
  {
    id: 'acquisition',
    title: { en: 'Digital evidence acquisition', it: 'Acquisizione' },
    text: {
      en: 'Forensic copies of smartphones, computers, pendrives, hard disks, SSDs, SD cards, servers and mailboxes, with hash verification and chain of custody, including on-site during searches.',
      it: 'Copie forensi di smartphone, computer, pendrive, hard disk, SSD, SD card, server e caselle di posta, con verifica degli hash e catena di custodia, anche sul posto durante le perquisizioni.',
    },
    evidence: [
      { kind: 'tool', label: 'WEBCQUISITION', href: `${G}/WEBCQUISITION` },
      { kind: 'tool', label: 'ForensicVisionPro', href: `${G}/ForensicVisionPro` },
    ],
  },
  {
    id: 'extraction',
    title: { en: 'Data extraction and analysis', it: 'Estrazione e analisi dei dati' },
    text: {
      en: 'Getting structured, reviewable data out of forensic images, PDF files, images and chat exports.',
      it: 'Ottenere dati strutturati e verificabili da immagini forensi, file PDF, immagini ed export di chat.',
    },
    evidence: [
      { kind: 'tool', label: 'PDFTrace', href: `${G}/PDFTrace` },
      { kind: 'tool', label: 'ForensicVisionPro', href: `${G}/ForensicVisionPro` },
      { kind: 'tool', label: 'From-PA-to-a-readable-chat', href: `${G}/From-PA-to-a-readable-chat` },
    ],
  },
  {
    id: 'automation',
    title: { en: 'Forensic automation', it: 'Automazione forense' },
    text: {
      en: 'Scripting the repetitive parts of casework so that time goes to analysis, not to clicking.',
      it: 'Automatizzare le parti ripetitive del lavoro sui casi, così che il tempo vada all’analisi e non ai clic.',
    },
    evidence: [
      { kind: 'tool', label: 'WEBCQUISITION', href: `${G}/WEBCQUISITION` },
      { kind: 'tool', label: 'XT_ExtractDocsMail', href: `${G}/XT_ExtractDocsMail-` },
      { kind: 'tool', label: 'From-PA-to-a-readable-chat', href: `${G}/From-PA-to-a-readable-chat` },
    ],
  },
  {
    id: 'ediscovery',
    title: { en: 'eDiscovery and email', it: 'eDiscovery e posta elettronica' },
    text: {
      en: 'Indexing, OCR and keyword search across large volumes of email and documents with Intella and X-Ways, for corporate disputes, bankruptcies and internal investigations.',
      it: 'Indicizzazione, OCR e ricerca per parole chiave su grandi volumi di email e documenti con Intella e X-Ways, per contenziosi tra aziende, fallimenti e indagini interne.',
    },
    evidence: [{ kind: 'tool', label: 'XT_ExtractDocsMail', href: `${G}/XT_ExtractDocsMail-` }],
  },
  {
    id: 'recovery',
    title: { en: 'Data recovery and carving', it: 'Recupero dati e carving' },
    text: {
      en: 'Recovering deleted or damaged data from smartphones, hard disks, SSDs and memory cards, with file carving in R-Studio and X-Ways.',
      it: 'Recupero di dati cancellati o danneggiati da smartphone, hard disk, SSD e schede di memoria, con file carving tramite R-Studio e X-Ways.',
    },
    evidence: [],
    casework: true,
  },
  {
    id: 'osint',
    title: { en: 'OSINT', it: 'OSINT' },
    text: {
      en: 'Open-source intelligence as a complement to device-based evidence.',
      it: 'Intelligence da fonti aperte a complemento delle evidenze provenienti dai dispositivi.',
    },
    evidence: [], // No public work yet: rendered as an area of interest. Add references here when published.
  },
];

/** Software used in casework, grouped by purpose. Not exhaustive. */
export const toolkit: { title: Localized; tools: string[] }[] = [
  { title: { en: 'Acquisition and imaging', it: 'Acquisizione e imaging' },
    tools: ['FTK Imager', 'Arsenal Image Mounter', 'Cellebrite UFED', 'GrayKey'] },
  { title: { en: 'Mobile', it: 'Mobile' },
    tools: ['Cellebrite Physical Analyzer', 'Oxygen Forensics', 'Magnet AXIOM', 'iLEAPP / ALEAPP'] },
  { title: { en: 'Computer and Windows artefacts', it: 'Computer e artefatti Windows' },
    tools: ['X-Ways Forensics', 'Magnet AXIOM', 'Forensic Explorer (FEX)', 'Registry Explorer', 'RegRipper', 'Eric Zimmerman’s tools', 'USB Detective'] },
  { title: { en: 'eDiscovery and data recovery', it: 'eDiscovery e recupero dati' },
    tools: ['Intella', 'R-Studio'] },
  { title: { en: 'Review and verification', it: 'Revisione e verifica' },
    tools: ['Beyond Compare', 'IrfanView', 'ExifTool', 'Wireshark', 'FFmpeg', 'VMware Workstation'] },
  { title: { en: 'Scripting and queries', it: 'Scripting e query' },
    tools: ['Python', 'SQL / SQLite', 'Free Pascal'] },
];
