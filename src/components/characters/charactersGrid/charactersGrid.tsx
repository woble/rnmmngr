import { Grid } from '@adobe/react-spectrum';

import { RickAndMortyCharacter } from '@/utils';

import { CharacterCard } from '../characterCard';

type CharactersGridProps = {
  characters: readonly RickAndMortyCharacter[];
};

export const CharactersGrid = (props: CharactersGridProps): JSX.Element => {
  const { characters } = props;
  return (
    <Grid gap="size-200" columns="repeat(auto-fit, minmax(220px, 1fr))">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};
