'use client';

import { ActionGroup, Flex, Item, Text } from '@adobe/react-spectrum';
import ViewGrid from '@spectrum-icons/workflow/ViewGrid';
import ViewList from '@spectrum-icons/workflow/ViewList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import { CharactersGrid, PageSection } from '@/components';
import { readCharacters, ReadCharactersApiResponse } from '@/utils';

export default function CharactersPage(): JSX.Element {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<ReadCharactersApiResponse>({
    queryKey: ['characters', 'infinite'],
    queryFn: readCharacters,
    getNextPageParam: (lastPage) =>
      lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
    enabled: true,
    refetchOnMount: false,
  });

  const characters = useMemo(() => {
    if (!data || !data.pages) {
      return undefined;
    }

    return data.pages.map((page) => page.results.map((character) => character)).flat();
  }, [data]);

  return (
    <PageSection
      title="Characters"
      actions={
        <ActionGroup
          isQuiet
          buttonLabelBehavior="hide"
          selectionMode="single"
          disallowEmptySelection
          disabledKeys={['list']}
          defaultSelectedKeys={['grid']}
        >
          <Item key="grid">
            <ViewGrid />
            <Text>Grid view</Text>
          </Item>

          <Item key="list">
            <ViewList />
            <Text>List view</Text>
          </Item>
        </ActionGroup>
      }
    >
      <Flex direction="column" gap="size-400">
        {characters && (
          <>
            <CharactersGrid characters={characters} />
            {hasNextPage && <Waypoint bottomOffset={-400} onEnter={() => fetchNextPage()} />}
          </>
        )}
      </Flex>
    </PageSection>
  );
}