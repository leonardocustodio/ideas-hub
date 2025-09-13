import type { Idea, IdeaFormData } from '~/types';

/**
 * Composable for managing ideas with SSR-compatible state management
 * Uses Pinia store with Nuxt v4 best practices
 */
export const useIdeas = () => {
  // Access the Pinia store
  const store = useIdeasStore();
  
  // SSR-compatible reactive state
  const ideas = computed(() => store.ideas);
  const loading = computed(() => store.loading);
  const totalIdeas = computed(() => store.totalIdeas);
  const recentIdeas = computed(() => store.recentIdeas);

  // Actions
  const addIdea = (formData: IdeaFormData) => {
    store.addIdea(formData);
  };

  const toggleVote = (ideaId: string) => {
    store.toggleVote(ideaId);
  };

  const setLoading = (isLoading: boolean) => {
    store.setLoading(isLoading);
  };

  const getIdeaById = (id: string): Idea | undefined => {
    return store.getIdeaById(id);
  };

  const getIdeasByTag = (tag: string): Idea[] => {
    return store.getIdeasByTag(tag);
  };

  const searchIdeas = (query: string): Idea[] => {
    return store.searchIdeas(query);
  };

  // Computed getters for common use cases
  const popularIdeas = computed(() => 
    store.ideas
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 10)
  );

  const ideasByAuthor = (authorName: string) => computed(() =>
    store.ideas.filter(idea => 
      idea.authorName.toLowerCase() === authorName.toLowerCase()
    )
  );

  const allTags = computed(() => {
    const tags = new Set<string>();
    store.ideas.forEach(idea => {
      idea.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  });

  return {
    // State
    ideas,
    loading,
    totalIdeas,
    recentIdeas,
    popularIdeas,
    allTags,
    
    // Actions
    addIdea,
    toggleVote,
    setLoading,
    getIdeaById,
    getIdeasByTag,
    searchIdeas,
    ideasByAuthor,
  };
};