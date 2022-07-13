<template>
  <router-link :to="`/canli-izle/${id}`" :class="$style.container" replace>
    <div :class="$style.resultGroup">
      <div :class="$style.resultImgContainer">
        <img :src="channel.img" alt="result" :class="$style.resultImg" />
      </div>
      <div :class="$style.infoGroup">
        <span :class="$style.channelName">{{ channel.title }}</span>
        <div :class="$style.streamInfoGroup"></div>
      </div>
    </div>
    <!-- icon -->
    <font-awesome-icon icon="fa-solid fa-circle-plus" :class="$style.icon" />
  </router-link>
</template>
<script>
export default {
  props: {
    channel: Object,
    id: Number,
  },
};
</script>
<style module>
.container {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.resultGroup {
  display: flex;
  column-gap: 0.5rem;
  cursor: pointer;
}

.resultImgContainer {
  padding: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-white);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-highlight-text2);
}

.resultImg {
  width: var(--small-icon-size);
  height: var(--small-icon-size);
  object-fit: cover;
}

.channelName {
  color: var(--color-divider-bg);
  font-weight: 600;
  font-size: var(--font-size-ml);
}

.streamInfoGroup {
  display: flex;
  flex-direction: column;
}

.icon {
  font-size: var(--small-icon-size);
  color: var(--color-divider-bg);
}
</style>
