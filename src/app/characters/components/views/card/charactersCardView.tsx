'use client';

import { Flex } from '@adobe/react-spectrum';
import { Waypoint } from 'react-waypoint';

import { CharactersGrid } from '@/components';
import { useInfiniteCharacters } from '@/utils';

export const CharactersCardView = (): JSX.Element => {
  const {
    characters,
    queryResponse: { fetchNextPage, hasNextPage, isInitialLoading },
  } = useInfiniteCharacters();

  return (
    <Flex direction="column" gap="size-400">
      <CharactersGrid isLoading={isInitialLoading} loadingItems={20} characters={characters} />
      {hasNextPage && <Waypoint bottomOffset={-600} onEnter={() => fetchNextPage()} />}
    </Flex>
  );
};
