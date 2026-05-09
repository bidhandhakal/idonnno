import { SoundToggle } from '@/components/ui/sound-toggle';
import {
  countryCodeToDisplayName,
  shouldShowCountryCodeSubtitle,
} from './lib/country-display-name';
import { countryCodeToFlagEmoji } from './lib/flag-emoji';

export function CounterHeader({
  country,
  onlineCount,
}: {
  country: string;
  onlineCount: number;
}) {
  const countryName = countryCodeToDisplayName(country);
  const showCode = shouldShowCountryCodeSubtitle(countryName, country);

  return (
    <div className="mb-8 flex items-start justify-between gap-4">
      <div>
        <div className="text-xs tracking-widest text-white/60">
          USELESS COUNTER
        </div>
        <div className="mt-2 text-sm text-white/70">
          humanity is pressing this button
          <span className="text-white/40"> · </span>
          <span className="text-white/60">country:</span>{' '}
          <span className="inline-flex max-w-[min(100%,18rem)] items-center gap-1.5 font-medium text-white sm:max-w-none">
            <span className="text-lg leading-none" aria-hidden>
              {countryCodeToFlagEmoji(country)}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate">{countryName}</span>
              {showCode && (
                <span className="block truncate text-xs font-normal text-white/50 tabular-nums">
                  {country}
                </span>
              )}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 text-right text-xs text-white/60">
        <SoundToggle />
        <div>
          <span className="text-white/70">{onlineCount.toLocaleString()}</span>{' '}
          humans online right now
        </div>
      </div>
    </div>
  );
}
