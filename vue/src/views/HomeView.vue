<script setup>
import ChannelList from "../components/channelList/ChannelList.vue";
import Streams from "../components/streamList/Streams.vue";
import Hero from "../components/hero/Hero.vue";
import { RouterView } from "vue-router";
import Footer from "../components/footer/Footer.vue";
</script>

<template>
    <Hero />
    <Streams />
    <RouterView :key="$route.fullPath" />
    <ChannelList />
    <Footer />
</template>
