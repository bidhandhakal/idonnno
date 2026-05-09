'use client';

import { cn } from '@/lib/utils';

function toIso2(countryCode: string): string | null {
  const iso = countryCode.trim().toLowerCase().slice(0, 2);
  return /^[a-z]{2}$/.test(iso) ? iso : null;
}

export function CountryFlag({
  countryCode,
  className,
}: {
  countryCode: string;
  className?: string;
}) {
  const iso2 = toIso2(countryCode);
  if (!iso2 || iso2 === '??') {
    return <span className={cn('inline-flex text-base leading-none', className)}>🌍</span>;
  }

  return (
    <span
      className={cn('fi inline-block rounded-[2px] fi-' + iso2, className)}
      aria-hidden
    />
  );
}
