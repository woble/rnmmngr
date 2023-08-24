import { Grid } from '@adobe/react-spectrum';

import { RickAndMortyEpisode } from '@/utils';

import { EpisodeCard } from '../episodeCard';

type EpisodesGridProps = {
  episodes: readonly RickAndMortyEpisode[];
};

export const EpisodesGrid = (props: EpisodesGridProps): JSX.Element => {
  const { episodes } = props;
  return (
    <Grid gap="size-200" columns="repeat(auto-fit, minmax(280px, 1fr))">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </Grid>
  );
};
