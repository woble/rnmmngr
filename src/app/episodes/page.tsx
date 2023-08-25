'use client';

import { Flex } from '@adobe/react-spectrum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { EpisodesGrid, PageSection } from '@/components';
import { readEpisodes, ReadEpisodesApiResponse } from '@/utils';

export default function EpisodesPage(): JSX.Element {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ReadEpisodesApiResponse>({
      queryKey: ['episodes', 'infinite'],
      queryFn: readEpisodes,
      getNextPageParam: (lastPage) =>
        lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
      enabled: true,
      refetchOnMount: false,
    });

  useEffect(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  const episodes = useMemo(() => {
    if (!data || !data.pages) {
      return undefined;
    }

    return data.pages.map((page) => page.results.map((episode) => episode)).flat();
  }, [data]);

  return (
    <PageSection title="Episodes">
      <Flex direction="column" gap="size-400">
        {episodes && <EpisodesGrid episodes={episodes} />}
      </Flex>
    </PageSection>
  );
}
