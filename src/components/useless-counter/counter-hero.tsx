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
      <div className="text-[50px] leading-none font-semibold tracking-tight text-black sm:text-[72px] md:text-[92px]">
        {hasServerCount ? (
          displayedCount.toLocaleString()
        ) : (
          <span className="text-slate-500 tabular-nums">…</span>
        )}
      </div>
      <div className="mt-2 text-sm text-slate-600">
        {hasServerCount ? (
          <>
            your presses today:{' '}
            <span className="font-medium text-black tabular-nums">
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
