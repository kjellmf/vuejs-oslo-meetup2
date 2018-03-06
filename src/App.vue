<template>
  <div id="app">
    <main-toolbar class="main-toolbar"/>
    <div class="app-view">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import MainToolbar from "./components/MainToolbar.vue";
import * as testScenario from "@/testscenario.json";
import {LOAD_SCENARIO} from "./store/action-types";

export default {
  components: {MainToolbar},
  created() {
    this.$store.dispatch(LOAD_SCENARIO, testScenario);
  }
};
</script>


<style>
  :root {
    --header-height: 3.25rem;

  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .main-toolbar {
    height: var(--header-height);
  }

  .app-view {
    height: calc(100% - var(--header-height));
  }
</style>
