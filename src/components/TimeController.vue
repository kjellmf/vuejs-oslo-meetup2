<template>
  <b-field>
    <b-datepicker
      v-model="currentDate"
      icon="calendar-alt"
      :min-date="minDate"
      :max-date="maxDate"
      :date-formatter="(date) => date.toDateString()"
      position="is-bottom-left">
    </b-datepicker>
    <p class="control">
      <button class="button" @click="decDate">
        <b-icon icon="arrow-circle-left"></b-icon>
      </button>
    </p>
    <p class="control">
      <button class="button" @click="incDate">
        <b-icon icon="arrow-circle-right"></b-icon>
      </button>
    </p>
  </b-field>
</template>

<script>

import {SET_CURRENT_TIME} from "../store/action-types";

export default {
  name: "time-controller",
  computed: {
    scenario() {
      return this.$store.state.scenario;
    },
    currentDate: {
      get() {
        return new Date(this.$store.state.currentTime);

      },
      set(value) {
        this.$store.dispatch(SET_CURRENT_TIME, value.getTime())
      }
    },
  },

  data() {
    return {
      minDate: new Date(Date.parse("1982-04-01")),
      maxDate: new Date(Date.parse("1982-06-15")),
    }
  },

  methods: {
    incDate() {
      let d = this.currentDate;
      d.setDate(d.getDate() + 1);
      this.currentDate = d;

    },
    decDate() {
      let d = this.currentDate;
      d.setDate(d.getDate() - 1);
      this.currentDate = d;
    }
  }
}
</script>

<style scoped>

</style>
