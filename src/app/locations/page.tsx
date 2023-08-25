'use client';

import { Flex, View } from '@adobe/react-spectrum';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { GridBase, PageSection } from '@/components';
import { readLocations, ReadLocationsApiResponse } from '@/utils';

export default function LocationsPage(): JSX.Element {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ReadLocationsApiResponse>({
      queryKey: ['locations'],
      queryFn: readLocations,
      getNextPageParam: (lastPage) =>
        lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
      enabled: true,
    });

  useEffect(() => {
    if (!isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage]);

  return (
    <PageSection title="Locations">
      <Flex direction="column" gap="size-400">
        <GridBase minCellWidth={270}>
          {data?.pages.map((page) =>
            page.results.map((location) => <View key={location.id}>{location.name}</View>)
          )}
        </GridBase>
      </Flex>
    </PageSection>
  );
}
