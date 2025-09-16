export const useViewTracking = () => {
  const VIEWED_IDEAS_KEY = 'viewed_ideas_session';

  const getViewedIdeas = (): Set<string> => {
    if (process.server) return new Set();

    try {
      const stored = sessionStorage.getItem(VIEWED_IDEAS_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  };

  const hasViewedIdea = (ideaId: string): boolean => {
    if (process.server) return false;
    const viewedIdeas = getViewedIdeas();
    return viewedIdeas.has(ideaId);
  };

  const markAsViewed = (ideaId: string): void => {
    if (process.server) return;

    const viewedIdeas = getViewedIdeas();
    viewedIdeas.add(ideaId);

    try {
      sessionStorage.setItem(VIEWED_IDEAS_KEY, JSON.stringify(Array.from(viewedIdeas)));
    } catch (e) {
      console.error('Failed to save viewed ideas to session storage:', e);
    }
  };

  const trackView = async (ideaId: string): Promise<boolean> => {
    if (process.server) return false;

    // Check if already viewed in this session
    if (hasViewedIdea(ideaId)) {
      return false;
    }

    // Increment view count on server
    try {
      await $fetch(`/api/ideas/${ideaId}/views`, { method: 'POST' });
      markAsViewed(ideaId);
      return true;
    } catch (error) {
      console.error('Failed to track view:', error);
      return false;
    }
  };

  return {
    hasViewedIdea,
    markAsViewed,
    trackView
  };
};