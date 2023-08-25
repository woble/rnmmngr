import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { readEpisode, ReadEpisodeApiResponse } from './rickAndMorty.api';
import { getIdFromUrl } from './utils';

type UseEpisodeProps = {
  id: string | number;
};

export function useEpisode(props: UseEpisodeProps): UseQueryResult<ReadEpisodeApiResponse> {
  const id = typeof props.id === 'number' ? props.id : getIdFromUrl(props.id);

  const response = useQuery({
    queryKey: ['episode', id!],
    queryFn: () => readEpisode({ id: id! }),
    enabled: typeof id !== 'undefined',
    refetchOnMount: false,
  });

  return response;
}
