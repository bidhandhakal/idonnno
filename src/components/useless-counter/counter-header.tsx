import { SoundToggle } from '@/components/ui/sound-toggle';
import { countryCodeToDisplayName } from './lib/country-display-name';
import { CountryFlag } from './country-flag';

export function CounterHeader({
  country,
  onlineCount,
}: {
  country: string;
  onlineCount: number;
}) {
  const countryName = countryCodeToDisplayName(country);

  return (
    <div className="-mx-6 mb-5 flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 px-6 pb-4 sm:-mx-5 sm:mb-6 sm:px-5">
      <div>
        <div className="inline-flex items-center gap-1 text-sm text-slate-700">
          <span className="text-slate-500">country:</span>{' '}
          <span className="inline-flex max-w-[min(100%,19rem)] items-center gap-1.5 font-medium text-slate-900 sm:max-w-none">
            <CountryFlag countryCode={country} className="h-3.5 w-[1.1rem]" />
            <span className="min-w-0 truncate">{countryName}</span>
          </span>
        </div>
      </div>

      <div className="ml-auto flex flex-col items-end gap-2 text-right text-xs text-slate-600">
        <SoundToggle />
        <div className="inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-emerald-500"
          />
          <span>
            <span className="text-slate-900">
              {onlineCount.toLocaleString()}
            </span>{' '}
            people online right now
          </span>
        </div>
      </div>
    </div>
  );
}
