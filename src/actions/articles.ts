"use server";

import dbConnect from "@/lib/mongodb";
import Article from "@/models/article";

type GetArticlesArgs = {
  query: any;
};

export async function getArticles({ query }: GetArticlesArgs) {
  await dbConnect();

  try {
    const result = await Article.aggregate<Article>()
      .search({
        index: "storm-articles",
        text: {
          query,
          path: {
            wildcard: "*",
          },
        },
      })
      .limit(100);

    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const articles = result.map((doc) => JSON.parse(JSON.stringify(doc)));

    return articles;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve articles");
  }
}
