import {
  ActionButton,
  DialogContainer,
  SpectrumActionButtonProps,
  Tooltip,
  TooltipTrigger,
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import { useCallback, useContext, useState } from 'react';

import { EditCharacterDialog } from '@/components';

import { CharacterPageContext } from '../../../context';

type EditActionProps = SpectrumActionButtonProps;

export const EditAction = (props: EditActionProps): JSX.Element => {
  const { onPress, ...restProps } = props;
  const { character } = useContext(CharacterPageContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePress = useCallback<Exclude<SpectrumActionButtonProps['onPress'], undefined>>(
    (event) => {
      setIsDialogOpen(true);
      onPress?.(event);
    },
    [onPress]
  );

  return (
    <>
      <TooltipTrigger>
        <ActionButton onPress={handlePress} {...restProps}>
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
