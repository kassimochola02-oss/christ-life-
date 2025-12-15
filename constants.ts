import { Announcement, Song, BibleVerse } from './types';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Sunday Service: The Power of Faith',
    image: 'https://picsum.photos/800/400?random=1',
    description: 'Join us this Sunday as we explore Hebrews 11.'
  },
  {
    id: '2',
    title: 'Youth Overnight',
    image: 'https://picsum.photos/800/400?random=2',
    description: 'A night of prayer and worship for the youth.'
  },
  {
    id: '3',
    title: 'Charity Run',
    image: 'https://picsum.photos/800/400?random=3',
    description: 'Supporting our community outreach programs.'
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
