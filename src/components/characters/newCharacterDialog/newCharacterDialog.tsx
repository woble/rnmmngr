import {
  Button,
  ButtonGroup,
  Content,
  DateRangePicker,
  Dialog,
  Divider,
  Form,
  Heading,
  TextField,
  useDialogContainer,
} from '@adobe/react-spectrum';
import { parseDate } from '@internationalized/date';
import { addDays, differenceInCalendarDays, format, isBefore, parseISO } from 'date-fns';
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
  const [character, setCharacter] = useSetState<RickAndMortyCharacter>({
    id: 1000,
    date_range: {
      start: addDays(new Date(new Date().toDateString()), 1).toISOString(),
      end: addDays(new Date(new Date().toDateString()), 1).toISOString(),
    },
    episode: [],
    gender: 'unknown',
    image: '',
    location: {
      name: '',
      url: '',
    },
    name: '',
    origin: {
      name: '',
      url: '',
    },
    species: '',
    status: 'unknown',
    type: '',
    url: '',
    created: '',
  });

  const isFormValid = useMemo(() => {
    const startDate = parseISO(character.date_range.start);
    const endDate = parseISO(character.date_range.end);
    const isValidDate =
      differenceInCalendarDays(endDate, startDate) >= 0 && !isBefore(startDate, new Date());

    const isValidName = !!character.name;
    return isValidDate && isValidName;
  }, [character]);

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
            isRequired
            validationState={!!character.name ? undefined : 'invalid'}
            errorMessage="Name is required"
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

          <DateRangePicker
            label="Date test"
            hideTimeZone
            granularity="day"
            shouldForceLeadingZeros
            isRequired
            value={{
              start: parseDate(
                format(parseISO(character.date_range.start ?? new Date()), 'y-MM-dd')
              ),
              end: parseDate(format(parseISO(character.date_range.end ?? new Date()), 'y-MM-dd')),
            }}
            minValue={parseDate(format(addDays(new Date(), 1), 'y-MM-dd'))}
            onChange={(value) => {
              setCharacter({
                date_range: {
                  start: value.start.toString(),
                  end: value.end.toString(),
                },
              });
            }}
          />
        </Form>
      </Content>

      <ButtonGroup>
        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button
          variant="accent"
          isDisabled={!isFormValid}
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
