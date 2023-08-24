import { Flex, Heading, View } from '@adobe/react-spectrum';

type PageSectionProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageSection = (props: PageSectionProps): JSX.Element => {
  const { children, title, actions } = props;

  return (
    <Flex gap="size-300" direction="column">
      <Flex justifyContent="space-between" alignItems="center" marginTop="size-300">
        <Heading level={1} margin={0}>
          {title}
        </Heading>

        {actions}
      </Flex>

      <View>{children}</View>
    </Flex>
  );
};
