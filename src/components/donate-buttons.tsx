import { Coffee } from 'lucide-react';
import { supportLinks } from '@/lib/support-links';

const donateButtonClass =
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50';

function KoFiIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- external brand asset
    <img
      src="https://storage.ko-fi.com/cdn/cup-border.png"
      alt=""
      className={className}
      width={14}
      height={14}
    />
  );
}

export function DonateButtons() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Support the creator"
    >
      <a
        href={supportLinks.kofi}
        target="_blank"
        rel="noopener noreferrer"
        className={`${donateButtonClass} border-[#ff5e5b]/35 bg-[#ff5e5b]/10 text-[#d94a47] hover:border-[#ff5e5b]/55 hover:bg-[#ff5e5b]/18`}
      >
        <KoFiIcon className="size-3.5" />
        Ko-fi
      </a>
      <a
        href={supportLinks.buyMeACoffee}
        target="_blank"
        rel="noopener noreferrer"
        className={`${donateButtonClass} border-[#e6c200]/50 bg-[#ffdd00]/25 text-[#5c4a00] hover:border-[#d4b000]/70 hover:bg-[#ffdd00]/40`}
      >
        <Coffee className="size-3.5" strokeWidth={2.25} />
        Buy me a coffee
      </a>
    </div>
  );
}
