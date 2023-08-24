'use client';

import { Flex } from '@adobe/react-spectrum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Waypoint } from 'react-waypoint';

import { EpisodesGrid, PageSection } from '@/components';
import { readEpisodes, ReadEpisodesApiResponse } from '@/utils';

export default function EpisodesPage(): JSX.Element {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<ReadEpisodesApiResponse>({
    queryKey: ['episodes', 'infinite'],
    queryFn: readEpisodes,
    getNextPageParam: (lastPage) =>
      lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
    enabled: true,
    refetchOnMount: false,
  });

  const episodes = useMemo(() => {
    if (!data || !data.pages) {
      return undefined;
    }

    return data.pages.map((page) => page.results.map((episode) => episode)).flat();
  }, [data]);

  return (
    <PageSection title="Episodes">
      <Flex direction="column" gap="size-400">
        {episodes && (
          <>
            <EpisodesGrid episodes={episodes} />
            {hasNextPage && <Waypoint bottomOffset={-400} onEnter={() => fetchNextPage()} />}
          </>
        )}
      </Flex>
    </PageSection>
  );
}
