import { sleep } from '@/utils';

import {
  RickAndMortyCharacter,
  RickAndMortyEpisode,
  RickAndMortyLocation,
  RickAndMortyPaginatedApiResponse,
} from './rickAndMorty.types';

const baseUrl = 'https://rickandmortyapi.com/api';

export type ReadCharactersApiResponse = RickAndMortyPaginatedApiResponse<
  readonly RickAndMortyCharacter[]
>;
export type ReadCharactersApiArgs = {
  pageParam?: number;
};
export async function readCharacters(
  args: ReadCharactersApiArgs
): Promise<ReadCharactersApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/character?page=${pageParam}`);
  return response.json();
}

export type ReadCharacterApiResponse = RickAndMortyCharacter;
export type ReadCharacterArgs = {
  id: number;
};
export async function readCharacter(args: ReadCharacterArgs): Promise<ReadCharacterApiResponse> {
  const { id } = args;
  const response = await fetch(`${baseUrl}/character/${id}`);
  return response.json();
}

export type ReadLocationsApiResponse = RickAndMortyPaginatedApiResponse<
  readonly RickAndMortyLocation[]
>;
export type ReadLocationsApiArgs = {
  pageParam?: number;
};
export async function readLocations(args: ReadLocationsApiArgs): Promise<ReadLocationsApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/location?page=${pageParam}`);
  return response.json();
}

export type ReadLocationApiResponse = RickAndMortyLocation;
export type ReadLocationArgs = {
  id: number;
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
  pageParam?: number;
};
export async function readEpisodes(args: ReadEpisodesApiArgs): Promise<ReadEpisodesApiResponse> {
  const { pageParam = 1 } = args;
  const response = await fetch(`${baseUrl}/episode?page=${pageParam}`);
  return response.json();
}

export type ReadEpisodeApiResponse = RickAndMortyEpisode;
export type ReadEpisodeArgs = {
  id: number;
};
export async function readEpisode(args: ReadEpisodeArgs): Promise<ReadEpisodeApiResponse> {
  const { id } = args;
  const response = await fetch(`${baseUrl}/episode/${id}`);
  return response.json();
}
