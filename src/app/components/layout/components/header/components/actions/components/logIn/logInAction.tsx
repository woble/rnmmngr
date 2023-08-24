import { Button, DialogContainer } from '@adobe/react-spectrum';
import { useState } from 'react';

import { LoginDialog } from '@/components';

export const LogInAction = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button variant="accent" onPress={() => setIsDialogOpen(true)}>
        Log in
      </Button>

      <DialogContainer onDismiss={() => setIsDialogOpen(false)}>
        {isDialogOpen && <LoginDialog />}
      </DialogContainer>
    </>
  );
};
