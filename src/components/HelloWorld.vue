<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="progress">
          <div
            :class="timerClass"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            selam
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
          <div
            v-for="(cell, cellIndex) in row.cells"
            :key="cellIndex"
            class="col cell"
          >
            <img v-if="!cell.isOpen" src="../assets/tree.png" />
            <img v-else src="../assets/tree.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CellTypeEnum, ICell, IRow } from "../types/cell";
import { getRandomImage } from "../common/helper";

export default defineComponent({
  data(): {
    cells: ICell[];
    rows: IRow[];
    cellCount: number;
    value: number;
    temperature: number;
    timer: number;
  } {
    return {
      cells: [],
      rows: [],
      cellCount: 0,
      value: 60,
      temperature: 25,
      timer: 5,
    };
  },
  props: {
    msg: String,
  },
  computed: {
    timerClass() {
      if (this.temperature < 20) {
        return "progress-bar bg-success";
      } else if (this.temperature >= 20 && this.temperature < 30) {
        return "progress-bar bg-warning";
      } else {
        return "progress-bar bg-danger";
      }
    },
  },
  watch: {
    value(newValue) {
      console.log("Value changed:", newValue);
    },
  },
  mounted() {
    this.createRow();
    // setInterval(() => {
    //   this.temperature++;
    // }, 1000);

    // this.$watch("temperature", (newVal) => {
    //   if (newVal < 20) {
    //     this.timer = 10;
    //   } else if (newVal >= 20 && newVal < 30) {
    //     this.timer = 5;
    //   } else {
    //     this.timer = 2;
    //   }
    // });
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
        image: getRandomImage(CellTypeEnum[type]),
        isOpen: true,
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
        return CellTypeEnum.sustainable;
      } else {
        return CellTypeEnum.warning;
      }
    },
    getImageName(image: string) {
      return image;
    },
  },
});
</script>

<style scoped>
.cell {
  flex: 1;
  border: 1px solid #000; /* Hücre çerçevesi */
  padding: 5px; /* Hücre iç boşluğu */
  text-align: center; /* Hücre içindeki metni ortala */
}
</style>
