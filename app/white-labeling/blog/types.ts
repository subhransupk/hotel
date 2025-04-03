export interface BlogPost {
  id: string;
  title: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  author: string;
  authorDesignation: string;
  excerpt?: string;
}

export interface BlogPostFormData {
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string;
  author: string;
  authorDesignation: string;
} 