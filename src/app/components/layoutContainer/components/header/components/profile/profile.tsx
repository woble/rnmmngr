import { Avatar, Button } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { AppContext } from '@/app/appContext';
import { User } from '@/utils';

type ProfileProps = {
  user: User;
};

export const Profile = ({ user }: ProfileProps): JSX.Element => {
  const { setUser } = useContext(AppContext);

  return (
    <>
      <Button variant="secondary" onPress={() => setUser(undefined)}>
        Log out
      </Button>

      <Avatar src={user.avatarUrl} size="avatar-size-500" alt={user.name} />
    </>
  );
};
