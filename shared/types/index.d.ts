// API Response type (used throughout the app)
export interface IdeaWithDetails {
  id: number;
  name: string;
  tagline: string;
  description: string | null;
  links: string[] | null;
  icon: string | null;
  video: string | null;
  createdAt: Date | string;
  author: string;
  tags: string[];
  images: string[];
  // Frontend-specific fields (added by client)
  votes?: number;
  hasVoted?: boolean;
}

// Alias for backward compatibility and clarity
export type Idea = IdeaWithDetails;

// Form submission type
export interface IdeaFormData {
  authorName: string;
  isAnonymous: boolean;
  name: string;
  tagline: string;
  tags: string;
  description: string;
  links: string;
  thumbnail: File | null;
  gallery: File[];
  videoLink: string;
}