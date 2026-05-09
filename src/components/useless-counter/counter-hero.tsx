export function CounterHero({
  hasServerCount,
  displayedCount,
  todayPresses,
}: {
  hasServerCount: boolean;
  displayedCount: number;
  todayPresses: number;
}) {
  return (
    <div className="mb-6 text-center">
      <div className="text-[64px] leading-none font-semibold tracking-tight sm:text-[92px]">
        {hasServerCount ? (
          displayedCount.toLocaleString()
        ) : (
          <span className="text-white/50 tabular-nums">…</span>
        )}
      </div>
      <div className="mt-2 text-sm text-white/60">
        {hasServerCount ? (
          <>
            your presses today:{' '}
            <span className="text-white/80 font-medium tabular-nums">
              {todayPresses.toLocaleString()}
            </span>
          </>
        ) : (
          'connecting to the global button…'
        )}
      </div>
    </div>
  );
}
