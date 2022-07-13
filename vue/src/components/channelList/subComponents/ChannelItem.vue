<template>
  <router-link :to="`/canli-izle/${id}`" :class="$style.channelItem">
    <div :class="$style.channelContainer">
      <img :src="channel.img" alt="channel" :class="$style.channelImg" />
      <div :class="$style.channelInfo">
        <span :class="$style.channelName">{{ channel.title }}</span>
        <div :class="$style.channelTagGroup">
          <span v-if="channel.hdr" :class="$style.channelTagItem">HDR</span>
          <span v-if="channel.dvr" :class="$style.channelTagItem">DVR</span>
        </div>
      </div>
    </div>
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
.channelItem {
  height: 200px;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.channelItem:hover {
  transform: translateY(-10px);
}

.channelContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.channelImg {
  width: 100px;
  height: 80px;
  margin: 1rem 0;
  object-fit: cover;
}

.channelInfo {
  display: flex;
  background-color: var(--color-divider-bg);
  width: 100%;
  max-height: 96px;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
}

.channelName {
  font-size: var(--font-size-l);
  font-weight: 500;
  color: var(--color-white);
}

.channelTagGroup {
  display: flex;
  column-gap: 0.75rem;
}

.channelTagItem {
  font-size: var(--font-size-xsm);
  padding: 4px;
  font-weight: 500;
  color: var(--color-highlight-text);
  border: 1px solid var(--color-highlight-text);
}

@media screen and (max-width: 1168px) {
  .channelInfo {
    flex-direction: column;
    row-gap: 1rem;
    column-gap: 0;
    justify-content: space-between;
  }
}
</style>
