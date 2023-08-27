import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { readCharacters, ReadCharactersApiResponse } from './rickAndMorty.api';
import { RickAndMortyCharacter } from './rickAndMorty.types';

type UseInfiniteCharactersResult = {
  characters?: readonly RickAndMortyCharacter[];
  queryResponse: UseInfiniteQueryResult<ReadCharactersApiResponse, unknown>;
};

export function useInfiniteCharacters(): UseInfiniteCharactersResult {
  const queryResponse = useInfiniteQuery<ReadCharactersApiResponse>({
    queryKey: ['characters', 'infinite'],
    queryFn: readCharacters,
    getNextPageParam: (lastPage) =>
      lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
    enabled: true,
    refetchOnMount: false,
  });

  const { data } = queryResponse;

  const characters = useMemo(() => {
    if (!data || !data.pages) {
      return undefined;
    }

    return data.pages.map((page) => page.results.map((character) => character)).flat();
  }, [data]);

  return {
    queryResponse,
    characters,
  };
}
