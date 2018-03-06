<template>
  <div class="a-map" @dragover="onDragOver" @drop="onDrop">
    <leaflet-map :center="center" :zoom="8" class="a-map" @map-initialized="onMapInitialized"/>
  </div>
</template>

<script>
import LeafletMap from '../components/LeafletMap.vue';
import * as L from 'leaflet';
import ms from 'milsymbol';
import {ADD_UNIT_POSITION, SELECT_UNIT} from "../store/action-types";

function createSymbolIcon(sidc, size = 20) {
  let mysymbol = new ms.Symbol(sidc, {size: size});
  let anchor = mysymbol.getAnchor();
  return L.icon({
    iconUrl: mysymbol.toDataURL(),
    iconAnchor: [anchor.x, anchor.y],
  });
}

var data = {
  center: [-51.7963, -59.5236]
};

export default {
  name: "DemoMapPanel",
  components: {LeafletMap},
  data: function () {
    return data;
  },

  mounted() {
    let markers = L.layerGroup();
    markers.addTo(this.map);
    this.markers = markers;
  },
  computed: {
    visibleUnits() {
      return this.$store.getters.unitsWithPositions;
    },
    reloaded() {
      return this.$store.state.reload;
    },
    currentTime() {
      return this.$store.state.currentTime;
    }
  },

  methods: {
    onMapInitialized(lMap) {
      this.map = lMap;
    },

    onDragOver(ev) {
      ev.preventDefault();
    },

    createUnitMarker(unit, latLng) {
      const sidc = unit.sidc;
      let icon = createSymbolIcon(sidc);
      let marker = L.marker(latLng, {icon: icon, draggable: true});
      marker["unit"] = unit;
      marker.on('click', (e) => {
        console.log("Clicked on ", e.target.unit.name);
      });
      marker.on('moveend', (e) => {
        let coordinates = L.GeoJSON.latLngToCoords(e.target.getLatLng());
        console.log("Unit moved", e.target.unit.name, coordinates);
      });
      return marker;
    },

    onDrop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
      if (data == "move-unit") {
        let unit = this.$store.state.draggedUnit;
        let dropPosition = this.map.mouseEventToLatLng(ev);
        let marker = this.createUnitMarker(unit, dropPosition);
        this.markers.addLayer(marker);
      }
    }
  }
};
</script>

<style>
  .a-map {
    height: 500px;
    padding: 0;
    margin: 0;
  }
</style>
