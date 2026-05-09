const STORAGE_KEY = 'uselessCounter:sessionId';

export function getOrCreateSessionId() {
  const existing =
    typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (existing) return existing;
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(STORAGE_KEY, id);
  return id;
}
