'use client';

import { ActionButton, Flex } from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import { addWeeks, isWithinInterval, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useContext, useMemo } from 'react';

import { PageSection } from '@/components';
import { CharactersGrid } from '@/components';
import {
  DateRange,
  readCharacters,
  ReadCharactersApiResponse,
  RickAndMortyCharacter,
  useMultipleCharacters,
} from '@/utils';

import { AppContext } from './appContext';

type DateRangeGroup = {
  readonly title: string;
  readonly date_range: DateRange;
  readonly items: RickAndMortyCharacter[];
};

export default function HomePage() {
  const { favouriteCharacterIds } = useContext(AppContext);
  const router = useRouter();

  const { data: favouriteCharacters } = useMultipleCharacters({ ids: favouriteCharacterIds });

  const { data: charactersData, isInitialLoading } = useQuery<ReadCharactersApiResponse>({
    queryKey: ['characters'],
    queryFn: readCharacters,
    refetchOnMount: false,
  });

  const groups = useMemo(() => {
    if (!charactersData || !charactersData.results) {
      return undefined;
    }

    const dateRangeGroups: DateRangeGroup[] = [];

    charactersData.results.forEach((result) => {
      const dateRangeGroupIndex = dateRangeGroups.findIndex((group) =>
        isWithinInterval(parseISO(result.date_range.start), {
          start: parseISO(group.date_range.start),
          end: parseISO(group.date_range.end),
        })
      );

      if (dateRangeGroupIndex > -1) {
        dateRangeGroups[dateRangeGroupIndex].items.push(result);
      } else {
        const dateRange: DateRange = {
          start: result.date_range.start,
          end: addWeeks(parseISO(result.date_range.start), 1).toISOString(),
        };

        dateRangeGroups.push({
          title: 'Upcoming events',
          date_range: dateRange,
          items: [result],
        });
      }
    });

    return dateRangeGroups;
  }, [charactersData]);

  return (
    <Flex gap="size-800" direction="column">
      {favouriteCharacters?.length && (
        <PageSection
          title="Favourite character events"
          actions={<ActionButton onPress={() => router.push('/characters')}>View all</ActionButton>}
        >
          <CharactersGrid isLoading={isInitialLoading} characters={favouriteCharacters} />
        </PageSection>
      )}

      {groups?.map((group) => (
        <PageSection
          key={group.date_range.start}
          title={group.title}
          actions={<ActionButton onPress={() => router.push('/characters')}>View all</ActionButton>}
        >
          <CharactersGrid isLoading={isInitialLoading} characters={group.items} />
        </PageSection>
      ))}
    </Flex>
  );
}
