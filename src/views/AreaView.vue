<script setup>
    import { comhelper } from "../helpers/comhelper.js";
    import ModalBottom from "../components/ModalBottom.vue";
    import { ref, inject, onMounted} from "vue";
    import { useRoute } from "vue-router";

    const helper = inject('$store');
    // 0 = free, 1 = reserved, 2 = rented
    const area = ref(null);
    const areaData = ref(null);
    const route = useRoute();

    const fetchArea = async () => {
        area.value = await comhelper.getArea( route.params.id );
    }
    const fetchParcels = async () => {
      areaData.value = await comhelper.getParcelsByAreaId( route.params.id );
    }
    const buildHoneycomb = async () => {
      var align = await function () {
          var isoddlen = function (i) {
              return i % 2;
      };
      var cells = document.querySelectorAll(".honeycomb .cell");
      var lastLeft = -500;
      var is_odd = false;
      var rows = [[]];
      var j = 0;
      for (var i = 0; i < cells.length; i++) {
          var pos = cells[i].getBoundingClientRect();
          if (pos.left < lastLeft) {
          is_odd = !is_odd;
          j++;
          rows[j] = [];
          }
          rows[j].push(cells[i]);
          lastLeft = pos.left;
          if (is_odd) {
          cells[i].classList.add("odd-row");
          } else {
          cells[i].classList.remove("odd-row");
          }
      }
      for (var i = 0; i < rows.length - 1; i++) {
          if (isoddlen(rows[i].length) !== isoddlen(rows[i + 1].length)) {
          for (var j = 0; j < rows[i + 1].length; j++) {
              rows[i + 1][j].classList.toggle("odd-row");
          }
          }
      }
      };
      align();
      window.addEventListener("resize", align, false);
    }

    onMounted(async () => {
        helper.isLoading = true;
        await fetchArea();
        await fetchParcels();
        await buildHoneycomb();
        helper.isLoading = false;
    });
    const showModal = ref(false);
    const obj = {};

    const action = (ev) => {
        const id = ev.target.getAttribute("data-areaid")
        const data = areaData.value.filter(_ => _.id == id);
        obj.value = data[0];
        showModal.value = true;
    }
    const hideModal = async () => {
        showModal.value = false;
        await fetchParcels();
        await buildHoneycomb();
        // @todo find a better solution with out fetching data again on evry modal close
    }

</script>

<template>
  <section id="area" style="background-color: #e69b00; color: #341C09;">
  <div class="container text-center">
    <h1 v-if="area" class="text-center mt-10 bold">{{ area.name }} in {{ area.country }}, {{ area.state}}</h1>
    <div>
      <p>Hier können Sie eine Fläche auswählen und für ein Jahr die Patenschaft übernehmen.</p>
      <p>50qm zu einer Laufzeit von 12 Monate für 50 Euro.</p>
    </div>
  </div>

  <fieldset style="">

    <legend>Legend</legend>
    <div class="legend-item-container">
        <span class="legend-item-box free"></span>
        <span class="legend-text">Free</span>
    </div>
    <div class="legend-item-container"><!-- added class -->
        <span class="legend-item-box reserved"></span>
        <span class="legend-text">Reserved</span>
    </div>
    <div class="legend-item-container"><!-- added class -->
        <span class="legend-item-box rented"></span>
        <span class="legend-text">Rented</span>
    </div>

  </fieldset>

    <div class="hex-wrapper">
      <div class="honeycomb">

        <div @click.stop="" class="cell" v-for="a in areaData" :key="a.id">
          <div class="cell-inner">
            <a @click.stop="action"
                class="content cell-1"
                :data-areaId="a.id"
                :class="{
                'rented': a.status == 2,
                'reserved': a.status == 1,
                'free': a.status == 0,
                }"><span :data-areaId="a.id">Fläche {{ a.id}}</span></a>
          </div>
        </div>

      </div>
    </div>
  </section>
  <ModalBottom v-if="showModal" :contentData="obj" @closeEvent="hideModal()" />
</template>

<style scoped>
#area {
  margin-top: 90px;
  background-color: #444;
}
.hex-wrapper {
  min-height: 100vh;
  margin: 0;
  background-color: #e69b00;
  display: grid;
  grid-template-rows: auto 1fr auto;
  font-family: arial, helvetica, sans-serif;

  animation: fadeInAnimation ease 3s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.honeycomb {
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1080px;
  padding: 20px 45px;
  position: relative;
}
.honeycomb,
.honeycomb *,
.honeycomb *:before,
.honeycomb *:after {
  box-sizing: border-box;
}
.honeycomb .cell {
  position: relative;
  display: block;
  vertical-align: center;
  width: 100px;
  height: 150px;
  margin: -26.5px 5.5px -26.5px 5.5px;
  text-decoration: none;
  overflow: hidden;
  transform: rotate(-120deg);
  left: -27.75px;
}
.honeycomb .cell.odd-row {
  left: 27.75px;
}
.honeycomb .cell .cell-inner {
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: rotate(60deg);
}
.honeycomb .cell .cell-inner .content {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(60deg);
  background-color: #ffcc00;
  color: #444;
}
.honeycomb .cell .cell-inner .content:hover {
  background-color: #000;
  color: #fff;
}
.honeycomb .cell:last-child {
  margin-right: 0;
}
.honeycomb .cell:nth-child(2n) .cell-inner .content {
  background-color: #ffaa00;
}
.honeycomb .cell:nth-child(2n) .cell-inner .content:hover {
  background-color: #000;
  color: #fff;
}
.honeycomb .cell span {
  position: absolute;
  text-align: center;
  width: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.honeycomb .cell {
    cursor: pointer;
}
.rented {
    background-color: #ffaa00 !important;
}
.reserved {
    background-color: #ffcc00 !important;
}
.free {
    background-color: white !important;
}
.free:hover {
  color: gray !important;
}
/* legend box*/
fieldset {
    font-family: sans-serif;
    border: 5px solid #341C09;
    background: #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    max-width: 350px;
    margin: 0 auto;
    padding:10px;
    margin-top:20px;
    box-shadow: var(--shadow);
}

fieldset legend {
    background: #341C09;
    color: #fff;
    padding: 5px 10px ;
    border-radius: 8px;
    box-shadow: 0 0 0 5px #ddd;
    margin-left: 20px;
}
fieldset .legend-item-container {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

fieldset .legend-item-box {
  height: 20px;
  width: 30px;
  margin-right: 5px;
  border: 1px solid #999;
}
</style>
