import { ActionButton, DialogContainer, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import Delete from '@spectrum-icons/workflow/Delete';
import { useContext, useState } from 'react';

import { DeleteCharacterDialog } from '@/components';

import { CharacterPageContext } from '../../../context';

export const DeleteAction = (): JSX.Element => {
  const { character } = useContext(CharacterPageContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipTrigger>
        <ActionButton onPress={() => setIsDialogOpen(true)}>
          <Delete />
        </ActionButton>

        <Tooltip>Delete character</Tooltip>
      </TooltipTrigger>

      <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
        {character && isDialogOpen && <DeleteCharacterDialog character={character} />}
      </DialogContainer>
    </>
  );
};
