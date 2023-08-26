import { Item, Picker, SpectrumPickerProps } from '@adobe/react-spectrum';
import { useCallback } from 'react';

import { RickAndMortyCharacterStatus } from '@/utils';

type Item = {
  readonly name: string;
  readonly key: RickAndMortyCharacterStatus;
};

const items: readonly Item[] = [
  {
    name: 'Alive',
    key: 'Alive',
  },
  {
    name: 'Dead',
    key: 'Dead',
  },
  {
    name: 'Unknown',
    key: 'unknown',
  },
];

type CharacterStatusPickerProps = Omit<SpectrumPickerProps<Item>, 'items' | 'children'>;

export const CharacterStatusPicker = (props: CharacterStatusPickerProps): JSX.Element => {
  const { onSelectionChange, selectedKey, ...restProps } = props;

  const handleSelectionChange = useCallback(
    (value: React.Key) => {
      onSelectionChange?.(value);
    },
    [onSelectionChange]
  );

  return (
    <Picker
      label="Status"
      name="status"
      items={items}
      selectedKey={selectedKey}
      onSelectionChange={handleSelectionChange}
      {...restProps}
    >
      {(item) => <Item key={item.key}>{item.name}</Item>}
    </Picker>
  );
};
