<template>
  <ul>
    <orbat-item v-for="rootUnit in units" :unit="rootUnit"></orbat-item>
  </ul>
</template>

<script>
import OrbatItem from "./OrbatItem";

export default {
  components: {OrbatItem},
  name: "orbat-tree",
  props: {
    units: {type: Array, required: true}
  },
  methods: {
    expandAll() {
      for (let orbatItem of this.$children) {
        if (orbatItem.expandAll) orbatItem.expandAll();
      }
    },

    collapseAll() {
      for (let orbatItem of this.$children) {
        if (orbatItem.collapseAll) orbatItem.collapseAll();
      }
    }
  }
}
</script>

<style>
  .milsymbol {
    vertical-align: middle;
  }
</style>
