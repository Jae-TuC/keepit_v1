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
    extension: v.string(),
    size: v.number(),
    type: v.union(
      v.literal("document"),
      v.literal("media"),
      v.literal("images"),
      v.literal("other")
    ),
    folder: v.id("folders"),
    url: v.string(),
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const fileUrl = await ctx.storage.getUrl(args.storageId);

    await ctx.db.insert("files", {
      name: args.name,
      extension: args.extension,
      size: args.size,
      type: args.type,
      folder: args.folder,
      url: fileUrl || "",
      storageId: args.storageId,
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
