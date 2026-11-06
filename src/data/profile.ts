import type { Localized } from './types';

export interface TimelineItem { period: string; title: Localized; org?: string; text?: Localized }

/**
 * Fill these in when ready. Empty lists are not rendered, so nothing
 * unverified ever appears on the page.
 *
 * Example:
 * { period: '2024 – present', title: { en: 'Digital Forensic Analyst', it: 'Digital Forensic Analyst' }, org: 'Company' }
 */
export const experience: TimelineItem[] = [];
export const education: TimelineItem[] = [];
export const certifications: TimelineItem[] = [];
