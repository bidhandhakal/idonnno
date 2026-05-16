'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { useAnimationControls } from 'framer-motion';
import { api } from '../../../convex/_generated/api';
import { CounterHeader } from './counter-header';
import { CounterHero } from './counter-hero';

import { DonateButtons } from '@/components/donate-buttons';
import { PressButton } from './press-button';
import { CountriesLeaderboardModal } from './countries-leaderboard-modal';
import { TopCountriesPanel } from './top-countries-panel';
import type { ConfettiPiece, CountryStat } from './types';
import { clampCountry } from './lib/country';
import { getOrCreateSessionId } from './lib/session';
import { readTodayPresses, writeTodayPresses } from './lib/today-presses';

const TOP_COUNTRIES_PREVIEW = 5;
const COUNTRIES_QUERY_LIMIT = 500;

export function UselessCounterClient({
  initialCountry,
}: {
  initialCountry: string;
}) {
  const country = useMemo(() => clampCountry(initialCountry), [initialCountry]);
  const countryForBackend = country;

  const counter = useQuery(api.counter.getCounter);
  const online = useQuery(api.presence.getOnlineCount);
  const topCountries = useQuery(api.countries.getTopCountries, {
    limit: COUNTRIES_QUERY_LIMIT,
  });

  const increment = useMutation(api.counter.incrementCounter);
  const heartbeat = useMutation(api.presence.heartbeat);

  const [pendingPresses, setPendingPresses] = useState(0);
  const [todayPresses, setTodayPresses] = useState(0);

  const mountedRef = useRef(false);
  const serverCount = counter?.value;
  const hasServerCount = typeof serverCount === 'number';

  useEffect(() => {
    const { count } = readTodayPresses();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayPresses(count);
    mountedRef.current = true;
  }, []);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    let cancelled = false;

    const send = async () => {
      try {
        if (cancelled) return;
        await heartbeat({ sessionId, country: countryForBackend });
      } catch {
        // best-effort presence
      }
    };

    void send();
    const t = window.setInterval(send, 12_000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, [heartbeat, countryForBackend]);

  const displayedCount = (serverCount ?? 0) + pendingPresses;

  const [milestoneOpen, setMilestoneOpen] = useState(false);
  const [milestoneValue, setMilestoneValue] = useState<number | null>(null);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[] | null>(
    null
  );
  const lastMilestoneSeenRef = useRef<number>(0);
  const milestonePrimedRef = useRef(false);

  useEffect(() => {}, []);
  const controls = useAnimationControls();

  const onPress = async () => {
    setPendingPresses((p) => p + 1);

    const today = readTodayPresses();
    const nextLocal = today.count + 1;
    writeTodayPresses(today.day, nextLocal);
    setTodayPresses(nextLocal);

    void controls.start({
      scale: [1, 0.96, 1],
      rotate: [0, -1.4, 1.4, -0.8, 0],
      transition: { duration: 0.18, ease: 'easeOut' },
    });

    try {
      await increment({ country: countryForBackend });
      setPendingPresses((p) => Math.max(0, p - 1));
    } catch {
      setPendingPresses((p) => Math.max(0, p - 1));
    }
  };

  const countries: CountryStat[] = (topCountries ?? []).map((c) => ({
    country: c.country,
    count: c.count,
  }));
  const countriesPreview = countries.slice(0, TOP_COUNTRIES_PREVIEW);

  const [countriesModalOpen, setCountriesModalOpen] = useState(false);

  return (
    <main className="relative flex flex-1 justify-center bg-slate-50 px-3 text-slate-900 select-none sm:px-5 lg:px-6">
      <CountriesLeaderboardModal
        open={countriesModalOpen}
        countries={countries}
        onClose={() => setCountriesModalOpen(false)}
      />

      <div className="grid w-full max-w-[1260px] grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,640px)_320px] lg:gap-0">
        <aside className="hidden lg:block" aria-hidden />

        <section className="min-w-0 border-slate-200 px-3 py-4 sm:px-5 lg:border-x">
          <CounterHeader country={country} onlineCount={online?.count ?? 0} />
          <CounterHero
            hasServerCount={hasServerCount}
            displayedCount={displayedCount}
            todayPresses={todayPresses}
          />
          <PressButton controls={controls} onPress={onPress} />

          <div className="mt-8 space-y-4 lg:hidden">
            <TopCountriesPanel
              previewCountries={countriesPreview}
              totalWithData={countries.length}
              onOpenFull={() => setCountriesModalOpen(true)}
            />
            <DonateButtons />
          </div>
        </section>

        <aside className="hidden lg:block">
          <div className="sticky top-4 ml-4 space-y-4">
            <TopCountriesPanel
              previewCountries={countriesPreview}
              totalWithData={countries.length}
              onOpenFull={() => setCountriesModalOpen(true)}
            />
            <DonateButtons />
          </div>
        </aside>
      </div>
    </main>
  );
}
