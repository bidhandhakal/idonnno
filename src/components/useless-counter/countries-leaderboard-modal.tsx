'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { CountryStat } from './types';
import { countryCodeToDisplayName } from './lib/country-display-name';
import { CountryFlag } from './country-flag';

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
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
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
        className="relative flex max-h-[min(85vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="shrink-0 border-b border-slate-200 p-5 pb-4">
          <div
            id="countries-leaderboard-title"
            className="text-xs tracking-widest text-slate-600"
          >
            GLOBAL LEADERBOARD
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            All countries by presses
          </div>
          <div className="mt-1 text-sm text-slate-600">
            {countries.length.toLocaleString()}{' '}
            {countries.length === 1 ? 'country' : 'countries'} with data
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-3">
          <ul className="space-y-1">
            {countries.map((c, i) => {
              const name = countryCodeToDisplayName(c.country);
              return (
                <li
                  key={c.country}
                  className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-slate-900 hover:bg-slate-100"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="w-6 shrink-0 tabular-nums text-xs text-slate-500">
                      {i + 1}
                    </span>
                    <CountryFlag countryCode={c.country} className="h-3.5 w-[1.1rem]" />
                    <span className="min-w-0 truncate font-medium">{name}</span>
                  </div>
                  <span className="shrink-0 tabular-nums text-slate-600">
                    {c.count.toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="shrink-0 border-t border-slate-200 p-4">
          <Button variant="outline" className="w-full" onClick={onClose}>
            close
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
