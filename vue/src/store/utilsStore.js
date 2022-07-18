const utilStore = {
    state: () => ({
        return: {
            showAside: false,
            showDropdown: false,
            showLoading: false,
            showReportModal: false,
        },
    }),
    mutations: {
        toggleAside: (state, payload) => {
            state.showAside = payload;
            !payload && document.body.setAttribute("style", "overflow:auto");
        },
        toggleDropdown: (state, payload) => {
            state.showDropdown = payload;
        },
        toggleLoading: (state, payload) => {
            state.showLoading = payload;
        },
        toggleReportModal: (state, payload) => {
            state.showReportModal = payload;
        },
    },
    actions: {
        toggleBodyScroll: (payload) => {
            return document.body.setAttribute(
                "style",
                `overflow:${payload ? "hidden" : "auto"}`
            );
        },
    },
    getters: {
        getShowAside: (state) => {
            return state.showAside;
        },
        getShowDropdown: (state) => {
            return state.showDropdown;
        },
        getShowLoading: (state) => {
            return state.showLoading;
        },
        getShowReportModal: (state) => {
            return state.showReportModal;
        },
    },
};

export default utilStore;
