import { Flex } from '@adobe/react-spectrum';

import styles from './labeledValue.module.scss';

type LabeledValueProps = {
  label: string;
  children: React.ReactNode;
};

export const LabeledValue = (props: LabeledValueProps): JSX.Element => {
  const { label, children } = props;
  return (
    <Flex direction="column" gap="size-50">
      <span className={styles.label}>{label}</span>
      <span className={styles.content}>{children}</span>
    </Flex>
  );
};
