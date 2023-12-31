import { Item, Picker, SpectrumPickerProps } from '@adobe/react-spectrum';
import { useCallback } from 'react';

import { RickAndMortyCharacterGender } from '@/utils';

type Item = {
  readonly name: string;
  readonly key: RickAndMortyCharacterGender;
};

const items: readonly {
  readonly name: string;
  readonly key: RickAndMortyCharacterGender;
}[] = [
  {
    name: 'Female',
    key: 'Female',
  },
  {
    name: 'Male',
    key: 'Male',
  },
  {
    name: 'Genderless',
    key: 'Genderless',
  },
  {
    name: 'Unknown',
    key: 'unknown',
  },
];

type CharacterGenderPickerProps = Omit<SpectrumPickerProps<Item>, 'items' | 'children'>;

export const CharacterGenderPicker = (props: CharacterGenderPickerProps): JSX.Element => {
  const { onSelectionChange, selectedKey, ...restProps } = props;

  const handleSelectionChange = useCallback(
    (value: React.Key) => {
      onSelectionChange?.(value);
    },
    [onSelectionChange]
  );

  return (
    <Picker
      label="Gender"
      name="gender"
      items={items}
      selectedKey={selectedKey}
      onSelectionChange={handleSelectionChange}
      {...restProps}
    >
      {(item) => <Item key={item.key}>{item.name}</Item>}
    </Picker>
  );
};
