/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import {ADD_UNIT_POSITION, LOAD_SCENARIO, SELECT_UNIT, SET_CURRENT_TIME} from './action-types';
import {
  CLEAR_DRAGGED_UNIT, SET_CURRENT_UNIT, SET_DRAGGED_UNIT, SET_END_TIME, SET_SCENARIO,
  SET_START_TIME
} from './mutation-types';
import {prepareScenario, walkSide} from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    scenario: null,
    currentUnit: null,
    draggedUnit: null,
    reload: false,
    currentTime: 0,
    startTime: 0,
    endTime: 0,
  },
  mutations: {
    [SET_SCENARIO](state, scenario) {
      state.scenario = scenario;
    },
    TOGGLE_RELOAD(state) {
      state.reload = !state.reload;
    },
    SET_CURRENT_UNIT(state, unit) {
      state.currentUnit = unit;
    },
    [SET_DRAGGED_UNIT](state, draggedUnit) {
      state.draggedUnit = draggedUnit;
    },
    [CLEAR_DRAGGED_UNIT](state) {
      state.draggedUnit = null;
    },
    [SET_CURRENT_TIME](state, newTime) {
      state.currentTime = newTime;
    },
    [SET_START_TIME](state, newTime) {
      state.startTime = newTime;
    },

    [SET_END_TIME](state, newTime) {
      state.entTime = newTime;
    },
  },
  actions: {
    [LOAD_SCENARIO]({commit, state, dispatch}, scenario) {
      const scn = prepareScenario(scenario);
      const startTime = scn.startTime;

      commit(SET_SCENARIO, scn);
      if (startTime) {
        commit(SET_START_TIME, startTime);
        dispatch(SET_CURRENT_TIME, startTime);
      } else {
        dispatch(SET_CURRENT_TIME, 0);
      }

      commit('TOGGLE_RELOAD', !state.reload);
    },

    [SELECT_UNIT]({commit}, unit) {
      commit(SET_CURRENT_UNIT, unit);
    },

    [ADD_UNIT_POSITION]({state}, payload) {
      const t = state.currentTime;
      const {unit} = payload;
      const newState = {t: state.currentTime, coordinates: payload.coordinates};
      unit._state = newState;

      for (let i = 0, len = unit.state.length; i < len; i++) {
        if (t < unit.state[i].t) {
          unit.state.splice(i, 0, newState);
          return;
        } else if (t === unit.state[i].t) {
          // need to use Vue.set here so that we trigger the reactivity system
          // See https://vuejs.org/v2/guide/list.html#Caveats
          Vue.set(unit.state, i, newState);
          return;
        }
      }
      unit.state.push(newState);
    },

    [SET_CURRENT_TIME]({commit, state}, newTime) {
      commit(SET_CURRENT_TIME, newTime);
      for (const side of state.scenario.sides) {
        walkSide(side, (unit) => {
          if (!unit.state.length) return;
          let tmpstate = null;
          for (const s of unit.state) {
            if (s.t <= newTime) {
              tmpstate = s;
            } else {
              break;
            }
          }
          unit._state = tmpstate;
        });
      }
    },
  },
  getters: {
    isScenarioLoaded: state => !(state.scenario == null),

    unitsWithPositions: (state) => {
      const ul = [];
      for (const side of state.scenario.sides) {
        walkSide(side, (u) => {
          if (u._state && u._state.coordinates) {
            ul.push(u);
          }
        });
      }
      return ul;
    },
  },
});
