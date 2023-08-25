import {
  SpectrumToggleButtonProps,
  ToggleButton,
  Tooltip,
  TooltipTrigger,
} from '@adobe/react-spectrum';
import Heart from '@spectrum-icons/workflow/Heart';
import { useContext, useMemo } from 'react';

import { AppContext } from '@/app/appContext';

type FavouriteCharacterToggleButtonProps = {
  characterId: number;
} & Pick<SpectrumToggleButtonProps, 'isQuiet'>;

export const FavouriteCharacterToggleButton = ({
  characterId,
  isQuiet,
}: FavouriteCharacterToggleButtonProps): JSX.Element => {
  const { favouriteCharacter, favouriteCharacterIds } = useContext(AppContext);

  const isFavourite = useMemo(() => {
    return favouriteCharacterIds.some(
      (favouriteCharacterId) => characterId === favouriteCharacterId
    );
  }, [characterId, favouriteCharacterIds]);

  return (
    <TooltipTrigger>
      <ToggleButton
        isEmphasized={isFavourite}
        isQuiet={isQuiet}
        isSelected={isFavourite}
        onChange={(isSelected) => favouriteCharacter({ id: characterId, isFavourite: isSelected })}
      >
        <Heart />
      </ToggleButton>

      <Tooltip>{isFavourite ? 'Unfavourite' : 'Favourite'} character</Tooltip>
    </TooltipTrigger>
  );
};
