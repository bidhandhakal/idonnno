function getTodayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const STORAGE_KEY = 'uselessCounter:presses';

export function readTodayPresses() {
  const raw =
    typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  if (!raw) return { day: getTodayKey(), count: 0 };
  try {
    const parsed = JSON.parse(raw) as { day: string; count: number };
    if (parsed.day !== getTodayKey()) return { day: getTodayKey(), count: 0 };
    return { day: parsed.day, count: Number(parsed.count) || 0 };
  } catch {
    return { day: getTodayKey(), count: 0 };
  }
}

export function writeTodayPresses(day: string, count: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ day, count }));
}
