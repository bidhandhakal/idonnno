import { Coffee } from 'lucide-react';
import { supportLinks } from '@/lib/support-links';

const linkClass =
  'flex w-full items-center gap-2.5 rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2';

function KoFiIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- external brand asset
    <img
      src="https://storage.ko-fi.com/cdn/cup-border.png"
      alt=""
      className={className}
      width={16}
      height={16}
    />
  );
}

export function DonateButtons() {
  return (
    <div
      className="w-full rounded-xl border border-slate-200 bg-white p-4"
      aria-labelledby="support-heading"
    >
      <p
        id="support-heading"
        className="text-xs tracking-widest text-slate-600"
      >
        SUPPORT
      </p>
      <p className="mt-2 text-sm leading-snug text-slate-600">
        Enjoying the counter? Buy us a coffee.
      </p>

      <div className="mt-3 space-y-2" role="group" aria-label="Donate options">
        <a
          href={supportLinks.kofi}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <KoFiIcon className="size-4 shrink-0" />
          <span>Ko-fi</span>
        </a>
        <a
          href={supportLinks.buyMeACoffee}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <Coffee className="size-4 shrink-0 text-slate-600" strokeWidth={2} />
          <span>Buy me a coffee</span>
        </a>
      </div>
    </div>
  );
}
