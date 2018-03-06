<template>
  <div id="map"></div>
</template>

<script>
import * as L from 'leaflet';
import 'leaflet-providers';

export default {
  name: "leaflet-map",

  props: {
    zoom: {type: Number, default: 8},
    center: {type: Array, default: () => [0, 0]}
  },

  mounted() {
    let map = L.map("map");
    this.map = map;
    map.setView(this.center, this.zoom);
    let osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    /*
    let osm2 = L.tileLayer('http://localhost:8090/osm/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    */
    let satellite = L.tileLayer.provider('Esri.WorldImagery');
    osm.addTo(map);

    let baseLayers = {"OpenStreetMap": osm, "Esri.WorldImagery": satellite};
    L.control.layers(baseLayers).addTo(map);
    L.control.scale({imperial: false}).addTo(map);

    this.$emit('map-initialized', map)
  },

  methods: {
    resize() {
      this.map.invalidateSize(false);
    }
  },

  watch: {
    center: function (newCenter, oldCenter) {
      if (newCenter) this.map.panTo(newCenter);
    },
    zoom() {
        this.map.setZoom(this.zoom)
    }
  }
}
</script>

<style scoped>

  #map {
    z-index: 0;
  }
</style>
