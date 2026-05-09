'use client';

import { useRef } from 'react';
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
  const enterLockRef = useRef(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div animate={controls} className="select-none">
        <Button
          onClick={onPress}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            if (event.repeat || enterLockRef.current) {
              event.preventDefault();
              return;
            }

            enterLockRef.current = true;
            event.preventDefault();
            void onPress();
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              enterLockRef.current = false;
            }
          }}
          className={cn(
            'h-[44px] w-[114px] rounded-[10px] px-0 text-[16px] leading-none font-normal tracking-normal',
            'border border-[#707070] bg-[#e5e5e5] text-black hover:bg-[#e5e5e5]',
            'shadow-none',
            'touch-manipulation'
          )}
        >
          Click me
        </Button>
      </motion.div>
      <p className="mt-2 text-center text-xs text-slate-500">
        Click, enter, or space to press
      </p>
    </div>
  );
}
