<template>
  <div>
    <button @click="createCell">Create Cell</button>
    <!-- <div v-for="(cell, index) in cells" :key="index">
      Row: {{ cell.row }} - Column: {{ cell.column }} - Value: {{ cell.image }}
    </div> -->
    <div v-for="(row, index) in rows" :key="index">
      <div v-for="(cell, index) in row.cells" :key="index">
        Row: {{ cell.row }} - Column: {{ cell.column }} - Value:
        {{ cell.image }}
      </div>
    </div>
  </div>
  <b-container class="row">
    <b-row>
      <b-col lg="12">Title</b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <div class="d-flex justify-content-center">
          <div>
            <tr v-for="i in 10" :key="i">
              <td v-for="j in 10" :key="j">
                <div class="cell">tre</div>
              </td>
            </tr>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CellTypeEnum, ICell, IRow } from "../types/cell";

export default defineComponent({
  data(): {
    cells: ICell[];
    rows: IRow[];
    cellCount: number;
  } {
    return {
      cells: [],
      rows: [],
      cellCount: 0,
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    this.createRow();
  },
  methods: {
    createCell(): ICell {
      this.cellCount++;
      var type = this.getRandomCellType();
      const newCell: ICell = {
        row: this.cellCount,
        column: this.cellCount,
        type: type,
        image: "./assets/logo.png",
        isOpen: false,
      };
      return newCell;
      // this.cells.push(newCell);
    },
    createRow() {
      //this.cellCount++;

      for (var row = 0; row < 9; row++) {
        var myRow = {} as IRow;
        for (var cell = 0; cell < 9; cell++) {
          var cr = this.createCell();
          myRow.cells.push(cr);
        }
        this.rows.push(myRow);
      }
      // var type = this.getRandomCellType();
      // const newCell: ICell = {
      //   row: this.cellCount,
      //   column: this.cellCount,
      //   type: type,
      //   image: "./assets/logo.png",
      //   isOpen: false,
      // };
      // this.cells.push(newCell);
    },
    getRandomCellType(): CellTypeEnum {
      const randomValue = Math.random();
      if (randomValue < 0.5) {
        return CellTypeEnum.Tree;
      } else {
        return CellTypeEnum.Water;
      }
    },
    getImagePath(cellType: CellTypeEnum): string {
      if (cellType == CellTypeEnum.Tree) {
        return "./assets/logo.png";
      } else {
        return "./assets/logo.png";
      }
    },
  },
});
</script>

<style scoped>
.cell {
  border: 1px black solid;
}
</style>
