'use client';

import { ActionButton, Flex } from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import { addWeeks, getWeek, isWithinInterval, parseISO } from 'date-fns';
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
        const startDate = parseISO(result.date_range.start);
        const dateRange: DateRange = {
          start: result.date_range.start,
          end: addWeeks(startDate, 1).toISOString(),
        };

        const todayDate = new Date(new Date().toDateString());
        const weekNumber = getWeek(startDate);

        const isEventThisWeek = isWithinInterval(startDate, {
          start: todayDate,
          end: addWeeks(todayDate, 1),
        });

        const title = isEventThisWeek ? 'This week events' : `Events in week ${weekNumber}`;

        dateRangeGroups.push({
          title,
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
        <PageSection title="My events">
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
