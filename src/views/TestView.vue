<template>
<div class="container">
  <div class="columns">
    <section class="column">
      <div>
        <h1 class="title" @click="mshow=!mshow"><code>mil-symbol</code> demo</h1>
        <div class="box" v-if="mshow">
          <div class="field">
            <label class="label">SIDC</label>
            <input class="input" v-model="sidc"/>
          </div>
          <div class="field">
            <label class="label">Size</label>
            <input class="input" v-model.number="size" type="number">
          </div>

          <mil-symbol :sidc="sidc" :size="size"></mil-symbol>
          <div class="control">
            <button class="button" @click="toggle">Toggle hostile</button>
          </div>
          <br>
          <div class="box">
          <p>
            <mil-symbol sidc="10031002181211020000"/>
            <mil-symbol sidc="10061540331112030000"/>
            <mil-symbol sidc="10060200001100000102"/>
          </p>
        </div>
        </div>
      </div>
      <br>

      <div>
        <h1 class="title" @click="oshow = !oshow"><code>orbat-tree</code> demo</h1>
        <div class="box" v-if="oshow">
          <p>{{sides[0].name}}</p>
          <orbat-tree :units="sides[0].units"></orbat-tree>
          <br>
          <p>{{sides[1].name}}</p>
          <orbat-tree :units="sides[1].units"></orbat-tree>
        </div>
      </div>  
    </section>

    <section class="column">
      <div>
        <h1 class="title" @click="lshow = !lshow"><code>leaflet-map</code> demo</h1>
        <div class="box" v-if="lshow">
          <leaflet-map class="lmap" :center="center"></leaflet-map>
        </div>
      </div> 
      <br>

      <div>
        <h1 class="title" @click="l2show = !l2show"><code>drag-drop</code> demo</h1>
        <div class="box" v-if="l2show">
          <demo-map-panel/>
        </div>
      </div> 

    </section>
  </div>
</div>
</template>

<script>
import MilSymbol from "../components/MilSymbol";
import { setCharAt } from "../store/utils";
import OrbatTree from "../components/OrbatTree";
import LeafletMap from "../components/LeafletMap";
import DemoMapPanel from "../components/DemoMapPanel";

const data = {
  sidc: "10031000181211004600",
  size: 40,
  oshow: false,
  mshow: false,
  lshow: false,
  l2show: false,
  center: [-51.7963, -59.5236]
};

export default {
  components: {
    OrbatTree,
    MilSymbol,
    LeafletMap,
    DemoMapPanel,
  },
  name: "test-view",
  data: function() {
    return data;
  },
  methods: {
    toggle() {
      if (this.sidc[3] == 3) {
        this.sidc = setCharAt(this.sidc, 3, 6);
      } else {
        this.sidc = setCharAt(this.sidc, 3, 3);
      }
    }
  },
  computed: {
    sides() {
      return this.$store.state.scenario.sides;
    },
  }
};
</script>
<style>
.lmap {
  height:600px;
  margin:0;
  padding:0;
}
</style>
