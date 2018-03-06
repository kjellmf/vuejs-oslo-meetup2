<template>
  <div id="main-view" class="columns">
    <div id="sidebar" class="column is-4 ">
      <orbat-panel msg="ORBAT panel"/>
    </div>
    <div id="main" class="column">
      <map-panel/>
    </div>
  </div>
</template>

<script>
import OrbatPanel from "@/components/OrbatPanel.vue";
import MapPanel from "../components/MapPanel.vue";
import MainToolbar from "../components/MainToolbar.vue";

export default {
  name: "MainView",
  components: {
    OrbatPanel,
    MapPanel,
    MainToolbar,
  }
};
</script>

<style>
  #main-view {
    height: 100%;
    margin: 0;
  }

  #sidebar {
    background-color: #e6e6e6;
    height: 100%;
  }

  #main {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>

