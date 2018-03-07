<template>
  <li>
    <span @dblclick="toggle" @click="select" class="unit-name" :class="{current: isCurrent, hasPosition}">
      <span draggable="true" @dragstart="dragStart" @dragend="dragEnd"><mil-symb :sidc="sidc"/></span>
      {{unit.name}}
      <span v-if="isParent"><i class="far" :class="{'fa-minus-square': isOpen, 'fa-plus-square':!isOpen}"
                               @click="toggle"></i></span>
    </span>
    <ul v-show="isOpen">
      <orbat-item :unit="subUnit" v-for="subUnit in unit.subUnits" :key="subUnit.name"/>
    </ul>
  </li>
</template>

<script>
import MilSymbol from "./MilSymbol";
import {SELECT_UNIT} from "../store/action-types";
import {CLEAR_DRAGGED_UNIT, SET_DRAGGED_UNIT} from "../store/mutation-types";

export default {
  components: {MilSymbol},
  name: "orbat-item",
  props: {
    unit: {
      type: Object,
      required: true,
    }
  },
  data: function () {
    return {
      isOpen: false,
    }
  },
  computed: {
    isParent() {
      return this.unit.subUnits && this.unit.subUnits.length;
    },
    isCurrent() {
      return (this.unit == this.$store.state.currentUnit);
    },
    hasPosition() {
      if (this.unit._state && this.unit._state.coordinates) {
        return true;
      }
      return false;
    },
    sidc() {
      const us = this.unit._state || {};
      return us.sidc || this.unit.sidc;
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },

    select() {
      this.$store.dispatch(SELECT_UNIT, this.unit);
    },
    
    dragStart(ev) {
      this.$store.commit(SET_DRAGGED_UNIT, this.unit);
      ev.dataTransfer.setData("text", "move-unit");
      ev.dataTransfer.dropEffect = "copy";
      ev.target["style"].opacity = .5;
    },

    dragEnd(ev) {
      ev.target["style"].opacity = "";
      this.$store.commit(CLEAR_DRAGGED_UNIT);
    },

    expandAll() {
      this.isOpen = true;
      for (let orbatItem of this.$children.filter(el => el.expandAll)) {
        orbatItem.isOpen = true;
        orbatItem.expandAll();
      }
    },

    collapseAll() {
      this.isOpen = false;
      for (let orbatItem of this.$children.filter(el => el.collapseAll)) {
        orbatItem.isOpen = false;
        orbatItem.collapseAll();
      }
    }

  }
}
</script>

<style scoped>
  ul {
    padding-left: 2em;
  }

</style>

<style>
  .unit-name {
    /*vertical-align: text-top;*/
  }

  .current {
    font-weight: bold;
  }

  .hasPosition::after {
    content: "\00d7";
  }
</style>
