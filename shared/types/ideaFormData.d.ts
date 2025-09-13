export interface IdeaFormData {
  authorName: string;
  name: string;
  tagline: string;
  tags: string;
  description: string;
  links: string;
  thumbnail: File | null;
  gallery: File[];
  videoLink: string;
}