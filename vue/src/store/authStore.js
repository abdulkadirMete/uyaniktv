import axiosClient from "../axios";
import moment from "moment";
import { dateFormat } from "../data/options";

const authStore = {
    state: () => ({
        return: {
            user: null,
            token: sessionStorage.getItem("TOKEN"),
            isValidMembership: false,
        },
    }),
    actions: {
        // register
        register({ commit }, user) {
            return axiosClient.post("/kaydol", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },
        // login
        login({ commit }, user) {
            return axiosClient.post("/giris", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },
        // logout
        logout({ commit }) {
            return axiosClient.post("/cikis").then((response) => {
                commit("logout");
                return response;
            });
        },
        // session
        setUserIfExist({ commit }) {
            return axiosClient.get("/user").then((response) => {
                commit("setUser", response.data);
                return response.data;
            });
        },
        // buy user membership
        buyMembership(_, membershipObject) {
            return axiosClient
                .post("/buy", membershipObject)
                .then((response) => {
                    return response;
                });
        },

        // buy membership
        checkMembership({ commit }) {
            return axiosClient.get("/membership").then((response) => {
                console.log(response.data.success);
                commit("setMembership", response.data.success);
            });
        },
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
        },
        setToken: (state, token) => {
            state.token = token;
            sessionStorage.setItem("TOKEN", token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isValidMembership = false;
            sessionStorage.removeItem("TOKEN");
        },
        setMembership: (state, payload) => {
            state.isValidMembership = payload;
        },
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
        getSession: () => {
            return sessionStorage.getItem("TOKEN");
        },
        getMembership: (state) => {
            return state.isValidMembership;
        },
    },
};


export default authStore;
