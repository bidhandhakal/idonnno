import type { CountryStat } from './types';
import { countryCodeToFlagEmoji } from './lib/flag-emoji';

export function TopCountriesPanel({ countries }: { countries: CountryStat[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs tracking-widest text-white/60">TOP COUNTRIES</div>
      <div className="mt-3 space-y-2">
        {countries.length === 0 ? (
          <div className="text-sm text-white/50">
            no nations have admitted guilt yet
          </div>
        ) : (
          countries.map((c) => (
            <div
              key={c.country}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 font-medium text-white/85">
                <span className="text-lg leading-none" aria-hidden>
                  {countryCodeToFlagEmoji(c.country)}
                </span>
                <span className="tabular-nums">{c.country}</span>
              </div>
              <div className="tabular-nums text-white/60">
                {c.count.toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
