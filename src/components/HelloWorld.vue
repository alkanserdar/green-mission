<template>
  <div>
    <div v-for="(row, index) in rows" :key="index">
      <div v-for="(cell, index) in row.cells" :key="index">
        <!-- Row: {{ cell.row }} - Column: {{ cell.column }} - Value:
        {{ cell.image }} -->
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
  <div id="app">
    <div class="">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
        <div
          v-for="(cell, cellIndex) in row.cells"
          :key="cellIndex"
          class="col"
        >
          Row: {{ cell.row }} - Col: {{ cell.column }} - Value:
          {{ cell.image }}
        </div>
      </div>
    </div>
  </div>
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
    createCell(rowOrder: number, columnOrder: number): ICell {
      this.cellCount++;
      var type = this.getRandomCellType();
      const newCell: ICell = {
        id: this.cellCount,
        row: rowOrder,
        column: columnOrder,
        type: type,
        image: "./assets/logo.png",
        isOpen: false,
      };
      return newCell;
    },
    createRow() {
      var counter = 0;

      for (var row = 0; row < 9; row++) {
        var columnCounter = 0;
        counter++;
        var myRow = { id: 0, cells: [] } as IRow;
        for (var cell = 0; cell < 9; cell++) {
          columnCounter++;
          var cr = this.createCell(counter, columnCounter);
          myRow.cells.push(cr);
        }
        console.log(myRow);
        this.rows.push(myRow);
      }
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
.grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr); /* 9 sütun */
  gap: 2px; /* Hücreler arası boşluk */
}
.row {
  /* display: flex; */
}
.cell {
  flex: 1;
  border: 1px solid #000; /* Hücre çerçevesi */
  padding: 5px; /* Hücre iç boşluğu */
  text-align: center; /* Hücre içindeki metni ortala */
}
</style>
