import { ButtonGroup } from '@adobe/react-spectrum';

import { LogInAction, RegisterAction } from './components';

export const Actions = (): JSX.Element => {
  return (
    <ButtonGroup align="end">
      <RegisterAction />
      <LogInAction />
    </ButtonGroup>
  );
};
