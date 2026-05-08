import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Single document table. We store one row with key = "global".
  counter: defineTable({
    key: v.string(),
    value: v.number(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  // Per-country counters, e.g. "US" -> 1234.
  countries: defineTable({
    country: v.string(),
    count: v.number(),
    updatedAt: v.number(),
  })
    .index("by_country", ["country"])
    .index("by_count_and_country", ["count", "country"]),

  // High-churn presence: one doc per sessionId, updated via heartbeat.
  presence: defineTable({
    sessionId: v.string(),
    lastSeen: v.number(),
    country: v.union(v.string(), v.null()),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_lastSeen", ["lastSeen"]),
});

