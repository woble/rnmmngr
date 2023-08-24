import { Divider, Flex, Heading, LabeledValue, View } from '@adobe/react-spectrum';
import MovieCamera from '@spectrum-icons/workflow/MovieCamera';

import { RickAndMortyEpisode } from '@/utils';

type EpisodeCardProps = {
  episode: RickAndMortyEpisode;
};

export const EpisodeCard = ({ episode }: EpisodeCardProps): JSX.Element => {
  return (
    <View
      elementType="article"
      backgroundColor="gray-50"
      borderRadius="regular"
      overflow="hidden"
      padding="size-200"
      borderColor="fuchsia-400"
      borderWidth="thin"
    >
      <Flex alignItems="center" gap="size-150">
        <MovieCamera />

        <Heading level={3} margin={0}>
          {episode.episode}
        </Heading>
      </Flex>

      <Divider size="S" marginY="size-100" />

      <Flex direction="column" gap="size-200">
        <LabeledValue label="Name" value={episode.name} />
        <LabeledValue label="Characters" value={episode.characters.length} />
        <LabeledValue label="Aired on" value={episode.air_date} />
      </Flex>
    </View>
  );
};
