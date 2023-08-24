import { View } from '@adobe/react-spectrum';

type AspectRatioProps = React.ComponentProps<typeof View> & {
  ratio?: number;
};

export const AspectRatio = (props: AspectRatioProps): JSX.Element => {
  const { ratio = 1 / 1, children, ...otherProps } = props;

  return (
    <View {...otherProps} position="relative" width="100%" paddingBottom={`${100 / ratio}%`}>
      <View position="absolute" top={0} right={0} bottom={0} left={0}>
        {children}
      </View>
    </View>
  );
};
