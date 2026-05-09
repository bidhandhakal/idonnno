import type { CountryStat } from './types';
import { countryCodeToFlagEmoji } from './lib/flag-emoji';

export function TopCountriesPanel({
  previewCountries,
  totalWithData,
  onOpenFull,
}: {
  previewCountries: CountryStat[];
  /** Total countries returned from the leaderboard query (for “view all” hint). */
  totalWithData: number;
  onOpenFull: () => void;
}) {
  const empty = previewCountries.length === 0;
  const showViewAllHint = !empty && totalWithData > previewCountries.length;

  return (
    <button
      type="button"
      disabled={empty}
      onClick={onOpenFull}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.07] disabled:cursor-default disabled:opacity-100 disabled:hover:border-white/10 disabled:hover:bg-white/5"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs tracking-widest text-white/60">
          TOP COUNTRIES
        </div>
        {!empty && (
          <span className="shrink-0 text-[0.65rem] font-medium tracking-wide text-white/45">
            tap for full list
          </span>
        )}
      </div>
      <div className="mt-3 space-y-2">
        {empty ? (
          <div className="text-sm text-white/50">
            no nations have admitted guilt yet
          </div>
        ) : (
          <>
            {previewCountries.map((c) => (
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
            ))}
            {showViewAllHint && (
              <div className="pt-1 text-xs text-white/40">
                + {(totalWithData - previewCountries.length).toLocaleString()}{' '}
                more in full list
              </div>
            )}
          </>
        )}
      </div>
    </button>
  );
}
