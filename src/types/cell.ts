export enum CellTypeEnum {
  sustainable = 1,
  warning = 2,
}

export interface ICell {
  id: number;
  row: number;
  column: number;
  type: CellTypeEnum;
  isOpen: boolean;
  image: string | undefined;
}

export interface IRow {
  id: number;
  cells: any[];
}

export const imageUrls: Record<string, string[]> = {
  sustainable: [
    // "tree.png",
    "../assets/green_leaves_nature.png",
    "../assets/cactus.png",
    // "/assets/water.png",
    // "/assets/cold.png",
    // "/assets/ocean.png",
    // "/assets/deer.png",
  ],
  warning: [
    "../assets/axe.png",
    // "@assets/burn_fire.png",
    // "@assets/cigarette.png",
    // "@assets/co2.png",
    // "@assets/fire.png",
    // "@assets/garbage.png",
    // "@assets/pollution.png",
  ],
};
