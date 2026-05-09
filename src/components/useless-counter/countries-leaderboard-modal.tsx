'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { CountryStat } from './types';
import {
  countryCodeToDisplayName,
  shouldShowCountryCodeSubtitle,
} from './lib/country-display-name';
import { countryCodeToFlagEmoji } from './lib/flag-emoji';

export function CountriesLeaderboardModal({
  open,
  countries,
  onClose,
}: {
  open: boolean;
  countries: CountryStat[];
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="countries-leaderboard-title"
        className="relative flex max-h-[min(85vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
      >
        <div className="shrink-0 border-b border-white/10 p-5 pb-4">
          <div
            id="countries-leaderboard-title"
            className="text-xs tracking-widest text-white/60"
          >
            GLOBAL LEADERBOARD
          </div>
          <div className="mt-1 text-lg font-semibold text-white">
            All countries by presses
          </div>
          <div className="mt-1 text-sm text-white/55">
            {countries.length.toLocaleString()}{' '}
            {countries.length === 1 ? 'country' : 'countries'} with data
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-3">
          <ul className="space-y-1">
            {countries.map((c, i) => {
              const name = countryCodeToDisplayName(c.country);
              const showCode = shouldShowCountryCodeSubtitle(name, c.country);
              return (
                <li
                  key={c.country}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-white/85 hover:bg-white/5"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="w-6 shrink-0 tabular-nums text-xs text-white/45">
                      {i + 1}
                    </span>
                    <span className="text-lg leading-none" aria-hidden>
                      {countryCodeToFlagEmoji(c.country)}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block truncate font-medium">{name}</span>
                      {showCode && (
                        <span className="block truncate text-xs font-normal text-white/45 tabular-nums">
                          {c.country}
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="shrink-0 tabular-nums text-white/60">
                    {c.count.toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
