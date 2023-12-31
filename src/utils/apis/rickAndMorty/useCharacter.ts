import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { readCharacter, ReadCharacterApiResponse } from './rickAndMorty.api';
import { getIdFromUrl } from './utils';

type UseCharacterProps = {
  id: string | number;
};

export function useCharacter(props: UseCharacterProps): UseQueryResult<ReadCharacterApiResponse> {
  const id = typeof props.id === 'string' ? getIdFromUrl(props.id) : props.id;

  const response = useQuery({
    queryKey: ['characters', id!],
    queryFn: () => readCharacter({ id: id! }),
    enabled: typeof id !== 'undefined',
    refetchOnMount: false,
  });

  return response;
}
