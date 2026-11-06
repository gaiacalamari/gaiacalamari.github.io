import type { Localized } from './types';

export interface ChallengeWriteup { title: string; org: string; target: Localized; date: string; url: string }
const B = 'https://strangerforensics.wordpress.com';

/** Forensic CTF challenges with a published write-up on Stranger Forensics. Newest first. */
export const record: ChallengeWriteup[] = [
  { title: 'Magnet Virtual Summit 2025 – Mobile', org: 'Magnet Forensics', target: { en: 'iOS and Android images', it: 'Copie iOS e Android' }, date: '2026-02-05', url: `${B}/2026/02/05/magnet-virtual-summit-2025-mobile/` },
  { title: 'Kidnapper case', org: 'Belkasoft', target: { en: 'Linux disk image', it: 'Immagine disco Linux' }, date: '2026-02-03', url: `${B}/2026/02/03/kidnapper-case/` },
  { title: 'Insider Lab', org: 'CyberDefenders', target: { en: 'Endpoint, insider threat', it: 'Endpoint, insider threat' }, date: '2026-02-03', url: `${B}/2026/02/03/insider-lab/` },
  { title: 'Mr. Gamer', org: 'CyberDefenders', target: { en: 'Compromised endpoint', it: 'Endpoint compromesso' }, date: '2026-01-30', url: `${B}/2026/01/30/mr-gamer/` },
  { title: 'Jailbroken Lab', org: 'CyberDefenders', target: { en: 'Jailbroken iPad', it: 'iPad con jailbreak' }, date: '2026-01-28', url: `${B}/2026/01/28/jailbroken-lab/` },
  { title: 'Magnet Virtual Summit 2023 CTF', org: 'Magnet Forensics', target: { en: 'Windows 11', it: 'Windows 11' }, date: '2026-01-16', url: `${B}/2026/01/16/pc-mus-001-ctf-magnet/` },
];
