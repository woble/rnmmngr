import { Flex, Grid, View } from '@adobe/react-spectrum';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'date-fns';
import Image from 'next/image';

import { LabeledValue } from '@/components';
import {
  readEpisode,
  RickAndMortyCharacter,
  RickAndMortyEpisode,
  useEpisode,
  useLocation,
} from '@/utils';

import { AspectRatio } from '../../aspectRatio';

import styles from './characterDetails.module.scss';

type CharacterDetailsProps = {
  character: RickAndMortyCharacter;
};

const dummyDetails = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra nibh cras pulvinar mattis nunc sed blandit. Elementum sagittis vitae et leo duis. Sit amet massa vitae tortor condimentum. At urna condimentum mattis pellentesque id. Neque sodales ut etiam sit amet. Senectus et netus et malesuada fames. Enim sed faucibus turpis in eu. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Donec pretium vulputate sapien nec. Cras adipiscing enim eu turpis egestas. Et egestas quis ipsum suspendisse. Sed faucibus turpis in eu mi bibendum neque egestas. Id diam vel quam elementum pulvinar etiam.',
  'Pharetra convallis posuere morbi leo urna molestie at. Lorem sed risus ultricies tristique nulla aliquet enim. Eu ultrices vitae auctor eu augue ut lectus arcu. Eget magna fermentum iaculis eu non diam phasellus vestibulum. Venenatis tellus in metus vulputate eu scelerisque. Libero id faucibus nisl tincidunt eget. Id faucibus nisl tincidunt eget nullam. Volutpat ac tincidunt vitae semper quis lectus. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Proin libero nunc consequat interdum varius sit. Tristique risus nec feugiat in fermentum posuere urna. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget.',
  'Magna ac placerat vestibulum lectus. Eu ultrices vitae auctor eu augue ut lectus. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Pellentesque habitant morbi tristique senectus et netus et. Tellus molestie nunc non blandit massa enim nec dui nunc. Integer enim neque volutpat ac. Aliquet nibh praesent tristique magna sit amet purus. Est lorem ipsum dolor sit. Volutpat diam ut venenatis tellus in. Ultricies lacus sed turpis tincidunt id aliquet risus. Mauris a diam maecenas sed enim ut.',
  'Aenean et tortor at risus viverra adipiscing. Amet est placerat in egestas erat imperdiet sed euismod. Purus viverra accumsan in nisl. Enim ut tellus elementum sagittis vitae et leo duis ut. Suspendisse sed nisi lacus sed viverra tellus in. Nibh tortor id aliquet lectus proin nibh. Tristique senectus et netus et. Arcu non sodales neque sodales ut etiam sit. Adipiscing vitae proin sagittis nisl rhoncus. Cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo. Nisi porta lorem mollis aliquam. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Tempus quam pellentesque nec nam aliquam sem et tortor. Augue ut lectus arcu bibendum at varius vel pharetra vel. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Elementum sagittis vitae et leo duis ut diam. Sagittis id consectetur purus ut faucibus pulvinar elementum. Sed viverra ipsum nunc aliquet bibendum. Cursus euismod quis viverra nibh cras pulvinar mattis nunc.',
  'In pellentesque massa placerat duis ultricies. Nisi vitae suscipit tellus mauris a diam maecenas. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Lorem ipsum dolor sit amet. At quis risus sed vulputate odio ut enim blandit volutpat. Massa vitae tortor condimentum lacinia quis vel eros donec. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Curabitur vitae nunc sed velit dignissim sodales ut eu. Arcu risus quis varius quam. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Ullamcorper morbi tincidunt ornare massa eget egestas purus. Ac placerat vestibulum lectus mauris ultrices eros in cursus turpis. At urna condimentum mattis pellentesque id nibh tortor id. Eu lobortis elementum nibh tellus molestie nunc. Cursus mattis molestie a iaculis at. Nisi porta lorem mollis aliquam ut porttitor leo a. Aliquet porttitor lacus luctus accumsan. Risus feugiat in ante metus dictum at tempor. Vitae suscipit tellus mauris a.',
];

function getEpisodeIdFromUrl(url: string): number | undefined {
  const episodeIdString = url.split('/').pop();
  return typeof episodeIdString === 'undefined' ? undefined : parseInt(episodeIdString);
}

export const CharacterDetails = ({ character }: CharacterDetailsProps): JSX.Element => {
  const { data: firstEpisode } = useEpisode({
    id: character.episode[0],
  });

  const { data: lastLocation } = useLocation({
    id: character.location.url,
  });

  const { data: originLocation } = useLocation({
    id: character.origin.url,
  });

  return (
    <Grid columns="180px 1fr" gap="size-200">
      <View>
        <AspectRatio ratio={1 / 1} marginBottom="size-200" borderRadius="regular" overflow="hidden">
          {character.image && (
            <Image
              src={character.image}
              alt="some alt text"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
        </AspectRatio>

        <Flex direction="column" gap="size-200">
          <LabeledValue label="Gender">{character.gender}</LabeledValue>
          <LabeledValue label="Species">{character.species}</LabeledValue>

          <LabeledValue label="Origin">
            {character.origin.name}
            {originLocation?.dimension !== 'unknown' && ` in ${originLocation?.dimension}`}
          </LabeledValue>

          <LabeledValue label="Status">{character.status}</LabeledValue>

          <LabeledValue label="Last known location">
            {character.location.name}
            {lastLocation?.dimension !== 'unknown' && ` in ${lastLocation?.dimension}`}
          </LabeledValue>

          {firstEpisode && (
            <LabeledValue label="First seen in episode">
              {firstEpisode.episode} - {firstEpisode.name} on{' '}
              {parse(firstEpisode.air_date ?? '', 'MMMM d, y', new Date()).toLocaleDateString()}
            </LabeledValue>
          )}

          <LabeledValue label="Seen in episodes (total)">{character.episode.length}</LabeledValue>
        </Flex>
      </View>

      <View>
        {dummyDetails.map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </View>
    </Grid>
  );
};
