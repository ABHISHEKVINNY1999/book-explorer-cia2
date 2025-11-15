
export interface Author {
  key: string;
  name: string;
}

export interface Book {
  key: string;
  title: string;
  authors: Author[];
  cover_id?: number;
  first_publish_year: number;
}

export interface ApiResponse {
  works: Book[];
}
