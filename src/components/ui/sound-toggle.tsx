'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  isClickSoundEnabled,
  setClickSoundEnabled,
  subscribeClickSoundPreference,
} from '@/lib/sounds';

export function SoundToggle() {
  const on = useSyncExternalStore(
    subscribeClickSoundPreference,
    isClickSoundEnabled,
    () => true
  );

  const toggle = useCallback(() => {
    setClickSoundEnabled(!isClickSoundEnabled());
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      clickSound={false}
      onClick={toggle}
      aria-pressed={on}
      className="h-8 gap-2 rounded-lg border-slate-300 bg-white px-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {on ? (
        <Volume2 className="size-4 text-slate-700" aria-hidden />
      ) : (
        <VolumeX className="size-4 text-slate-700" aria-hidden />
      )}
      <span className="text-xs font-medium tracking-tight">
        {on ? 'sound on' : 'sound off'}
      </span>
    </Button>
  );
}
