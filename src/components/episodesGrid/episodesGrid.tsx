import { Grid } from '@adobe/react-spectrum';

import { RickAndMortyEpisode } from '@/utils';

import { EpisodeCard } from '../episodeCard';
import { GridBase } from '../gridBase';

type EpisodesGridProps = {
  episodes: readonly RickAndMortyEpisode[];
};

export const EpisodesGrid = (props: EpisodesGridProps): JSX.Element => {
  const { episodes } = props;
  return (
    <GridBase minCellWidth={280}>
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </GridBase>
  );
};
