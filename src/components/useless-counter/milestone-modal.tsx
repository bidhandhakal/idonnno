'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function MilestoneModal({
  open,
  milestone,
  onClose,
}: {
  open: boolean;
  milestone: number | null;
  onClose: () => void;
}) {
  if (!open || milestone === null) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="relative mx-4 w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl"
      >
        <div className="text-xs tracking-widest text-white/60">
          FULLY OFFICIAL GLOBAL EVENT
        </div>
        <div className="mt-2 text-3xl font-semibold leading-tight">
          Milestone reached:{' '}
          <span className="text-white">{milestone.toLocaleString()}</span>
        </div>
        <div className="mt-2 text-sm text-white/70">
          Humanity did this. You were here. This changes nothing.
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            ok, continue the pressing
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
