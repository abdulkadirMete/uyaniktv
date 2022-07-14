import axiosClient from "../axios";

const authStore = {
    state: () => ({
        return: {
            user: {},
            token: sessionStorage.getItem("TOKEN"),
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

        setUserIfExist({ commit }) {
            return axiosClient.get("/user").then((res) => {
                commit("setUser", res.data);
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
            sessionStorage.removeItem("TOKEN");
        },
    },
    getters: {
        getUser: (state) => {
            return state.user;
        },
        getSession: (state) => {
            return sessionStorage.getItem("TOKEN");
        },
    },
};

export default authStore;
