import { createContext } from 'react';

import { RickAndMortyCharacter } from '@/utils';

type CharacterPageContextValue = {
  character?: RickAndMortyCharacter;
};

export const CharacterPageContext = createContext<CharacterPageContextValue>({});
