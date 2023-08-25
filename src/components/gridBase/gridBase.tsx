import { Grid, GridProps } from '@adobe/react-spectrum';

export type GridBaseProps = {
  minCellWidth: number;
} & GridProps;

export const GridBase = (props: GridBaseProps): JSX.Element => {
  const { minCellWidth, children, ...gridProps } = props;
  const columns = `repeat(auto-fit, minmax(${minCellWidth}px, 1fr))`;

  return (
    <Grid gap="size-200" columns={columns} {...gridProps}>
      {children}
    </Grid>
  );
};
