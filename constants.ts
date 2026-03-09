
import { Announcement, Song, BibleVerse } from './types';

export const ZOOM_MEETING_URL = 'https://us06web.zoom.us/j/84928699926?pwd=motRlw9xALYfwiQutViLFYOBB4NVb8.1';
export const YOUTUBE_URL = 'https://www.youtube.com/@thechristlifechurch';
export const TELEGRAM_URL = 'https://t.me/thechristlifechurch';
export const WHATSAPP_URL = 'https://chat.whatsapp.com/CLBCommunity';
export const BANK_ACCOUNT_NUMBER = '6006741566';
export const BANK_NAME = 'ABSA Bank';
export const ACCOUNT_NAME = 'Christ Life Bweyogerere';
export const CHURCH_LOCATION = 'North Park Plaza, Opp. UNBS HDQTRS, Bweyogerere';

// Merchant Codes for Mobile Money
export const MERCHANT_MTN = '726123';
export const MERCHANT_AIRTEL = '4380286';

export const CHURCH_LOGO = '/logo.jpg';

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'sunday-garage',
    title: 'Sunday Garage',
    image: '/444.jpg', 
    description: 'Join us every Sunday! 1st Service: 9:00AM - 11:00AM | 2nd Service: 11:30PM - 1:00PM'
  },
  {
    id: 'mc-live',
    title: 'MC Live is ON TODAY!',
    image: '/MC.png',
    description: 'Every Wednesday at 5:30PM in all our Missional Communities. 2025: The Year of a Glorious Destiny.'
  },
  {
    id: 'equip-night',
    title: 'MC Leaders Equip Night',
    image: '/2222.jpg',
    description: 'Thoroughly equipped for every good work. Every Tuesday at 8:00PM.'
  },
  {
    id: 'youth-xp',
    title: 'Youth XP',
    image: '/1111.jpg',
    description: "WE R' Rich, Anointed, Young & Sent. The vibrant youth community of CLB."
  },
  {
    id: 'prayer-night',
    title: 'Night of Prayer',
    image: '/6666.jpg',
    description: 'A night of deep encounter and spiritual breakthrough. Join us this Friday at 9:00PM.'
  },
  {
    id: 'worship-night',
    title: 'Worship Experience',
    image: '/7777.jpg',
    description: 'Come and experience the presence of God through heartfelt worship and praise.'
  }
];

export const SONGS: Song[] = [
  { id: '1', title: 'Way Maker', artist: 'Worship Harvest', platformUrl: '#' },
  { id: '2', title: 'Goodness of God', artist: 'Worship Harvest', platformUrl: '#' },
  { id: '3', title: 'Jireh', artist: 'Worship Harvest', platformUrl: '#' },
];
