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

function createSelectedSymbolIcon(sidc, modifiers, size = 20) {
  let mysymbol = new ms.Symbol(sidc, {
    size: size, outlineColor: 'Yellow',
    outlineWidth: 10,
    higherFormation: modifiers.higherFormation, uniqueDesignation: modifiers.uniqueDesignation
  });
  let anchor = mysymbol.getAnchor();
  let myicon = L.icon({
    iconUrl: mysymbol.toDataURL(),
    iconAnchor: [anchor.x, anchor.y],
  });
  return myicon;
}


var data = {
  center: [-51.7963, -59.5236]
};

export default {
  name: "MapPanel",
  components: {LeafletMap},
  data: function () {
    return data;
  },

  mounted() {
    let markers = L.layerGroup();
    markers.addTo(this.map);
    this.markers = markers;

    this.setupMarkers();

  },
  computed: {
    visibleUnits() {
      return this.$store.getters.unitsWithPositions;
    },
    reloaded() {
      return this.$store.state.reload;
    },
  },

  methods: {
    onMapInitialized(lMap) {
      this.map = lMap;
    },

    onDragOver(ev) {
      ev.preventDefault();
    },

    setupMarkers() {
      this.markers.clearLayers();
      for (const unit of this.visibleUnits) {
        let pos = L.GeoJSON.coordsToLatLng(unit._state.coordinates);
        let marker = this.createUnitMarker(unit, pos);
        this.markers.addLayer(marker);
        // marker.addTo(this.map);
      }
    },

    createUnitMarker(unit, latLng) {
      const us = unit._state || {};
      const sidc = us.sidc || unit.sidc;
      let icon = createSymbolIcon(sidc);
      let marker = L.marker(latLng, {icon: icon, draggable: true});
      marker["unit"] = unit;
      marker.on('click', (e) => {
        this.$store.dispatch(SELECT_UNIT, e.target.unit);
      });
      marker.on('moveend', (e) => {
        let coordinates = L.GeoJSON.latLngToCoords(e.target.getLatLng());
        this.$store.dispatch(ADD_UNIT_POSITION, {unit, coordinates});
      });
      return marker;
    },

    onDrop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");
      if (data == "move-unit") {
        let unit = this.$store.state.draggedUnit;
        let dropPosition = this.map.mouseEventToLatLng(ev);
        let coordinates = L.GeoJSON.latLngToCoords(dropPosition);
        this.$store.dispatch(ADD_UNIT_POSITION, {unit, coordinates});
        let marker = this.createUnitMarker(unit, dropPosition);
        this.markers.addLayer(marker);
      }
    }
  },
  watch: {
    reloaded: function () {
      this.setupMarkers();
    },
    visibleUnits: function () {
      this.setupMarkers();
    }
  }
};


</script>

<style>
  .a-map {
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
