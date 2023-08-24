'use client';

import { Flex } from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useContext, useMemo } from 'react';

import { AppContext } from '@/app/appContext';
import { CharacterDetails, FavouriteCharacterToggleButton, PageSection } from '@/components';
import { readCharacter, ReadCharacterApiResponse } from '@/utils';

import { DeleteAction, EditAction } from './components';
import { CharacterPageContext } from './context';

export default function CharacterPage(): JSX.Element {
  const { user } = useContext(AppContext);
  const params = useParams();
  const id = parseInt(params.id as string);

  const { data: character } = useQuery<ReadCharacterApiResponse>({
    queryKey: ['characters', id],
    queryFn: () => readCharacter({ id }),
    refetchOnMount: false,
  });

  const actions = useMemo(() => {
    return (
      user && (
        <Flex gap="size-100">
          {user.permissions.canModify && <EditAction />}
          {user.permissions.canDelete && <DeleteAction />}
          <FavouriteCharacterToggleButton characterId={id} />
        </Flex>
      )
    );
  }, [id, user]);

  return (
    <CharacterPageContext.Provider value={{ character }}>
      <PageSection title={character?.name} actions={actions}>
        {character && <CharacterDetails character={character} />}
      </PageSection>
    </CharacterPageContext.Provider>
  );
}
