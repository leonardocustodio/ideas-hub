export interface DatabaseIdea {
  id: number;
  author: string;
  name: string;
  tagline: string;
  tags: string[] | null;
  description: string | null;
  links: string[] | null;
  icon: string | null;
  video: string | null;
  images: string[] | null;
  createdAt: string;
}