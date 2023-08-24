import { Flex, Grid, LabeledValue, View } from '@adobe/react-spectrum';
import Image from 'next/image';

import { RickAndMortyCharacter } from '@/utils';

import { AspectRatio } from '../aspectRatio';

import styles from './characterDetails.module.scss';

type CharacterDetailsProps = {
  character: RickAndMortyCharacter;
};

export const CharacterDetails = ({ character }: CharacterDetailsProps): JSX.Element => {
  return (
    <Grid columns="140px 1fr" gap="size-200">
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
          <LabeledValue label="Gender" value={character.gender} />
          <LabeledValue label="Species" value={character.species} />
          <LabeledValue label="Origin" value={character.origin.name} />
          <LabeledValue label="Status" value={character.status} />
          <LabeledValue label="Location" value={character.location.name} />
          <LabeledValue label="Episodes" value={character.episode.length} />

          <LabeledValue
            label="Added"
            value={new Date(character.created)}
            formatOptions={{ dateStyle: 'long' }}
          />
        </Flex>
      </View>

      <View>
        <p className={styles.paragraph}>
          Richard "Rick" Sanchez of Dimension C-137, commonly referred to as Rick C-137, is the
          titular main protagonist of the Rick and Morty franchise.
        </p>

        <p className={styles.paragraph}>
          He is a megagenius scientist whose alcoholism and reckless, nihilistic behavior are
          sources of concern for his "daughter's" family, as well as the safety of their son, Morty.
          Upon the series' inception, Rick's mysterious origins and mental health were large sources
          of speculation. As time has gone on, more has been revealed about his character; his
          backstory explaining much of his behavior. At the same time, Rick has continuously
          committed more heinous acts, certifying him as the series' anti-hero, bordering on
          antagonist.
        </p>
      </View>
    </Grid>
  );
};
