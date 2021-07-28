import { useQuery } from 'react-query';
import { useCallback } from 'react';
import { findAll } from '../../api/stateApi';

function useStateList() {
  const getStateList = useCallback(async () => {
    const response = await findAll();
    return response.data;
  }, []);

  return useQuery('state_list', getStateList);
}

export default useStateList;
