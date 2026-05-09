export function clampCountry(raw: string | null | undefined) {
  const c = (raw ?? '').trim().toUpperCase();
  if (!c) return 'LOCAL';
  if (c === '??') return 'LOCAL';
  return c.slice(0, 8);
}
