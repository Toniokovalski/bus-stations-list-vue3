import { createStore } from 'vuex';
import axios from "axios";

interface LinesInterface {
  [key: string]: {
    [key: string]: string[];
  };
}

interface ResponseObject {
  line: number;
  order: number;
  stop: string;
  time: string;
}

interface RootState {
  linesDataObj: LinesInterface;
  selectedLine: string | null;
  selectedStop: string | null;
  allStationsList: string[];
}

export default createStore<RootState>({
  state: {
    linesDataObj: {},
    selectedLine: null,
    selectedStop: null,
    allStationsList: []
  },
  getters: {
    getLines:(state) => Object.keys(state.linesDataObj),
    getSelectedLine: (state) => state.selectedLine,
    getSelectedStop: (state) => state.selectedStop,
    getAllStationsList: (state) => state.allStationsList
  },
  mutations: {
    setBusBoardDataObj(state, linesData) {
      state.linesDataObj = linesData;
    },
    setSelectedLine(state, line) {
      state.selectedLine = line;
    },
    setSelectedStop(state, stop) {
      state.selectedStop = stop
    },
    setAllStationsList(state, stationsList) {
      state.allStationsList = stationsList
    }
  },
  actions: {
    async fetchDataFromAPI({ commit }) {
      try {
        const response = await axios.get<ResponseObject[]>('http://localhost:3000/stops');

        const orderedLines: LinesInterface = {};
        const stationsList: string[] = []

        response.data.forEach((item: ResponseObject) => {
          const { line, stop, time } = item;
          if (!orderedLines[line]) orderedLines[line] = {};
          if (!orderedLines[line][stop]) orderedLines[line][stop] = [];

          orderedLines[line][stop].push(time);

          stationsList.indexOf(stop) === -1 && stationsList.push(stop)
        });

        stationsList.sort((a, b) => a.localeCompare(b))

        commit('setAllStationsList',stationsList)
        commit('setBusBoardDataObj', orderedLines);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    },

    selectLine({ commit }, line) {
      commit('setSelectedLine', line);
    },
    selectStop({commit}, stop) {
      commit('setSelectedStop', stop)
    }
  },
  modules: {
  }
})
