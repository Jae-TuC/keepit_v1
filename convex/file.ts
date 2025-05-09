import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateFileUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const uploadFile = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("document"),
      v.literal("images"),
      v.literal("media"),
      v.literal("other")
    ),
    extension: v.string(),
    size: v.number(),
    url: v.string(),
    storageId: v.id("_storage"),
    folder: v.id("folders"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("files", {
      name: args.name,
      type: args.type,
      extension: args.extension,
      size: args.size,
      url: args.url,
      storageId: args.storageId,
      folder: args.folder,
    });
  },
});

export const getFiles = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("files").collect();
  },
});

export const getFilesByType = query({
  args: { type: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("type"), args.type))
      .collect();
  },
});

export const renameFile = mutation({
  args: { id: v.id("files"), name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { name: args.name });
  },
});

// we use this to get the file by id when we want to delete it and also to get the file by id when we want to share it
export const getFileById = query({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const deleteFile = mutation({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
