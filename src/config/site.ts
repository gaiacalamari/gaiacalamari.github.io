/**
 * Central configuration. Most day-to-day updates happen here.
 * Everything listed below was verified from public sources on 2026-11-06
 * (GitHub profile, Stranger Forensics footer and About page).
 */
export const site = {
  name: 'Gaia Calamari',
  role: 'Digital Forensic Expert',
  location: 'Italy',
  url: 'https://gaiacalamari.github.io',

  /** Publicly listed on strangerforensics.wordpress.com. Set to '' to hide it. */
  email: 'forensicgaia@gmail.com',

  links: {
    github: 'https://github.com/gaiacalamari',
    linkedin: 'https://www.linkedin.com/in/gaia-calamari-0a80a7238/',
    blog: 'https://strangerforensics.wordpress.com/',
    medium: 'https://medium.com/@forensicgaia',
  },

  github: {
    user: 'gaiacalamari',
    /** Shown in "Featured tools", in this order. */
    featured: ['WEBCQUISITION', 'PDFTrace', 'ForensicVisionPro', 'XT_ExtractDocsMail-'],
    /** Never listed (e.g. this website's own repository). */
    hidden: ['gaiacalamari.github.io'],
    showForks: false,
  },

  blog: {
    name: 'STRANGER Forensic Bites',
    shortName: 'Stranger Forensics',
    tagline: 'Follow the data. Catch the stranger.',
    url: 'https://strangerforensics.wordpress.com/',
    /** WordPress.com site id used by the public REST API (no key needed). */
    wpSite: 'strangerforensics.wordpress.com',
    logo: 'https://strangerforensics.wordpress.com/wp-content/uploads/2026/01/photo_2026-01-07_19-15-51.jpg',
    /** Post slugs to feature, in order. The first one becomes the lead story. */
    highlights: ['webcquisition', 'cloud-forensics', 'xt_extractdocsmail', 'what-can-we-do-with-a-bfu', '376'],
  },

  cv: {
    /**
     * Leave empty until the PDF exists. When ready:
     * 1. copy the file to public/documents/cv.pdf
     * 2. set file: 'documents/cv.pdf'
     */
    file: '',
  },

  defaultLanguage: 'it' as 'it' | 'en',
};

export type SiteConfig = typeof site;
