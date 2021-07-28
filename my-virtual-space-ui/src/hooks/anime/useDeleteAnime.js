import { useMutation, useQueryClient } from 'react-query';
import { useCallback } from 'react';
import { deleteAnimeById } from '../../api/animeApi';
import { QUERY_KEY } from '../reactQueryKeys';

function useDeleteAnime() {
  const queryClient = useQueryClient();

  const deleteFunc = useCallback(async anime => {
    const response = await deleteAnimeById(anime.id);
    return response.data;
  }, []);

  return useMutation(deleteFunc, {
    onMutate: async deletedAnime => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(QUERY_KEY.ANIME_LIST);
      await queryClient.cancelQueries(QUERY_KEY.ANIME(deletedAnime.id));

      // Snapshot the previous value
      const previousAnimeList = queryClient.getQueryData(QUERY_KEY.ANIME_LIST);
      const previousAnime = queryClient.getQueryData(
        QUERY_KEY.ANIME(deletedAnime.id),
      );

      // Optimistically update to the new value
      if (previousAnimeList) {
        queryClient.setQueryData(QUERY_KEY.ANIME_LIST, [
          ...previousAnimeList.filter(anime => anime.id !== deletedAnime.id),
        ]);
      }

      if (previousAnime) {
        queryClient.setQueryData(
          QUERY_KEY.ANIME(deletedAnime.id),
          deletedAnime,
        );
      }

      return previousAnimeList;
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, deletedAnime, context) => {
      if (context?.previousAnimeList) {
        queryClient.setQueryData(
          QUERY_KEY.ANIME_LIST,
          context.previousAnimeList,
        );

        queryClient.setQueryData(
          QUERY_KEY.ANIME(deletedAnime.id),
          context.previousAnimeList.find(anime => anime.id === deletedAnime.id),
        );
      }
    },
    // Always refetch after error or success:
    onSettled: (data, error, deletedAnime) => {
      queryClient.invalidateQueries(QUERY_KEY.ANIME_LIST);
      queryClient.invalidateQueries(QUERY_KEY.ANIME(deletedAnime.id));
    },
  });
}

export default useDeleteAnime;
