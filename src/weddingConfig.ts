// Central wedding details shared by the invitation, the admin link generator and the forms.
export const WEDDING = {
  brideName: 'Tashini',
  groomName: 'Ishan',
} as const;

export type GuestPrefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

export const GUEST_PREFIXES: GuestPrefix[] = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

/**
 * Combines a prefix and a guest name into the name shown to the guest.
 * "Dear" is a greeting style, not a title, so it is never part of the display name.
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
  const path = window.location.pathname.slice(1);
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
