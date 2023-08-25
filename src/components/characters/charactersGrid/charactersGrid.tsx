import { View } from '@adobe/react-spectrum';
import { useMemo } from 'react';

import { GridBase, GridBaseProps } from '@/components';
import { RickAndMortyCharacter } from '@/utils';

import { CharacterCard } from '../characterCard';

type CharactersGridProps = {
  loadingItems?: number;
  isLoading?: boolean;
  characters?: readonly RickAndMortyCharacter[];
} & Omit<GridBaseProps, 'children' | 'minCellWidth'>;

export const CharactersGrid = (props: CharactersGridProps): JSX.Element => {
  const { characters, isLoading, loadingItems = 4, ...gridProps } = props;

  const content = useMemo(() => {
    if (isLoading) {
      return Array(loadingItems)
        .fill(null)
        .map((_, index) => (
          <View
            key={index}
            height={375}
            borderRadius="regular"
            borderWidth="thin"
            borderColor="gray-300"
            backgroundColor="gray-200"
          />
        ));
    }
    return (characters ?? []).map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  }, [characters, isLoading, loadingItems]);

  return (
    <GridBase minCellWidth={220} {...gridProps}>
      {content}
    </GridBase>
  );
};
