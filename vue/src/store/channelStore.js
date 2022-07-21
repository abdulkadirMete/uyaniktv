import { dummyChannels } from "../data/dummyData";
import axiosClient from "../axios";

const channelStore = {
    state: () => ({
        return: {
            channels: [],
            searchResults: [],
            singleChannel: null,
            singleChannelGuide: null,
        },
    }),
    mutations: {
        setChannels: (state, payload) => {
            state.channels = payload;
        },
        setSingleChannel: (state, payload) => {
            state.singleChannel = payload;
        },
        clearSearchResults: (state, payload) => {
            state.searchResults = [];
        },
        setSearchResults: (state, payload) => {
            state.searchResults = payload;
        },
        setSingleChannelGuide: (state, payload) => {
            state.singleChannelGuide = payload;
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
        searchChannel: ({ state, commit }, payload) => {
            const tmpArray = state.channels.filter((channel, _) =>
                channel.title.toUpperCase().includes(payload.toUpperCase())
            );
            commit("setSearchResults", tmpArray);
        },

        fetchGuide: ({ commit, state }, guideKey) => {
            console.log(state.singleChannel.guideKey);
            return axiosClient
                .get(`/stream-list/${state.singleChannel.guideKey}`)
                .then(({ data }) => {
                    commit("setSingleChannelGuide", data.Programs.Program);
                    return data.Programs.Program;
                })
                .catch((err) => {
                    console.log(err);
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
        getSearchResults: (state) => {
            return state.searchResults;
        },
        getGuide: (state) => {
            return state.singleChannelGuide;
        },
    },
};

export default channelStore;
