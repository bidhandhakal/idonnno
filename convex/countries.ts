import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateCountry = mutation({
  args: {
    country: v.string(),
    by: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const country = args.country.trim().slice(0, 8).toUpperCase() || "??";
    const by = Math.max(1, Math.floor(args.by));

    const existing = await ctx.db
      .query("countries")
      .withIndex("by_country", (q) => q.eq("country", country))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        count: existing.count + by,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("countries", { country, count: by, updatedAt: now });
    }
    return null;
  },
});

export const getTopCountries = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(20, Math.floor(args.limit)));
    const rows = await ctx.db
      .query("countries")
      .withIndex("by_count_and_country")
      .order("desc")
      .take(limit);
    return rows.map((r) => ({ country: r.country, count: r.count }));
  },
});

