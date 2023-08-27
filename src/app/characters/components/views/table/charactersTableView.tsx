'use client';

import {
  ActionGroup,
  Avatar,
  Item,
  SpectrumColumnProps,
  TableHeader,
  TableView,
} from '@adobe/react-spectrum';
import { Cell, Column, Row, TableBody } from '@react-stately/table';
import { parseISO } from 'date-fns';

import { RickAndMortyCharacter, useInfiniteCharacters } from '@/utils';

type Column = {
  readonly name?: string;
  readonly key: keyof RickAndMortyCharacter | (string & {});
  readonly props?: Omit<SpectrumColumnProps<Column>, 'children'>;
};

const columns: Column[] = [
  {
    name: '',
    key: 'image',
    props: {
      width: 60,
      minWidth: 60,
    },
  },
  {
    name: 'Name',
    key: 'name',
    props: {
      width: '3fr',
    },
  },
  {
    name: 'Species',
    key: 'species',
    props: {
      width: '1fr',
    },
  },
  {
    name: 'Gender',
    key: 'gender',
    props: {
      width: '1fr',
    },
  },
  {
    name: 'Meet and greet date',
    key: 'date_range',
    props: {
      width: '2fr',
    },
  },
  {
    key: 'options',
    props: {
      width: 50,
      align: 'end',
    },
  },
];

export const CharactersTableView = (): JSX.Element => {
  const { characters } = useInfiniteCharacters();

  return (
    <TableView density="spacious" onAction={(key) => console.log((characters as any)[key].id)}>
      <TableHeader columns={columns}>
        {(column) => (
          <Column key={column.key} {...column.props}>
            {column.name}
          </Column>
        )}
      </TableHeader>

      <TableBody items={characters}>
        {(item) => (
          <Row>
            {(columnKey) => {
              if (columnKey === 'options') {
                return (
                  <Cell>
                    <ActionGroup overflowMode="collapse" isQuiet>
                      <Item key="test1">Edit character</Item>
                      <Item key="test2">Delete character</Item>
                    </ActionGroup>
                  </Cell>
                );
              }

              if (columnKey === 'image') {
                return (
                  <Cell>
                    <Avatar src={item.image} size="avatar-size-500" />
                  </Cell>
                );
              }

              if (columnKey === 'date_range') {
                return <Cell>{parseISO(item.date_range.start).toLocaleDateString()}</Cell>;
              }

              const itemPropertyValue = (item as any)[columnKey as keyof RickAndMortyCharacter];

              return <Cell>{itemPropertyValue}</Cell>;
            }}
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};
