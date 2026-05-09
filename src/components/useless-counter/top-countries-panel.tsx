import type { CountryStat } from './types';
import { countryCodeToDisplayName } from './lib/country-display-name';
import { CountryFlag } from './country-flag';

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
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-default disabled:opacity-100 disabled:hover:border-slate-200 disabled:hover:bg-white"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs tracking-widest text-slate-600">
          TOP COUNTRIES
        </div>
        {!empty && (
          <span className="shrink-0 text-[0.65rem] font-medium tracking-wide text-slate-500">
            tap for full list
          </span>
        )}
      </div>
      <div className="mt-3 space-y-2">
        {empty ? (
          <div className="text-sm text-slate-500">
            no nations have admitted guilt yet
          </div>
        ) : (
          <>
            {previewCountries.map((c) => {
              const name = countryCodeToDisplayName(c.country);
              return (
                <div
                  key={c.country}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2 font-medium text-slate-900">
                    <CountryFlag
                      countryCode={c.country}
                      className="h-3.5 w-[1.1rem]"
                    />
                    <span className="min-w-0 truncate">{name}</span>
                  </div>
                  <div className="shrink-0 tabular-nums text-slate-600">
                    {c.count.toLocaleString()}
                  </div>
                </div>
              );
            })}
            {showViewAllHint && (
              <div className="pt-1 text-xs text-slate-500">
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
