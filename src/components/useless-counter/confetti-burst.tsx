'use client';

import { motion } from 'framer-motion';
import type { ConfettiPiece } from './types';

export function makeConfettiPieces(): ConfettiPiece[] {
  const colors = ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#fb7185'];
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.2,
    rotate: Math.random() * 360,
    color: colors[i % colors.length],
    drift: (Math.random() - 0.5) * 40,
    duration: 0.9 + Math.random() * 0.5,
  }));
}

export function ConfettiBurst({ pieces }: { pieces: ConfettiPiece[] | null }) {
  if (!pieces) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: -40,
            x: 0,
            rotate: p.rotate,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [-40, 120, 520],
            x: [0, p.drift, p.drift * 1.6],
            rotate: p.rotate + 240,
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: 'easeOut',
          }}
          className="absolute top-0 h-3 w-2 rounded-sm"
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}
