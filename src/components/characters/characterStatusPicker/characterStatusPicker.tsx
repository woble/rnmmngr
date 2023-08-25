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

type CharacterStatusPickerProps = Pick<
  SpectrumPickerProps<Item>,
  'onSelectionChange' | 'selectedKey'
>;

export const CharacterStatusPicker = (props: CharacterStatusPickerProps): JSX.Element => {
  const { onSelectionChange, selectedKey } = props;

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
    >
      {(item) => <Item key={item.key}>{item.name}</Item>}
    </Picker>
  );
};
