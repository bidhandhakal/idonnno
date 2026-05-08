import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const ONLINE_WINDOW_MS = 30_000;

export const heartbeat = mutation({
  args: {
    sessionId: v.string(),
    country: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const sessionId = args.sessionId.trim().slice(0, 80);
    if (!sessionId) return null;

    const existing = await ctx.db
      .query("presence")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .unique();

    const country =
      args.country?.trim().slice(0, 8).toUpperCase() || null;

    if (existing) {
      await ctx.db.patch(existing._id, { lastSeen: now, country });
    } else {
      await ctx.db.insert("presence", { sessionId, lastSeen: now, country });
    }
    return null;
  },
});

export const getOnlineCount = query({
  args: {},
  handler: async (ctx) => {
    const cutoff = Date.now() - ONLINE_WINDOW_MS;
    let count = 0;

    for await (const row of ctx.db
      .query("presence")
      .withIndex("by_lastSeen")
      .order("desc")) {
      if (row.lastSeen < cutoff) break;
      count += 1;
      // Hard cap to keep this query bounded under abuse.
      if (count >= 50_000) break;
    }

    return { count };
  },
});

