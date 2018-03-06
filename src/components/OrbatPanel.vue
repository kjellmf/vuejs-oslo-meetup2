<template>
  <div class="full-height">
    <div id="orbat-panel">
      <side-panel v-for="side in scenario.sides" :side="side" :key="side.name"/>
    </div>
    <active-unit-panel class="u-panel"></active-unit-panel>
  </div>
</template>

<script>

import SidePanel from "./SidePanel";
import ActiveUnitPanel from "./ActiveUnitPanel";

export default {
  components: {
    ActiveUnitPanel,
    SidePanel},
  name: "OrbatPanel",
  props: {
    msg: String
  },

  computed: {
    scenario() {
      return this.$store.state.scenario;
    },
    visibleUnits() {
      return this.$store.getters.unitsWithPositions;
    },
    currentUnit() {
      return this.$store.state.currentUnit;
    }
  }
}
;
</script>

<style scoped>
  .card {
    margin-bottom: 0.5em
  }

  .full-height{
    height:100%;
  }

  #orbat-panel {
    max-height: 70%;
    overflow: auto;
  }
  .u-panel {
    max-height:30%;
    overflow:auto;
  }
</style>


