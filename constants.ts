import { Announcement, Song, BibleVerse } from './types';

export const ZOOM_MEETING_URL = 'https://us06web.zoom.us/j/84928699926?pwd=motRlw9xALYfwiQutViLFYOBB4NVb8.1';
export const BANK_ACCOUNT_NUMBER = '6006741566';
export const BANK_NAME = 'Centenary Bank';
export const ACCOUNT_NAME = 'Christ Life Bweyogerere';
export const CHURCH_LOCATION = 'North Park Plaza, Opp. UNBS HDQTRS, Bweyogerere';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'sunday-garage',
    title: 'Sunday Garage',
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800', // Placeholder: Vibrant purple/gold theme
    description: 'Join us every Sunday! 1st Service: 9:00AM - 11:00AM | 2nd Service: 11:30PM - 1:00PM'
  },
  {
    id: 'mc-live',
    title: 'MC Live is ON TODAY!',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    description: 'Every Wednesday at 5:30PM in all our Missional Communities. 2025: The Year of a Glorious Destiny.'
  },
  {
    id: 'equip-night',
    title: 'MC Leaders Equip Night',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    description: 'Thoroughly equipped for every good work. Every Tuesday at 8:00PM.'
  },
  {
    id: 'youth-xp',
    title: 'Youth XP',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    description: "WE R' Rich, Anointed, Young & Sent. The vibrant youth community of CLB."
  }
];

export const SONGS: Song[] = [
  { id: '1', title: 'Way Maker', artist: 'Worship Harvest', platformUrl: '#' },
  { id: '2', title: 'Goodness of God', artist: 'Worship Harvest', platformUrl: '#' },
  { id: '3', title: 'Jireh', artist: 'Worship Harvest', platformUrl: '#' },
];

export const LUGANDA_BIBLE_SAMPLE: BibleVerse[] = [
  { book: 'Yokaana', chapter: 3, verse: 16, text: 'Kubanga Katonda yagala nnyo ensi, n’okuwaayo n’awaayo Omwana we eyazaalibwa omu yekka, buli amukkiriza aleme okubula, naye abeere n’obulamu obutaggwaawo.', version: 'Luganda' },
  { book: 'Zabbuli', chapter: 23, verse: 1, text: 'Mukama ye Musumba wange; siremeera.', version: 'Luganda' },
];

export const ENGLISH_BIBLE_SAMPLE: BibleVerse[] = [
  { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', version: 'KJV' },
  { book: 'Psalm', chapter: 23, verse: 1, text: 'The Lord is my shepherd; I shall not want.', version: 'KJV' },
];
