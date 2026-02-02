
export enum View {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  BIBLE = 'BIBLE',
  GROUPS = 'GROUPS',
  MUSIC = 'MUSIC',
  GIVING = 'GIVING',
  // Sub-views for Groups
  GROUP_MCS = 'GROUP_MCS',
  GROUP_MEDIA = 'GROUP_MEDIA',
  GROUP_WORSHIP = 'GROUP_WORSHIP',
  GROUP_DANCE = 'GROUP_DANCE',
  GROUP_KIDS = 'GROUP_KIDS',
  GROUP_ADMIN = 'GROUP_ADMIN',
  GROUP_SOCIAL = 'GROUP_SOCIAL',
  LIVE_STREAM = 'LIVE_STREAM'
}

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: 'KJV' | 'NKJV' | 'Luganda';
}

export interface Announcement {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  platformUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}
