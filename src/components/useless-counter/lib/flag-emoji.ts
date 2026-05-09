const REGIONAL_OFFSET = 0x1f1e6 - 'A'.charCodeAt(0);

/** Globe when we don’t have a real ISO 3166-1 alpha-2 code. */
export const COUNTRY_FLAG_FALLBACK = '🌍';

/**
 * Maps a stored country label to a flag emoji (Unicode regional indicators).
 * Uses the first two A–Z letters when they form a plausible alpha-2 code.
 */
export function countryCodeToFlagEmoji(code: string): string {
  const upper = code.trim().toUpperCase();
  if (!upper || upper === 'LOCAL' || upper === '??') {
    return COUNTRY_FLAG_FALLBACK;
  }

  const iso = upper.slice(0, 2);
  if (!/^[A-Z]{2}$/.test(iso)) {
    return COUNTRY_FLAG_FALLBACK;
  }

  return String.fromCodePoint(
    REGIONAL_OFFSET + iso.charCodeAt(0),
    REGIONAL_OFFSET + iso.charCodeAt(1),
  );
}
