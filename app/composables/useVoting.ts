export const useVoting = () => {
  const { getFingerprint, initFingerprint } = useFingerprint();

  // Store voted ideas
  const votedIdeas = useState<number[]>('votedIdeas', () => []);
  const isLoadingVotes = useState<boolean>('isLoadingVotes', () => false);
  const totalVotesCount = useState<number>('totalVotesCount', () => 0);

  // Initialize fingerprint and load user's votes
  const initializeVoting = async () => {
    if (import.meta.server) return;

    try {
      isLoadingVotes.value = true;

      // Get fingerprint
      const fingerprint = await initFingerprint();
      if (!fingerprint) return;

      // Fetch user's voted ideas
      const votedIds = await $fetch('/api/votes/fingerprint', {
        method: 'POST',
        body: { fingerprint }
      });

      votedIdeas.value = votedIds || [];
    } catch (error) {
      console.error('Failed to initialize voting:', error);
      votedIdeas.value = [];
    } finally {
      isLoadingVotes.value = false;
    }
  };

  // Vote for an idea
  const voteForIdea = async (ideaId: number): Promise<boolean> => {
    try {
      const fingerprint = await getFingerprint();
      if (!fingerprint) {
        console.error('No fingerprint available');
        return false;
      }

      const result = await $fetch(`/api/ideas/${ideaId}/vote`, {
        method: 'POST',
        body: { fingerprint }
      });

      // Update local state
      if (result.voted) {
        // Add to voted list
        if (!votedIdeas.value.includes(ideaId)) {
          votedIdeas.value.push(ideaId);
        }
        // Increment global vote count
        totalVotesCount.value++;
      } else {
        // Remove from voted list
        votedIdeas.value = votedIdeas.value.filter(id => id !== ideaId);
        // Decrement global vote count
        totalVotesCount.value = Math.max(0, totalVotesCount.value - 1);
      }

      return result.voted;
    } catch (error) {
      console.error('Failed to vote:', error);
      return false;
    }
  };

  // Check if user has voted for an idea
  const hasVoted = (ideaId: number): boolean => {
    return votedIdeas.value.includes(ideaId);
  };

  const setTotalVotesCount = (count: number) => {
    totalVotesCount.value = count;
  };

  return {
    votedIdeas: readonly(votedIdeas),
    isLoadingVotes: readonly(isLoadingVotes),
    totalVotesCount: readonly(totalVotesCount),
    initializeVoting,
    voteForIdea,
    hasVoted,
    setTotalVotesCount
  };
};