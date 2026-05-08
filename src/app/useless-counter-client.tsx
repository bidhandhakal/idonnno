"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MILESTONES = [10, 100, 1000, 1_000_000] as const;

function clampCountry(raw: string | null | undefined) {
  const c = (raw ?? "").trim().toUpperCase();
  if (!c) return "LOCAL";
  if (c === "??") return "LOCAL";
  return c.slice(0, 8);
}

function getTodayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getOrCreateSessionId() {
  const key = "uselessCounter:sessionId";
  const existing = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (existing) return existing;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(key, id);
  return id;
}

function readTodayPresses() {
  const key = "uselessCounter:presses";
  const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  if (!raw) return { day: getTodayKey(), count: 0 };
  try {
    const parsed = JSON.parse(raw) as { day: string; count: number };
    if (parsed.day !== getTodayKey()) return { day: getTodayKey(), count: 0 };
    return { day: parsed.day, count: Number(parsed.count) || 0 };
  } catch {
    return { day: getTodayKey(), count: 0 };
  }
}

function writeTodayPresses(day: string, count: number) {
  const key = "uselessCounter:presses";
  localStorage.setItem(key, JSON.stringify({ day, count }));
}

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  rotate: number;
  color: string;
  drift: number;
  duration: number;
};

function makeConfettiPieces(): ConfettiPiece[] {
  const colors = ["#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#fb7185"];
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.2,
    rotate: Math.random() * 360,
    color: colors[i % colors.length],
    drift: (Math.random() - 0.5) * 40,
    duration: 0.9 + Math.random() * 0.5,
  }));
}

function ConfettiBurst({ pieces }: { pieces: ConfettiPiece[] | null }) {
  if (!pieces) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: -40,
            x: 0,
            rotate: p.rotate,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [ -40, 120, 520 ],
            x: [0, p.drift, p.drift * 1.6],
            rotate: p.rotate + 240,
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: "easeOut",
          }}
          className="absolute top-0 h-3 w-2 rounded-sm"
          style={{ left: `${p.left}%`, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

function MilestoneModal({
  open,
  milestone,
  onClose,
}: {
  open: boolean;
  milestone: number | null;
  onClose: () => void;
}) {
  if (!open || milestone === null) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl"
      >
        <div className="text-xs tracking-widest text-white/60">
          FULLY OFFICIAL GLOBAL EVENT
        </div>
        <div className="mt-2 text-3xl font-semibold leading-tight">
          Milestone reached:{" "}
          <span className="text-white">{milestone.toLocaleString()}</span>
        </div>
        <div className="mt-2 text-sm text-white/70">
          Humanity did this. You were here. This changes nothing.
        </div>
        <div className="mt-5 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            ok, continue the pressing
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export function UselessCounterClient({
  initialCountry,
}: {
  initialCountry: string;
}) {
  const country = useMemo(() => clampCountry(initialCountry), [initialCountry]);
  const countryForBackend = country;

  const counter = useQuery(api.counter.getCounter);
  const online = useQuery(api.presence.getOnlineCount);
  const topCountries = useQuery(api.countries.getTopCountries, { limit: 8 });

  const increment = useMutation(api.counter.incrementCounter);
  const heartbeat = useMutation(api.presence.heartbeat);

  const [pendingPresses, setPendingPresses] = useState(0);
  const [todayPresses, setTodayPresses] = useState(0);

  const mountedRef = useRef(false);
  const serverCount = counter?.value;
  const hasServerCount = typeof serverCount === "number";

  // Local daily counter (resets automatically by date key).
  useEffect(() => {
    const { count } = readTodayPresses();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayPresses(count);
    mountedRef.current = true;
  }, []);

  // Presence heartbeat.
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

  // Milestones.
  const [milestoneOpen, setMilestoneOpen] = useState(false);
  const [milestoneValue, setMilestoneValue] = useState<number | null>(null);
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[] | null>(
    null,
  );
  const lastMilestoneSeenRef = useRef<number>(0);
  const milestonePrimedRef = useRef(false);

  // Prime milestone baseline from server count once it loads.
  useEffect(() => {
    if (milestonePrimedRef.current) return;
    if (!hasServerCount) return;
    const reached = [...MILESTONES]
      .reverse()
      .find((m) => (serverCount ?? 0) >= m);
    lastMilestoneSeenRef.current = reached ?? 0;
    milestonePrimedRef.current = true;
  }, [hasServerCount, serverCount]);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (!milestonePrimedRef.current) return;
    for (const m of MILESTONES) {
      if (displayedCount >= m && lastMilestoneSeenRef.current < m) {
        lastMilestoneSeenRef.current = m;
        setMilestoneValue(m);
        setMilestoneOpen(true);
        setConfettiPieces(makeConfettiPieces());
        window.setTimeout(() => setConfettiPieces(null), 1200);
        break;
      }
    }
  }, [displayedCount]);

  const controls = useAnimationControls();

  const onPress = async () => {
    setPendingPresses((p) => p + 1);

    // local daily counter
    const today = readTodayPresses();
    const nextLocal = today.count + 1;
    writeTodayPresses(today.day, nextLocal);
    setTodayPresses(nextLocal);

    void controls.start({
      scale: [1, 0.96, 1],
      rotate: [0, -1.4, 1.4, -0.8, 0],
      transition: { duration: 0.18, ease: "easeOut" },
    });

    try {
      // Fire-and-forget feel, but we still reconcile the pending counter
      // per-request so the UI never "jumps backwards" on server updates.
      await increment({ country: countryForBackend });
      setPendingPresses((p) => Math.max(0, p - 1));
    } catch {
      setPendingPresses((p) => Math.max(0, p - 1));
    }
  };

  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-10 select-none">
      <ConfettiBurst pieces={confettiPieces} />
      <MilestoneModal
        open={milestoneOpen}
        milestone={milestoneValue}
        onClose={() => setMilestoneOpen(false)}
      />

      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest text-white/60">
              USELESS COUNTER
            </div>
            <div className="mt-2 text-sm text-white/70">
              humanity is pressing this button
              <span className="text-white/40"> · </span>
              <span className="text-white/60">country:</span>{" "}
              <span className="font-medium text-white">{country}</span>
            </div>
          </div>

          <div className="text-right text-xs text-white/60">
            <div>
              <span className="text-white/70">
                {(online?.count ?? 0).toLocaleString()}
              </span>{" "}
              humans online right now
            </div>
            <div className="mt-1">
              you pressed{" "}
              <span className="text-white/80 font-medium">{todayPresses}</span>{" "}
              times today
            </div>
          </div>
        </div>

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
                you are press{" "}
                <span className="text-white/80 font-medium">
                  #{displayedCount.toLocaleString()}
                </span>
              </>
            ) : (
              "connecting to the global button…"
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <motion.div animate={controls} className="select-none">
            <Button
              onClick={onPress}
              className={cn(
                "h-28 w-[min(520px,92vw)] rounded-3xl text-2xl font-semibold",
                "bg-white text-neutral-950 hover:bg-white/90",
                "shadow-[0_30px_80px_-40px_rgba(255,255,255,0.25)]",
                "touch-manipulation",
              )}
            >
              PRESS
            </Button>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs tracking-widest text-white/60">
              TOP COUNTRIES
            </div>
            <div className="mt-3 space-y-2">
              {(topCountries ?? []).length === 0 ? (
                <div className="text-sm text-white/50">
                  no nations have admitted guilt yet
                </div>
              ) : (
                (topCountries ?? []).map((c) => (
                  <div
                    key={c.country}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="font-medium text-white/85">{c.country}</div>
                    <div className="tabular-nums text-white/60">
                      {c.count.toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs tracking-widest text-white/60">
              MILESTONES
            </div>
            <div className="mt-3 space-y-2 text-sm text-white/70">
              {MILESTONES.map((m) => {
                const done = displayedCount >= m;
                return (
                  <div key={m} className="flex items-center justify-between">
                    <div className={done ? "text-white/85" : "text-white/50"}>
                      {m.toLocaleString()}
                    </div>
                    <div className="text-xs">
                      {done ? "achieved (unfortunately)" : "pending (for now)"}
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 text-xs text-white/50">
                tip: spam clicking is morally neutral
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/40">
          this app is pointless. that’s why it’s powerful.
        </div>
      </div>
    </main>
  );
}

