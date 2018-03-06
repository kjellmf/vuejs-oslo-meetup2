<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" v-show="$route.path !== '/demo'">
    <div class="navbar-brand">
      <span v-if="scenario" class="navbar-item">
        <b>{{scenario.name}}</b>
      </span>
        <router-link class="navbar-item" to="/">Home</router-link>
        <!--<router-link class="navbar-item" to="/demo">Demo</router-link>-->
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <b-dropdown hoverable>
          <a class="navbar-item" slot="trigger">
            <span>File</span>
            <b-icon icon="caret-down"></b-icon>
          </a>
          <b-dropdown-item @click="loadScenario">Load scenario</b-dropdown-item>
          <b-dropdown-item @click="download">Download scenario</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div class="navbar-end">
      <span class="navbar-item">
        <time-controller/>
      </span>
    </div>
    <b-modal :active.sync="isModalActive" has-modal-card>
      <load-scenario-modal/>
    </b-modal>
  </nav>
</template>

<script>

import FileSaver from 'file-saver';
import LoadScenarioModal from './LoadScenarioModal'
import {SET_CURRENT_TIME} from "../store/action-types";
import {stringifyScenario} from "../store/utils";
import TimeController from "./TimeController";

export default {
  name: "MainToolbar",
  components: {
    TimeController,
    LoadScenarioModal,
  },
  computed: {
    scenario() {
      return this.$store.state.scenario;
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    download() {
      FileSaver.saveAs(
        new Blob(
          [stringifyScenario(this.scenario)]
          , {type: "application/json"}
        )
        , "scenario.json"
      );
    },

    loadScenario() {
      this.isModalActive = true;
    }
  }
};
</script>

<style>

</style>
