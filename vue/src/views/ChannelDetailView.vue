<template>
    <div
        :class="$style.container"
        @mouseenter="store.commit('toggleDropdown', false)"
    >
        <PlayerHeading
            :channelImg="getSingleChannel?.img"
            :channelName="getSingleChannel?.title"
            @toggleModal="toggleModal"
        />
        <ReportProblem v-if="getShowReportModal" />
        <Player :streamLink="getSingleChannel?.streamLink" />
    </div>
</template>
<script>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { mapGetters, useStore } from "vuex";
import Player from "../components/player/Player.vue";
import PlayerHeading from "../components/playerHeading/PlayerHeading.vue";
import ReportProblem from "../components/playerHeading/subComponents/ReportProblem.vue";
import store from "../store";

export default {
    components: {
        Player,
        PlayerHeading,
        ReportProblem,
    },
    computed: {
        ...mapGetters(["getSingleChannel", "getShowReportModal"]),
    },

    setup(props) {
        const route = useRoute();
        const store = useStore();

        const loading = (state) => {
            store.commit("toggleLoading", state);
        };

        // listen router param
        watch(
            () => route.params.id,
            (newId) => {
                // route param undefined then return
                if (!newId) return;
                loading(true);
                // get channel
                store
                    .dispatch("fetchSingleChannel", route.params.id)
                    .then(() => {
                        loading(false);
                        store.commit("toggleGuideLoading", true);

                        store
                            .dispatch("fetchGuide").then(() =>  store.commit("toggleGuideLoading", false))
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            },
            { immediate: true }
        );

        const toggleModal = () => {};

        return { store, route, toggleModal };
    },
};
</script>
<style module>
.container {
    max-width: 90%;
    margin: 0 auto;
}
</style>
