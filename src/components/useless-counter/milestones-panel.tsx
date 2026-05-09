import { MILESTONES } from './constants';

export function MilestonesPanel({
  displayedCount,
}: {
  displayedCount: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs tracking-widest text-white/60">MILESTONES</div>
      <div className="mt-3 space-y-2 text-sm text-white/70">
        {MILESTONES.map((m) => {
          const done = displayedCount >= m;
          return (
            <div key={m} className="flex items-center justify-between">
              <div className={done ? 'text-white/85' : 'text-white/50'}>
                {m.toLocaleString()}
              </div>
              <div className="text-xs">
                {done ? 'achieved (unfortunately)' : 'pending (for now)'}
              </div>
            </div>
          );
        })}
        <div className="pt-3 text-xs text-white/50">
          tip: spam clicking is morally neutral
        </div>
      </div>
    </div>
  );
}
