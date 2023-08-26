import { faker } from '@faker-js/faker';
import { addDays } from 'date-fns';
import { produce } from 'immer';

import {
  DateRange,
  RickAndMortyCharacter,
  RickAndMortyEpisode,
  RickAndMortyLocation,
  RickAndMortyPaginatedApiResponse,
} from './rickAndMorty.types';

const baseUrl = 'https://rickandmortyapi.com/api';

function createDateRange(id: number): DateRange {
  faker.seed(id);

  // const startOffset = faker.number.int({ min: id, max: id + 2 });
  const startOffset = id;
  const endOffset = faker.number.int({ min: 1, max: 2 });

  const startDate = addDays(new Date(new Date().toDateString()), startOffset);
  const endDate = addDays(startDate, endOffset);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

export type ReadCharactersApiResponse = RickAndMortyPaginatedApiResponse<
  readonly RickAndMortyCharacter[]
>;
export type ReadCharactersApiArgs = {
  readonly pageParam?: number;
};
export async function readCharacters(
  args: ReadCharactersApiArgs
): Promise<ReadCharactersApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/character?page=${pageParam}`);
  return response.json().then((json: ReadCharactersApiResponse) => {
    return produce(json, (draft) => {
      draft.results.forEach((result) => {
        result.date_range = createDateRange(result.id);
      });
    });
  });
}

export type ReadMultipleCharactersApiResponse = readonly RickAndMortyCharacter[];
export type ReadMultipleCharactersApiArgs = {
  readonly ids: readonly number[];
};
export async function readMultipleCharacters(
  args: ReadMultipleCharactersApiArgs
): Promise<ReadMultipleCharactersApiResponse> {
  const { ids } = args;
  const response = await fetch(`${baseUrl}/character/${ids.join(',')}`);
  return response.json().then((json: ReadMultipleCharactersApiResponse) => {
    return produce(json, (draft) => {
      draft.forEach((result) => {
        result.date_range = createDateRange(result.id);
      });
    });
  });
}

export type ReadCharacterApiResponse = RickAndMortyCharacter;
export type ReadCharacterArgs = {
  readonly id: number;
};
export async function readCharacter(args: ReadCharacterArgs): Promise<ReadCharacterApiResponse> {
  const { id } = args;
  const response = await fetch(`${baseUrl}/character/${id}`);
  return response.json().then((json: ReadCharacterApiResponse) => {
    return produce(json, (draft) => {
      draft.date_range = createDateRange(draft.id);
    });
  });
}

export type ReadLocationsApiResponse = RickAndMortyPaginatedApiResponse<
  readonly RickAndMortyLocation[]
>;
export type ReadLocationsApiArgs = {
  readonly pageParam?: number;
};
export async function readLocations(args: ReadLocationsApiArgs): Promise<ReadLocationsApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/location?page=${pageParam}`);
  return response.json();
}

export type ReadLocationApiResponse = RickAndMortyLocation;
export type ReadLocationArgs = {
  readonly id: number;
};
export async function readLocation(args: ReadLocationArgs): Promise<ReadLocationApiResponse> {
  const { id } = args;
  const response = await fetch(`${baseUrl}/location/${id}`);
  return response.json();
}

export type ReadEpisodesApiResponse = RickAndMortyPaginatedApiResponse<
  readonly RickAndMortyEpisode[]
>;
export type ReadEpisodesApiArgs = {
  readonly pageParam?: number;
};
export async function readEpisodes(args: ReadEpisodesApiArgs): Promise<ReadEpisodesApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/episode?page=${pageParam}`);
  return response.json();
}

export type ReadEpisodeApiResponse = RickAndMortyEpisode;
export type ReadEpisodeArgs = {
  readonly id: number;
};
export async function readEpisode(args: ReadEpisodeArgs): Promise<ReadEpisodeApiResponse> {
  const { id } = args;
  const response = await fetch(`${baseUrl}/episode/${id}`);
  return response.json();
}
