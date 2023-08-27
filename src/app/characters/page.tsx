'use client';

import { ActionGroup, DialogContainer, Flex, Item, Text } from '@adobe/react-spectrum';
import UserAdd from '@spectrum-icons/workflow/UserAdd';
import ViewGrid from '@spectrum-icons/workflow/ViewGrid';
import ViewList from '@spectrum-icons/workflow/ViewList';
import { useCallback, useContext, useMemo, useState } from 'react';

import { NewCharacterDialog, PageSection } from '@/components';

import { AppContext } from '../appContext';

import { CharactersCardView } from './components/views/card/charactersCardView';
import { CharactersTableView } from './components/views/table/charactersTableView';

type CharactersView = 'grid' | 'table';

export default function CharactersPage(): JSX.Element {
  const { user } = useContext(AppContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState<CharactersView>('grid');

  const handleAction = useCallback((key: React.Key) => {
    if (key === 'new') {
      setIsDialogOpen(true);
    }
  }, []);

  const actions = useMemo(() => {
    return (
      <Flex gap="size-400">
        {user?.permissions.canCreate && (
          <>
            <ActionGroup
              buttonLabelBehavior="hide"
              aria-label="Tools for managing characters"
              onAction={handleAction}
            >
              <Item key="new">
                <UserAdd />
                <Text>New character</Text>
              </Item>
            </ActionGroup>

            <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
              {isDialogOpen && (
                <NewCharacterDialog onCreated={(character) => console.log(character)} />
              )}
            </DialogContainer>
          </>
        )}

        {(user?.permissions.canModify ||
          user?.permissions.canDelete ||
          user?.permissions.canCreate) && (
          <ActionGroup
            isQuiet
            buttonLabelBehavior="hide"
            selectionMode="single"
            disallowEmptySelection
            defaultSelectedKeys={['grid']}
            onAction={(key) => setView(key as CharactersView)}
          >
            <Item key="grid">
              <ViewGrid />
              <Text>Grid view</Text>
            </Item>

            <Item key="list">
              <ViewList />
              <Text>List view</Text>
            </Item>
          </ActionGroup>
        )}
      </Flex>
    );
  }, [handleAction, isDialogOpen, user]);

  return (
    <PageSection title="Characters" actions={actions}>
      {view === 'grid' ? <CharactersCardView /> : <CharactersTableView />}
    </PageSection>
  );
}
