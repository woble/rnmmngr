import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Form,
  Heading,
  Item,
  Picker,
  TextField,
  useDialogContainer,
} from '@adobe/react-spectrum';
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

type EditCharacterDialogProps = {
  character: RickAndMortyCharacter;
};

const statusItems: readonly {
  readonly name: string;
  readonly key: RickAndMortyCharacterStatus;
}[] = [
  {
    name: 'Alive',
    key: 'Alive',
  },
  {
    name: 'Dead',
    key: 'Dead',
  },
  {
    name: 'Unknown',
    key: 'unknown',
  },
];

const genderItems: readonly {
  readonly name: string;
  readonly key: RickAndMortyCharacterGender;
}[] = [
  {
    name: 'Female',
    key: 'Female',
  },
  {
    name: 'Male',
    key: 'Male',
  },
  {
    name: 'Genderless',
    key: 'Genderless',
  },
  {
    name: 'Unknown',
    key: 'unknown',
  },
];

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

          <Picker
            label="Status"
            name="status"
            items={statusItems}
            selectedKey={draftCharacter.status}
            onSelectionChange={(status) =>
              setDraftCharacter({ status: status as RickAndMortyCharacterStatus })
            }
          >
            {(item) => <Item key={item.key}>{item.name}</Item>}
          </Picker>

          <Picker
            label="Gender"
            name="gender"
            items={genderItems}
            selectedKey={draftCharacter.gender}
            onSelectionChange={(gender) =>
              setDraftCharacter({ gender: gender as RickAndMortyCharacterGender })
            }
          >
            {(item) => <Item key={item.key}>{item.name}</Item>}
          </Picker>
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
