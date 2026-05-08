import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const GLOBAL_COUNTER_KEY = "global";

export const getCounter = query({
  args: {},
  handler: async (ctx) => {
    const doc = await ctx.db
      .query("counter")
      .withIndex("by_key", (q) => q.eq("key", GLOBAL_COUNTER_KEY))
      .unique();
    return { value: doc?.value ?? 0 };
  },
});

export const incrementCounter = mutation({
  args: {
    country: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const existing = await ctx.db
      .query("counter")
      .withIndex("by_key", (q) => q.eq("key", GLOBAL_COUNTER_KEY))
      .unique();

    const nextValue = (existing?.value ?? 0) + 1;

    if (existing) {
      await ctx.db.patch(existing._id, { value: nextValue, updatedAt: now });
    } else {
      await ctx.db.insert("counter", {
        key: GLOBAL_COUNTER_KEY,
        value: nextValue,
        updatedAt: now,
      });
    }

    if (args.country) {
      const country = args.country.trim().slice(0, 8).toUpperCase() || "??";
      const countryDoc = await ctx.db
        .query("countries")
        .withIndex("by_country", (q) => q.eq("country", country))
        .unique();
      if (countryDoc) {
        await ctx.db.patch(countryDoc._id, {
          count: countryDoc.count + 1,
          updatedAt: now,
        });
      } else {
        await ctx.db.insert("countries", {
          country,
          count: 1,
          updatedAt: now,
        });
      }
    }

    return { value: nextValue };
  },
});

