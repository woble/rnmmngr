import { Button, DialogContainer } from '@adobe/react-spectrum';
import { useState } from 'react';

import { RegisterDialog } from '@/components';

export const RegisterAction = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onPress={() => setIsDialogOpen(true)}>
        Register
      </Button>

      <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
        {isDialogOpen && <RegisterDialog />}
      </DialogContainer>
    </>
  );
};
