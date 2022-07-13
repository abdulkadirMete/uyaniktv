<script setup>
import { RouterView } from "vue-router";
import Aside from "./components/aside/Aside.vue";
import Navigation from "./components/navigation/Navigation.vue";
import store from "./store";
store.dispatch("setUserIfExist");

</script>

<template>
  <Navigation />
  <!-- utils -->
  <loading v-if="this.$store.getters.getShowLoading" />
  <notifications position="top left" />
  <!-- end of utils -->
  <Aside />
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>

<!-- notification -->
