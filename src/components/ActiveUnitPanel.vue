<template>
  <collapse-card name="Current unit">
    <div v-if="unit">
      <div class="columns">
        <div class="column is-2">
          <mil-symbol :sidc="unit.sidc" :size="40"></mil-symbol>
        </div>
        <div class="column">
          <p class="title is-6">{{unit.name}}</p>
          <table v-if="unit.state.length" class="table is-bordered is-striped is-fullwidth">
            <thead>
            <th>State</th>
            <th>Position</th>
            </thead>
            <tbody>
            <tr v-for="state in unit.state">
              <td @click="setTime(state.t)">{{state.t|dateStr}}</td>
              <td>{{state.coordinates|position}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </collapse-card>
</template>

<script>
import CollapseCard from "./CollapseCard";
import OrbatTree from "./OrbatTree";
import {setCharAt, walkSide} from "../store/utils";
import MilSymbol from "./MilSymbol";
import {SET_CURRENT_TIME} from "../store/action-types";

export default {
  components: {
    MilSymbol,
    CollapseCard
  },
  name: "ActiveUnitPanel",
  data: function () {
    return {}
  },

  computed: {
    unit() {
      return this.$store.state.currentUnit;
    }
  },
  methods: {
    setTime(t) {
      this.$store.dispatch(SET_CURRENT_TIME, t);
    }
  }

}
</script>

<style scoped>

</style>
