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
    () => true,
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
      className="h-8 gap-2 rounded-lg border-white/20 bg-neutral-950 px-3 text-white hover:bg-neutral-900 hover:text-white"
    >
      {on ? (
        <Volume2 className="size-4 text-white" aria-hidden />
      ) : (
        <VolumeX className="size-4 text-white" aria-hidden />
      )}
      <span className="text-xs font-medium tracking-tight">
        {on ? 'sound on' : 'sound off'}
      </span>
    </Button>
  );
}
