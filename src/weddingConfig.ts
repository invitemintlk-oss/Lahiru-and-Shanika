// Central wedding details shared by the invitation, the admin link generator and the forms.
export const WEDDING = {
  groomName: 'Lahiru',
  brideName: 'Shanika',
  groomFullName: 'W. Lahiru Dilruk Sharuka Piris',
  brideFullName: 'W. Shanika Madushi',
  groomParents: ['Mr. W. Chandana Sugath Piris', 'Mrs. W. Kumuduni Wasanthi Fernando'],
  brideParents: ['Mr. W. Woshintan Fernando', 'Mrs. D. Merry Niroshani Sujitha'],

  // 9:00 AM Sri Lanka time (UTC+05:30)
  dateISO: '2026-12-10T09:00:00+05:30',
  weekday: 'Thursday',
  dateLong: '10th December 2026',
  dateHero: 'Thursday, December 10, 2026',
  time: '9:00 AM',

  venue: 'Holy Cross Church',
  mapUrl:
    'https://maps.google.com/maps/search/Holy%20Cross%20Church/@7.194713115692139,79.833984375,17z?hl=en',

  themeVerse:
    'මෙසේ ඔවුන් එවක් පටන් දෙදෙනකු නොව එකකෙනෙකු වෙති. එබැවින් දෙවියන් එක් කල අය මිනිසා විසින් වෙන් නොකෙරේවා',
  themeReference: 'මතෙව් 19:6',

  hashtag: '#Lahiru&Shanika2026',
  introVideo: '/give_beautiful_live_video_202604291917.mp4',
} as const;

/** "Lahiru & Shanika" – used wherever the couple is named together. */
export const COUPLE_NAMES = `${WEDDING.groomName} & ${WEDDING.brideName}`;

export type GuestPrefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

export const GUEST_PREFIXES: GuestPrefix[] = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

/**
 * Combines a prefix and a guest name into the name shown to the guest.
 * "Dear" is a greeting style, not a title, so it is never part of the display name
 * (the message already starts with "Dear", which avoids "Dear Dear Sanjaya").
 */
export function getGuestDisplayName(prefix: string, name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '';
  switch (prefix) {
    case 'Family':
      return `${trimmed} and Family`;
    case 'Dear':
    case '':
      return trimmed;
    default:
      return `${prefix} ${trimmed}`;
  }
}

/** Reads the personalised guest name from the URL: /{guestName}?prefix={prefix} */
export function getGuestFromUrl(): { prefix: string; name: string; displayName: string } {
  const params = new URLSearchParams(window.location.search);
  const prefix = params.get('prefix') || '';
  const path = window.location.pathname.slice(1).replace(/\/+$/, '');
  let name = params.get('name') || '';
  if (path && path !== 'admin') {
    try {
      name = decodeURIComponent(path);
    } catch {
      name = path;
    }
  }
  return { prefix, name, displayName: getGuestDisplayName(prefix, name) };
}
