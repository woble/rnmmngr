import { ActionButton, DialogContainer, Tooltip, TooltipTrigger } from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import { useContext, useState } from 'react';

import { EditCharacterDialog } from '@/components';

import { CharacterPageContext } from '../../../context';

export const EditAction = (): JSX.Element => {
  const { character } = useContext(CharacterPageContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipTrigger>
        <ActionButton onPress={() => setIsDialogOpen(true)}>
          <Edit />
        </ActionButton>

        <Tooltip>Edit character</Tooltip>
      </TooltipTrigger>

      <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
        {character && isDialogOpen && <EditCharacterDialog character={character} />}
      </DialogContainer>
    </>
  );
};
