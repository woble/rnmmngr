import { View } from '@adobe/react-spectrum';

export const Main = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <View gridArea="main" overflow="hidden auto" padding="size-200">
      <View elementType="main" width="100%" maxWidth={1080} marginStart="auto" marginEnd="auto">
        {children}
      </View>
    </View>
  );
};
