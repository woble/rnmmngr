import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Heading,
  useDialogContainer,
} from '@adobe/react-spectrum';

import { RickAndMortyCharacter } from '@/utils';

type DeleteCharacterDialogProps = {
  character: RickAndMortyCharacter;
};

export const DeleteCharacterDialog = ({ character }: DeleteCharacterDialogProps): JSX.Element => {
  const dialogContainer = useDialogContainer();

  return (
    <Dialog>
      <Heading>Delete character {character.name}?</Heading>
      <Divider />

      <Content>
        The character <strong>{character.name}</strong> will be permantently removed.
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button
          variant="negative"
          onPress={() => {
            dialogContainer.dismiss();
          }}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
