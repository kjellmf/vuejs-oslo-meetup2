<template>
  <span class="milsymbol"></span>
</template>

<script>
import ms from "milsymbol";

export default {
  name: "MilSymbol",
  props: {
    sidc: String,
    size: {
      type: Number,
      default: 15
    },
    modifiers: {
      type: Object
    }
  },
  mounted() {
    this.setSymbol();
  },
  methods: {
    setSymbol() {
      let symb = new ms.Symbol(this.sidc, {size: this.size}, this.modifiers || {});
      this.$el.innerHTML = symb.asSVG();
    }
  },
  watch: {
    sidc: function (v) {
      this.setSymbol();
    },
    size: function (v) {
      this.setSymbol();
    }

  },
};

// This is how you can change the frame fill color:
// var cm = ms.getColorMode("Light");
// cm.Friend = cm.Neutral;
// var symb = new ms.Symbol(sidc, {colorMode:cm});
// symb.setOptions({fillColor: "rgb(255,0,0)"})

</script>

<style>

</style>
