import { PostSearchDocument } from './post-search-document.interface';

export interface PostSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchDocument;
    }>;
  };
}
