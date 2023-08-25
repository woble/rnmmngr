import {
  Button,
  Content,
  Dialog,
  Divider,
  Footer,
  Heading,
  useDialogContainer,
} from '@adobe/react-spectrum';
import { useRouter } from 'next/navigation';

import { RickAndMortyCharacter } from '@/utils';

import { CharacterDetails } from '../characterDetails';

type CharacterDialogProps = {
  character: RickAndMortyCharacter;
};

export const CharacterDialog = ({ character }: CharacterDialogProps): JSX.Element => {
  const router = useRouter();
  const { id, name } = character;
  const dialogContainer = useDialogContainer();

  return (
    <Dialog>
      <Heading>{name}</Heading>
      <Divider />

      <Content>
        <CharacterDetails character={character} />
      </Content>

      <Footer>
        <Button
          variant="secondary"
          onPress={() => {
            dialogContainer.dismiss();
            router.push(`/characters/${id}`);
          }}
          marginStart="auto"
        >
          View character page
        </Button>
      </Footer>
    </Dialog>
  );
};
