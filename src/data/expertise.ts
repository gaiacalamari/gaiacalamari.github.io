import type { Localized } from './types';

export interface EvidenceRef { label: string; href: string; kind: 'tool' | 'article' }
export interface ExpertiseArea { id: string; title: Localized; text: Localized; evidence: EvidenceRef[] }

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
      en: 'Reconstructing user activity on Windows systems: file access, browser traces, logs, remote connections.',
      it: "Ricostruzione dell'attività utente su sistemi Windows: accesso ai file, tracce del browser, log, connessioni remote.",
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
      en: 'Android and iOS extraction and analysis: encryption states, location artefacts, messaging databases.',
      it: 'Estrazione e analisi Android e iOS: stati di cifratura, artefatti di posizione, database di messaggistica.',
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
    title: { en: 'Digital evidence acquisition', it: 'Acquisizione delle evidenze' },
    text: {
      en: 'Hash verification, chain of custody and repeatable procedures built into the tools themselves.',
      it: 'Verifica degli hash, catena di custodia e procedure ripetibili integrate negli strumenti stessi.',
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
    id: 'osint',
    title: { en: 'OSINT', it: 'OSINT' },
    text: {
      en: 'Open-source intelligence as a complement to device-based evidence.',
      it: 'Intelligence da fonti aperte a complemento delle evidenze provenienti dai dispositivi.',
    },
    evidence: [], // No public work yet: rendered as an area of interest. Add references here when published.
  },
];

/** Tools that appear in the published repositories and articles. */
export const toolsUsed = [
  'X-Ways Forensics', 'Cellebrite Physical Analyzer', 'iLEAPP / ALEAPP', 'Wireshark',
  'VMware Workstation', 'ExifTool', 'FFmpeg', 'Python', 'SQL / SQLite', 'Free Pascal',
];
