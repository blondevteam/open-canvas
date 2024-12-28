declare interface Article {
  id: string;
  title: string;
  created_at: Date;
  sources?: {
    url_to_unified_index: Record<string, number>;
    url_to_info: Record<
      string,
      {
        url: string;
        description: string;
        snippets: string[];
        title: string;
        meta: {
          query: string;
        };
        citation_uuid: number;
      }
    >;
  };
  article: string;
}
