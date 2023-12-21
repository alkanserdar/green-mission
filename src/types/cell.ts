export enum CellTypeEnum {
  Tree = 1,
  Water = 2,
}

export interface ICell {
  id: number;
  row: number;
  column: number;
  type: CellTypeEnum;
  isOpen: boolean;
  image: string;
}

export interface IRow {
  id: number;
  cells: any[];
}
