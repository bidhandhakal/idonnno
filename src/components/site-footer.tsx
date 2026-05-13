export function SiteFooter() {
  return (
    <footer className="shrink-0 border-t border-slate-200/80 bg-slate-50 py-3 text-xs text-slate-500">
      <div className="flex justify-center px-3 sm:px-5 lg:px-6">
        <div className="grid w-full max-w-[1260px] grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,640px)_320px] lg:gap-0">
          <div className="hidden lg:block" aria-hidden />
          <div className="text-center">
            <a
              href="https://x.com/bidhaan_daju"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 underline-offset-2 transition-colors hover:text-slate-900 hover:underline"
            >
              by @bidhaan_daju
            </a>
          </div>
          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
