<template>
  <collapse-card :name="side.name">
    <div class="buttons has-addons">
      <span class="button is-small" @click="expand">Expand</span>
      <span class="button is-small" @click="collapse">Collapse</span>
      <span class="button is-small" @click="toggleHostile">Toggle hostile</span>
    </div>
    <orbat-tree ref="orbat" :units="side.units"/>
  </collapse-card>
</template>

<script>
import CollapseCard from "./CollapseCard";
import OrbatTree from "./OrbatTree";
import {setCharAt, walkSide} from "../store/utils";

export default {
  components: {
    OrbatTree,
    CollapseCard
  },
  name: "side-panel",
  data: function () {
    return {
      closed: false
    }
  },
  props: {
    side: {type: Object, required: true}
  },
  methods: {
    expand() {
      this.$refs.orbat.expandAll();
    },
    collapse() {
      this.$refs.orbat.collapseAll();
    },
    toggleHostile() {
      walkSide(this.side, (unit) => {
          if (unit.sidc[3] == 3) {
            unit.sidc = setCharAt(unit.sidc, 3, 6);
          } else {
            unit.sidc = setCharAt(unit.sidc, 3, 3);
          }
        }
      )
    }
  }

}
</script>

<style scoped>

</style>
