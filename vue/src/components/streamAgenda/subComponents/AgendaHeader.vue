<template>
  <section class="customSection">
    <div :class="$style.container">
      <div :class="$style.info"></div>
      <div :class="$style.channelGroup">
        <img :src="channel.img" alt="channel" />
        <span :class="chane"></span>
      </div>
      <button class="btnPrimary">İzle</button>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style module>
.container {
}
</style>
