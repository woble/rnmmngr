import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Form,
  Heading,
  TextField,
  useDialogContainer,
} from '@adobe/react-spectrum';
import { ToastQueue } from '@react-spectrum/toast';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import isEqual from 'lodash/isEqual';
import { useCallback, useMemo } from 'react';
import { useSetState } from 'react-use';

import {
  ReadCharacterApiResponse,
  ReadCharactersApiResponse,
  RickAndMortyCharacter,
  RickAndMortyCharacterGender,
  RickAndMortyCharacterStatus,
} from '@/utils';

import { CharacterGenderPicker } from '../characterGenderPicker';
import { CharacterStatusPicker } from '../characterStatusPicker';

type EditCharacterDialogProps = {
  character: RickAndMortyCharacter;
};

export const EditCharacterDialog = ({ character }: EditCharacterDialogProps): JSX.Element => {
  const queryClient = useQueryClient();
  const dialogContainer = useDialogContainer();
  const [draftCharacter, setDraftCharacter] = useSetState<RickAndMortyCharacter>(character);

  const isDirty = useMemo(() => {
    return !isEqual(character, draftCharacter);
  }, [character, draftCharacter]);

  const handleSave = useCallback(() => {
    queryClient.setQueryData<ReadCharacterApiResponse>(
      ['characters', character.id],
      () => draftCharacter
    );

    queryClient.setQueryData<InfiniteData<ReadCharactersApiResponse>>(
      ['characters', 'infinite'],
      (data) => {
        if (!data) {
          return;
        }

        return produce(data, (draft) => {
          const pageAndItemIndex = draft.pages
            .map((page, pageIndex) => ({
              pageIndex,
              itemIndex: page.results.findIndex(({ id }) => id === character.id),
            }))
            .filter(({ itemIndex }) => itemIndex > -1)[0];

          if (!pageAndItemIndex) {
            return;
          }

          const { pageIndex, itemIndex } = pageAndItemIndex;

          draft.pages[pageIndex].results[itemIndex] = draftCharacter;
        });
      }
    );

    ToastQueue.positive('Character updated', {
      timeout: 50,
    });
  }, [character.id, draftCharacter, queryClient]);

  return (
    <Dialog>
      <Heading>Edit character {character.name}</Heading>
      <Divider />

      <Content>
        <Form>
          <TextField
            label="Name"
            name="name"
            value={draftCharacter.name}
            onChange={(name) => setDraftCharacter({ name })}
          />

          <TextField
            label="Species"
            name="species"
            value={draftCharacter.species}
            onChange={(species) => setDraftCharacter({ species })}
          />

          <CharacterStatusPicker
            selectedKey={draftCharacter.status}
            onSelectionChange={(status) =>
              setDraftCharacter({ status: status as RickAndMortyCharacterStatus })
            }
          />

          <CharacterGenderPicker
            selectedKey={draftCharacter.gender}
            onSelectionChange={(gender) =>
              setDraftCharacter({ gender: gender as RickAndMortyCharacterGender })
            }
          />
        </Form>
      </Content>

      <ButtonGroup>
        <Button
          variant="secondary"
          isDisabled={!isDirty}
          onPress={() => setDraftCharacter(character)}
        >
          Reset
        </Button>

        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button
          variant="accent"
          isDisabled={!isDirty}
          onPress={() => {
            handleSave();
            dialogContainer.dismiss();
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
