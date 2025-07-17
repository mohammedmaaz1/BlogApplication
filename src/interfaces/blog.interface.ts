export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
  snippet: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  author: string;
  image?: string;
  tags: string[];
}