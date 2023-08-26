export type RickAndMortyPaginatedApiResponse<TEntity> = {
  readonly info: {
    readonly count: number;
    readonly pages: number;
    readonly next: string | null;
    readonly prev: string | null;
  };
  readonly results: TEntity;
};

export type RickAndMortyCharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export type RickAndMortyCharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type RickAndMortyCharacterOrigin = {
  readonly name: string;
  readonly url: string;
};

export type RickAndMortyCharacterLocation = {
  readonly name: string;
  readonly url: string;
};

export type DateRange = {
  readonly start: string;
  readonly end: string;
};

export type RickAndMortyCharacter = {
  /** The id of the character. */
  readonly id: number;
  /** The name of the character. */
  readonly name: string;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  readonly status: RickAndMortyCharacterStatus;
  /** The species of the character. */
  readonly species: string;
  /** The type or subspecies of the character. */
  readonly type: string;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  readonly gender: RickAndMortyCharacterGender;
  /** The character's origin location. */
  readonly origin: RickAndMortyCharacterOrigin;
  /** The character's last known location endpoint. */
  readonly location: RickAndMortyCharacterLocation;
  /** Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars. */
  readonly image: string;
  /** List of episodes in which this character appeared. */
  readonly episode: string[];
  /** Link to the character's own URL endpoint. */
  readonly url: string;
  /** Time at which the character was created in the database. */
  readonly created: string;
  /** The date range. */
  readonly date_range: DateRange;
};

export type RickAndMortyLocation = {
  /** The id of the location. */
  readonly id: number;
  /** The name of the location. */
  readonly name: string;
  /** The type of the location. */
  readonly type: string;
  /** The dimension in which the location is located. */
  readonly dimension: string;
  /** List of character who have been last seen in the location. */
  readonly residents: readonly string[];
  /** Link to the location's own endpoint. */
  readonly url: string;
  /** Time at which the location was created in the database. */
  readonly created: string;
};

export type RickAndMortyEpisode = {
  /** The id of the episode. */
  readonly id: number;
  /** The name of the episode. */
  readonly name: string;
  /** The air date of the episode. */
  readonly air_date: string;
  /** The code of the episode. */
  readonly episode: string;
  /** List of characters who have been seen in the episode. */
  readonly characters: readonly string[];
  /** Link to the episode's own endpoint. */
  readonly url: string;
  /** Time at which the episode was created in the database. */
  readonly created: string;
};
