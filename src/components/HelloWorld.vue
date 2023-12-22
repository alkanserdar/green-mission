<template>
  <img src="../assets/dxcode-logo.png" />
  <div id="app" v-if="!gameOver">
    <TimerCountComponent />
    <div class="container">
      <div class="timer-container">
        <div class="timer"><b>Timer</b>: {{ countdown }}</div>
      </div>

      <div class="progress row">
        <div :class="timerClass" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0"
          aria-valuemax="100">
          Temperature {{ temperature }}
        </div>
        
      </div>
      <!-- <div>{{ countdown }}</div> -->
      <div class="mt-5" v-if="!gameOver">
        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
          <div v-for="(cell, cellIndex) in row.cells" :key="cellIndex" class="col cell" :id="cell.id"
            :cellType="cell.type" v-on:click="openImage(cell)">
            <img v-if="!cell.isOpen" src="../assets/speed.png" />
            <img :alt="cell.id" v-else :src="getImagePath(cell.image)" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="popup">
    <img src="../assets/game_over.png" class="mr-5" />
    <button @click="restartGame"><img src="../assets/retry.png" /></button>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CellTypeEnum, ICell, IRow } from "../types/cell";
import TimerCountComponent from "./timer-count.vue";

export default defineComponent({
  data(): {
    cells: ICell[];
    rows: IRow[];
    cellCount: number;
    temperature: number;
    timer: number;
    countdown: number;
    gameOver: boolean;
    imageUrls: Record<string, string[]>;
  } {
    return {
      cells: [],
      rows: [],
      cellCount: 0,
      temperature: 25,
      timer: 5,
      countdown: 60,
      gameOver: false,
      imageUrls: {
        sustainable: ["green_leaves_nature.png", "cactus.png", "tree.png"],
        warning: ["axe.png"],
      },
    };
  },
  components: {
    TimerCountComponent,
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
  mounted() {
    this.startCountdown();
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
        image: this.getRandomImage(CellTypeEnum[type]),
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
        return CellTypeEnum.sustainable;
      } else {
        return CellTypeEnum.warning;
      }
    },
    getImageName(imagePath: string) {
      console.log(imagePath);
      var a = require(`@/assets/${imagePath}`).default;
      return a;
    },
    getRandomImage(key: string): string {
      console.log(key);
      const urls = this.imageUrls[key];
      if (urls && urls.length > 0) {
        const randomIndex = Math.floor(Math.random() * urls.length);
        return urls[randomIndex];
      }
      return "tree.png";
    },

    getImagePath(imageUrl: string) {
      return require(`../assets/${imageUrl}`);
    },
    openImage(e: ICell) {
      e.isOpen = !e.isOpen;
      if (e.type === CellTypeEnum.sustainable) {
        this.temperature--;
      } else if (e.type === CellTypeEnum.warning) {
        this.temperature++;
      }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.showGameOverPopup();
        }
      }, 1000);
    },
    showGameOverPopup() {
      this.gameOver = true;
    },
    restartGame() {
      this.clearData();
      this.startCountdown();
      this.createRow();
    },
    clearData() {
      this.rows = []
      this.temperature = 25
      this.countdown = 60;
      this.gameOver = false;
    },
  },
});
</script>

<style scoped>
.cell {
  flex: 1;
  border: 1px solid #000;
  padding: 5px;
  text-align: center;
}
</style>
