export interface Idea {
  id: string;
  name: string;
  description: string;
  links: string[];
  attachments: File[];
  mockImages?: string[];
  isAnonymous: boolean;
  authorName: string;
  votes: number;
  hasVoted: boolean;
  createdAt: Date;
  tags?: string[];
}