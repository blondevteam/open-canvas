"use server";

import mongoose, { Schema, models } from "mongoose";

const Source = new Schema<Article["sources"]>({
  url_to_unified_index: {
    type: Map,
    of: Number,
    required: true,
  },
  url_to_info: {
    type: Map,
    of: {
      url: String,
      description: String,
      snippets: [String],
      title: String,
      meta: {
        query: String,
      },
      citation_uuid: Number,
    },
    required: true,
  },
});

const articleSchema = new Schema<Article>(
  {
    title: {
      type: String,
      required: true,
    },
    sources: {
      type: Source,
    },
    created_at: {
      type: Date,
      required: true,
    },
    article: {
      type: String,
      required: false,
    },
  }
  // { timestamps: true }
);

const articles =
  models?.Article ||
  mongoose.model<Article>("Article", articleSchema, "articles");
export default articles;
