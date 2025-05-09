import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  folders: defineTable({
    name: v.string(),
    owner: v.string(),
    parentFolder: v.optional(v.id("folders")), // for nested folders
    createdAt: v.number(),
  }),
  files: defineTable({
    name: v.string(),
    extension: v.string(), // e.g., .pdf, .mp3
    size: v.number(), // file size in bytes
    type: v.union(
      v.literal("document"),
      v.literal("media"),
      v.literal("images"),
      v.literal("other")
    ),
    url: v.string(),
    storageId: v.string(),
    folder: v.id("folders"), // must belong to a folder
  }),
});
