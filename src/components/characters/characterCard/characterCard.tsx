import {
  ActionButton,
  Badge,
  Content,
  DialogContainer,
  Flex,
  Heading,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import ChevronRight from '@spectrum-icons/workflow/ChevronRight';
import Preview from '@spectrum-icons/workflow/Preview';
import { differenceInCalendarDays, formatDistance, parseISO } from 'date-fns';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import { AppContext } from '@/app/appContext';
import { RickAndMortyCharacter } from '@/utils';

import { AspectRatio } from '../../aspectRatio';
import { CharacterDialog } from '../characterDialog';
import { FavouriteCharacterToggleButton } from '../favouriteCharacterToggleButton';

type CharacterCardProps = {
  character: RickAndMortyCharacter;
};

export const CharacterCard = (props: CharacterCardProps): JSX.Element => {
  const { user } = useContext(AppContext);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { character } = props;
  const { id, name, image, gender, species, date_range } = character;

  const startDate = parseISO(date_range.start);
  const endDate = parseISO(date_range.end);

  const startDateString = startDate.toLocaleDateString();
  const endDateString = endDate.toDateString();
  const durationInDay = differenceInCalendarDays(endDate, startDate).toString();
  const distanceInDays = formatDistance(endDate, new Date(), { addSuffix: true });

  return (
    <>
      <View
        elementType="article"
        backgroundColor="gray-50"
        borderRadius="regular"
        overflow="hidden"
        borderColor="blue-400"
        borderWidth="thin"
        position="relative"
      >
        <Flex direction="column" height="100%">
          <View elementType="header" flexShrink={0} paddingBottom={0} position="relative">
            <AspectRatio ratio={1 / 1} overflow="hidden">
              {image && (
                <NextImage
                  src={image}
                  alt="some alt text"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              )}
            </AspectRatio>

            <Flex gap="size-100" position="absolute" top="size-100" left="size-100">
              <Badge variant="info">{distanceInDays}</Badge>
            </Flex>
          </View>

          <View elementType="section" padding="size-200" flexGrow={1}>
            <Heading level={3} margin={0}>
              {name}
            </Heading>

            <Content>
              {gender !== 'unknown' ? gender : null} {species}
            </Content>

            <Content>
              {startDateString} - {endDateString}
            </Content>
          </View>

          <View elementType="footer" padding="size-200" paddingTop={0}>
            <Flex alignItems="center" gap="size-100">
              {user && <FavouriteCharacterToggleButton characterId={id} />}

              <TooltipTrigger>
                <ActionButton onPress={() => setIsDialogOpen(true)}>
                  <Preview />
                </ActionButton>

                <Tooltip>Preview character</Tooltip>
              </TooltipTrigger>

              <ActionButton marginStart="auto" onPress={() => router.push(`/characters/${id}`)}>
                <ChevronRight />
              </ActionButton>
            </Flex>
          </View>
        </Flex>
      </View>

      <DialogContainer isDismissable onDismiss={() => setIsDialogOpen(false)}>
        {isDialogOpen && <CharacterDialog character={character} />}
      </DialogContainer>
    </>
  );
};
