import noop from 'lodash/noop';
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react';

import { User } from '@/utils';

type FavouriteCharacterFnOptions = {
  readonly id: number;
  readonly isFavourite: boolean;
};

type FavouriteCharacterFn = (options: FavouriteCharacterFnOptions) => void;

type AppContextValue = {
  readonly user?: User;
  readonly setUser: Dispatch<SetStateAction<User | undefined>>;
  readonly favouriteCharacter: FavouriteCharacterFn;
  readonly favouriteCharacterIds: readonly number[];
};

const defaultAppContextValue: AppContextValue = {
  favouriteCharacterIds: [],
  favouriteCharacter: noop,
  setUser: noop,
};

export const AppContext = createContext<AppContextValue>(defaultAppContextValue);

type AppContextProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps): JSX.Element => {
  const [favouriteCharacterIds, setFavouriteCharacterIds] = useState<
    AppContextValue['favouriteCharacterIds']
  >([]);

  const [user, setUser] = useState<User>();

  const favouriteCharacter = useCallback<FavouriteCharacterFn>(({ id, isFavourite }) => {
    setFavouriteCharacterIds((prevFavouriteCharacterIds) => {
      const newFavouriteCharacterIds = isFavourite
        ? [...prevFavouriteCharacterIds, id]
        : prevFavouriteCharacterIds.filter((prevId) => prevId !== id);

      return newFavouriteCharacterIds;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        favouriteCharacterIds,
        favouriteCharacter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
