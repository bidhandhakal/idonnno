'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PressButton({
  controls,
  onPress,
}: {
  controls: ReturnType<typeof useAnimationControls>;
  onPress: () => void | Promise<void>;
}) {
  return (
    <div className="flex items-center justify-center">
      <motion.div animate={controls} className="select-none">
        <Button
          onClick={onPress}
          className={cn(
            'h-28 w-[min(520px,92vw)] rounded-3xl text-2xl font-semibold',
            'bg-white text-neutral-950 hover:bg-white/90',
            'shadow-[0_30px_80px_-40px_rgba(255,255,255,0.25)]',
            'touch-manipulation',
          )}
        >
          PRESS
        </Button>
      </motion.div>
    </div>
  );
}
