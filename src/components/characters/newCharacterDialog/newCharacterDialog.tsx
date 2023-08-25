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
import { useCallback, useMemo } from 'react';
import { useSetState } from 'react-use';

import {
  RickAndMortyCharacter,
  RickAndMortyCharacterGender,
  RickAndMortyCharacterStatus,
} from '@/utils';

import { CharacterGenderPicker } from '../characterGenderPicker';
import { CharacterStatusPicker } from '../characterStatusPicker';

type NewCharacterDialogProps = {
  onCreated?: (character: RickAndMortyCharacter) => void;
};

export const NewCharacterDialog = (props: NewCharacterDialogProps): JSX.Element => {
  const { onCreated } = props;
  const dialogContainer = useDialogContainer();
  const [character, setCharacter] = useSetState<RickAndMortyCharacter>();

  const handleSave = useCallback(() => {
    onCreated?.(character);
    dialogContainer.dismiss();
  }, [character, dialogContainer, onCreated]);

  return (
    <Dialog>
      <Heading>New character</Heading>
      <Divider />

      <Content>
        <Form>
          <TextField
            label="Name"
            name="name"
            value={character.name}
            onChange={(name) => setCharacter({ name })}
          />

          <TextField
            label="Species"
            name="species"
            value={character.species}
            onChange={(species) => setCharacter({ species })}
          />

          <CharacterStatusPicker
            selectedKey={character.status}
            onSelectionChange={(status) =>
              setCharacter({ status: status as RickAndMortyCharacterStatus })
            }
          />

          <CharacterGenderPicker
            selectedKey={character.gender}
            onSelectionChange={(gender) =>
              setCharacter({ gender: gender as RickAndMortyCharacterGender })
            }
          />
        </Form>
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button
          variant="accent"
          onPress={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
