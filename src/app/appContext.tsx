import noop from 'lodash/noop';
import { createContext, useCallback, useEffect, useState } from 'react';

import { User } from '@/utils';

type FavouriteCharacterFnOptions = {
  readonly id: number;
  readonly isFavourite: boolean;
};

type FavouriteCharacterFn = (options: FavouriteCharacterFnOptions) => void;

type AppContextValue = {
  readonly user?: User;
  readonly setUser: (user?: User) => void;
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

  const _setUser = useCallback<AppContextValue['setUser']>((user) => {
    setUser(user);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  // Handles setting the user from localStorage
  useEffect(() => {
    const initialLocalStorageUserString = localStorage.getItem('user');
    const initialLocalStorageUser = initialLocalStorageUserString
      ? JSON.parse(initialLocalStorageUserString)
      : undefined;

    setUser(initialLocalStorageUser);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: _setUser,
        favouriteCharacterIds,
        favouriteCharacter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
