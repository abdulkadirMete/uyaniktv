<script>
import { RouterView } from "vue-router";
import Aside from "./components/aside/Aside.vue";
import Navigation from "./components/navigation/Navigation.vue";
import store from "./store";
import { watch, onBeforeMount } from "vue";

export default {
    components: { RouterView, Aside, Navigation },
    setup(props) {
        // setup for launch app

        onBeforeMount(() => {
            store.dispatch("setUserIfExist");
        });

        watch(
            () => store.getters.getUser,
            () => store.dispatch("checkMembership")
        );

        return { store };
    },
};
</script>

<template>
    <Navigation />
    <!-- utils -->
    <loading v-if="store.getters.getShowLoading" />
    <notifications position="top left" />
    <!-- end of utils -->
    <Aside />
    <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>

<!-- notification -->
