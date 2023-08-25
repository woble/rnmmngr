import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { readLocation, ReadLocationApiResponse } from './rickAndMorty.api';
import { getIdFromUrl } from './utils';

type UseLocationProps = {
  id: string | number;
};

export function useLocation(props: UseLocationProps): UseQueryResult<ReadLocationApiResponse> {
  const id = typeof props.id === 'number' ? props.id : getIdFromUrl(props.id);

  const response = useQuery({
    queryKey: ['location', id!],
    queryFn: () => readLocation({ id: id! }),
    enabled: typeof id !== 'undefined',
    refetchOnMount: false,
  });

  return response;
}
