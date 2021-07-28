import { useMutation, useQueryClient } from 'react-query';
import { useCallback } from 'react';
import { updateAnime } from '../../api/animeApi';
import { QUERY_KEY } from '../reactQueryKeys';

function useUpdateAnime() {
  const queryClient = useQueryClient();

  const update = useCallback(async anime => {
    const response = await updateAnime(anime);
    return response.data;
  }, []);

  return useMutation(update, {
    onMutate: async updatedAnime => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(QUERY_KEY.ANIME_LIST);
      await queryClient.cancelQueries(QUERY_KEY.ANIME(updatedAnime.id));

      // Snapshot the previous value
      const previousAnimeList = queryClient.getQueryData(QUERY_KEY.ANIME_LIST);
      const previousAnime = queryClient.getQueryData(
        QUERY_KEY.ANIME(updatedAnime.id),
      );

      // Optimistically update to the new value
      if (previousAnimeList) {
        queryClient.setQueryData(QUERY_KEY.ANIME_LIST, [
          ...previousAnimeList.filter(anime =>
            anime.id === updatedAnime.id ? updatedAnime : anime,
          ),
        ]);
      }

      if (previousAnime) {
        queryClient.setQueryData(
          QUERY_KEY.ANIME(updatedAnime.id),
          updatedAnime,
        );
      }

      return previousAnimeList;
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, updatedAnime, context) => {
      if (context?.previousAnimeList) {
        queryClient.setQueryData(
          QUERY_KEY.ANIME_LIST,
          context.previousAnimeList,
        );

        queryClient.setQueryData(
          QUERY_KEY.ANIME(updatedAnime.id),
          context.previousAnimeList.find(anime => anime.id === updatedAnime.id),
        );
      }
    },
    // Always refetch after error or success:
    onSettled: (data, error, updatedAnime) => {
      queryClient.invalidateQueries(QUERY_KEY.ANIME_LIST);
      queryClient.invalidateQueries(QUERY_KEY.ANIME(updatedAnime.id));
    },
  });
}

export default useUpdateAnime;
