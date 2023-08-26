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
import { ToastQueue } from '@react-spectrum/toast';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { addDays, differenceInCalendarDays, format, parse, parseISO } from 'date-fns';
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

  const isFormDirty = useMemo(() => {
    return !isEqual(character, draftCharacter);
  }, [character, draftCharacter]);

  const isFormValid = useMemo(() => {
    const startDate = parseISO(draftCharacter.date_range.start);
    const endDate = parseISO(draftCharacter.date_range.end);
    return differenceInCalendarDays(endDate, startDate) >= 0;
  }, [draftCharacter.date_range]);

  const handleSave = useCallback(() => {
    queryClient.setQueryData<ReadCharacterApiResponse>(['characters', character.id], () => {
      return draftCharacter;
    });

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
      timeout: 500,
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
            isRequired
            validationState={!!draftCharacter.name ? undefined : 'invalid'}
            errorMessage="Name is required"
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

          <DateRangePicker
            label="Date test"
            hideTimeZone
            granularity="day"
            shouldForceLeadingZeros
            isRequired
            value={{
              start: parseDate(format(parseISO(draftCharacter.date_range.start), 'y-MM-dd')),
              end: parseDate(format(parseISO(draftCharacter.date_range.end), 'y-MM-dd')),
            }}
            minValue={parseDate(format(addDays(new Date(), 1), 'y-MM-dd'))}
            onChange={(value) => {
              setDraftCharacter({
                date_range: {
                  start: parse(value.start.toString(), 'y-MM-dd', new Date()).toISOString(),
                  end: parse(value.end.toString(), 'y-MM-dd', new Date()).toISOString(),
                },
              });
            }}
          />
        </Form>
      </Content>

      <ButtonGroup>
        <Button
          variant="secondary"
          isDisabled={!isFormDirty}
          onPress={() => setDraftCharacter(character)}
        >
          Reset
        </Button>

        <Button variant="secondary" onPress={() => dialogContainer.dismiss()}>
          Cancel
        </Button>

        <Button
          variant="accent"
          isDisabled={!isFormDirty || !isFormValid}
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
