<template>
    <div
        :class="$style.container"
        @mouseenter="store.commit('toggleDropdown', false)"
    >
        <PlayerHeading
            :channelImg="store.getters.getSingleChannel?.img"
            :channelName="store.getters.getSingleChannel?.title"
            @toggleModal="toggleModal"
        />
        <ReportProblem v-if="store.getters.getShowReportModal" />
        <Player :streamUrl="store.getters.getSingleChannel?.streamLink" />
    </div>
</template>
<script>
import { notify } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Player from "../components/player/Player.vue";
import PlayerHeading from "../components/playerHeading/PlayerHeading.vue";
import { watch } from "vue";
import ReportProblem from "../components/playerHeading/subComponents/ReportProblem.vue";

export default {
    components: {
    Player,
    PlayerHeading,
    ReportProblem
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
                loading(true);
                store
                    .dispatch("fetchSingleChannel", route.params.id)
                    .then(() => loading(false))
                    .catch((error) => {
                        loading(false);
                        notify(
                            notifyMaker(
                                "Bir hata oluştu daha sonra tekrar deneyiniz",
                                "error"
                            )
                        );
                    });
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
