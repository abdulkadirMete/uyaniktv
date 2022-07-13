import { dummyChannels } from "../data/dummyData";
import axiosClient from "../axios";

const channelStore = {
  state: () => ({
    return: {
      channels: [],
      searchResults: [],
      singleChannel: {},
    },
  }),
  mutations: {
    setChannels: (state, payload) => {
      state.channels = payload;
    },
    setSingleChannel: (state, payload) => {
      state.singleChannel = payload;
    },

    searchChannel: (state, payload) => {
      const tmpArray = dummyChannels.filter((channel, _) =>
        channel.title.toUpperCase().includes(payload.toUpperCase())
      );
      state.searchResults.push(...tmpArray);
    },
    clearSearchResults: (state, payload) => {
      state.searchResults = [];
    },
  },
  actions: {
    fetchChannels: ({ commit }) => {
      return axiosClient.get("/kanallar").then(({ data }) => {
        commit("setChannels", data);
      });
    },
    fetchSingleChannel: ({ commit }, id) => {
      return axiosClient.get(`/canli-izle/${id}`).then(({ data }) => {
        commit("setSingleChannel", data[0]);
        return data[0];
      });
    },
  },
  getters: {
    getChannels: (state) => {
      return state.channels;
    },
    getSingleChannel: (state) => {
      return state.singleChannel;
    },
    startNewFetch: (state) => {
      if (state.channels) {
        return false;
      } else {
        return true;
      }
    },
  },
};

export default channelStore;
