export const CLICK_SOUND_STORAGE_KEY = 'idonnno:clickSoundEnabled';

/** Default: sound on when unset. */
export function isClickSoundEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(CLICK_SOUND_STORAGE_KEY) !== '0';
}

const CLICK_SOUND_CHANGE_EVENT = 'idonnno:clickSoundChanged';

export function setClickSoundEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLICK_SOUND_STORAGE_KEY, enabled ? '1' : '0');
  window.dispatchEvent(new Event(CLICK_SOUND_CHANGE_EVENT));
}

/** Subscribe to preference changes (same tab + other tabs via `storage`). */
export function subscribeClickSoundPreference(
  onStoreChange: () => void,
): () => void {
  if (typeof window === 'undefined') return () => {};
  const run = () => onStoreChange();
  window.addEventListener('storage', run);
  window.addEventListener(CLICK_SOUND_CHANGE_EVENT, run);
  return () => {
    window.removeEventListener('storage', run);
    window.removeEventListener(CLICK_SOUND_CHANGE_EVENT, run);
  };
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).webkitAudioContext;
  if (!Ctor) return null;

  // Reuse one context so rapid clicks don't stack hundreds of instances.
  type WindowWithCtx = Window & { __clickSoundCtx?: AudioContext };
  const w = window as WindowWithCtx;
  let ctx = w.__clickSoundCtx;
  if (!ctx || ctx.state === "closed") {
    ctx = new Ctor() as AudioContext;
    w.__clickSoundCtx = ctx;
  }
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => {});
  }
  return ctx;
}

/** Short soft “pop” / UI chirp — distinct from a square-wave tick. */
export function playClickSound() {
  if (!isClickSoundEnabled()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const t0 = ctx.currentTime;
    const dur = 0.055;

    osc.frequency.setValueAtTime(880, t0);
    osc.frequency.exponentialRampToValueAtTime(320, t0 + dur * 0.85);

    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(0.12, t0 + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + dur + 0.01);
  } catch {
    // Best-effort only: never block UI.
  }
}
