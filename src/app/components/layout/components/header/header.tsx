import { Flex, View } from '@adobe/react-spectrum';
import { useContext } from 'react';

import { AppContext } from '@/app/appContext';
import { Logo } from '@/components/logo';

import { Actions, NavLink, Profile } from './components';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Characters', href: '/characters' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Locations', href: '/locations' },
];

export const Header = (): JSX.Element => {
  const { user } = useContext(AppContext);

  return (
    <View
      gridArea="header"
      backgroundColor="gray-200"
      overflow="hidden auto"
      padding="size-200"
      elementType="header"
    >
      <Flex
        gap="size-400"
        alignItems="center"
        justifyContent="space-between"
        maxWidth={1080}
        marginStart="auto"
        marginEnd="auto"
      >
        <View flexShrink={0}>
          <Logo />
        </View>

        <Flex gap="size-200" alignItems="center" flexGrow={1}>
          {navLinks.map(({ name, href }) => (
            <NavLink key={href} href={href}>
              {name}
            </NavLink>
          ))}
        </Flex>

        <Flex gap="size-200" flexShrink={0}>
          {!user && <Actions />}
          {user && <Profile user={user} />}
        </Flex>
      </Flex>
    </View>
  );
};
