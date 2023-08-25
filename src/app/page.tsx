'use client';

import { ActionButton, Flex } from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { EpisodesGrid, PageSection } from '@/components';
import { CharactersGrid } from '@/components';
import {
  readCharacters,
  ReadCharactersApiResponse,
  readEpisodes,
  ReadEpisodesApiResponse,
} from '@/utils';

export default function HomePage() {
  const router = useRouter();

  const { data: charactersData } = useQuery<ReadCharactersApiResponse>({
    queryKey: ['characters'],
    queryFn: readCharacters,
    refetchOnMount: false,
  });

  const { data: episodesData } = useQuery<ReadEpisodesApiResponse>({
    queryKey: ['episodes'],
    queryFn: readEpisodes,
    refetchOnMount: false,
  });

  const characters = useMemo(() => {
    if (!charactersData || !charactersData.results) {
      return undefined;
    }

    return charactersData.results.slice(0, 4);
  }, [charactersData]);

  const episodes = useMemo(() => {
    if (!episodesData || !episodesData.results) {
      return undefined;
    }

    return episodesData.results.slice(0, 3);
  }, [episodesData]);

  return (
    <Flex gap="size-800" direction="column">
      <PageSection
        title="Characters"
        actions={<ActionButton onPress={() => router.push('/characters')}>View all</ActionButton>}
      >
        {characters && <CharactersGrid characters={characters} />}
      </PageSection>

      <PageSection
        title="Episodes"
        actions={<ActionButton onPress={() => router.push('/episodes')}>View all</ActionButton>}
      >
        {episodes && <EpisodesGrid episodes={episodes} />}
      </PageSection>

      <PageSection
        title="Locations"
        actions={<ActionButton onPress={() => router.push('/locations')}>View all</ActionButton>}
      >
        locations
      </PageSection>
    </Flex>
  );
}
