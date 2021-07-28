import { useQuery } from 'react-query';
import { useCallback } from 'react';
import { findAll } from '../../api/animeApi';

function useAnimeList() {
  const getAnimeList = useCallback(async () => {
    const response = await findAll();
    return response.data;
  }, []);

  return useQuery('anime_list', getAnimeList);
}

export default useAnimeList;
