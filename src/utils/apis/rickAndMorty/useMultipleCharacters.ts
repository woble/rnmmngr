import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  readMultipleCharacters,
  ReadMultipleCharactersApiArgs,
  ReadMultipleCharactersApiResponse,
} from './rickAndMorty.api';

type UseMultipleCharactersProps = ReadMultipleCharactersApiArgs;

export function useMultipleCharacters(
  props: UseMultipleCharactersProps
): UseQueryResult<ReadMultipleCharactersApiResponse> {
  const response = useQuery({
    queryKey: ['characters', props.ids],
    queryFn: () => readMultipleCharacters({ ids: props.ids }),
    enabled: typeof props.ids !== 'undefined',
    refetchOnMount: false,
  });

  return response;
}
