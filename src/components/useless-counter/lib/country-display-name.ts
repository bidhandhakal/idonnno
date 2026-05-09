let regionNames: Intl.DisplayNames | null | undefined;

function getRegionNames(): Intl.DisplayNames | null {
  if (typeof Intl === 'undefined' || !('DisplayNames' in Intl)) return null;
  if (regionNames === undefined) {
    try {
      regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    } catch {
      regionNames = null;
    }
  }
  return regionNames;
}

/** English region name from an ISO-style code, or a sensible fallback. */
export function countryCodeToDisplayName(code: string): string {
  const raw = code.trim();
  const upper = raw.toUpperCase();
  if (!upper || upper === '??') return 'Unknown region';
  if (upper === 'LOCAL') return 'Local';

  const dn = getRegionNames();
  const iso2 = upper.slice(0, 2);
  if (dn && /^[A-Z]{2}$/.test(iso2)) {
    try {
      const name = dn.of(iso2);
      if (name) return name;
    } catch {
      // ignore
    }
  }

  return raw || upper;
}

/** Whether to show the raw stored code under/next to the resolved display name. */
export function shouldShowCountryCodeSubtitle(
  displayName: string,
  storedCode: string,
): boolean {
  const c = storedCode.trim();
  if (!c || c.toUpperCase() === '??') return false;
  return displayName.trim().toUpperCase() !== c.toUpperCase();
}
