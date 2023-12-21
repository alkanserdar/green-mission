export enum CellTypeEnum {
  Tree = 1,
  Water = 2,
}

export interface ICell {
  row: number;
  column: number;
  type: CellTypeEnum;
  isOpen: boolean;
  image: string;
}

export interface IRow {
  id: number;
  cells: ICell[];
}
