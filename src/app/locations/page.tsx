'use client';

import { Button, Flex, Grid, Heading, View } from '@adobe/react-spectrum';
import { useInfiniteQuery } from '@tanstack/react-query';

import { PageSection } from '@/components';
import { readLocations, ReadLocationsApiResponse } from '@/utils';

export default function LocationsPage(): JSX.Element {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<ReadLocationsApiResponse>({
    queryKey: ['locations'],
    queryFn: readLocations,
    getNextPageParam: (lastPage) =>
      lastPage.info.next ? lastPage.info.next.split('page=')[1] : undefined,
    enabled: true,
  });

  return (
    <PageSection title="Locations">
      <Flex direction="column" gap="size-400">
        <Grid gap="size-200" columns="repeat(auto-fit, minmax(270px, 1fr))">
          {data?.pages.map((page) =>
            page.results.map((location) => <View key={location.id}>{location.name}</View>)
          )}
        </Grid>

        {hasNextPage && (
          <Button variant="primary" onPress={() => fetchNextPage()} alignSelf="center">
            Show more
          </Button>
        )}
      </Flex>
    </PageSection>
  );
}
