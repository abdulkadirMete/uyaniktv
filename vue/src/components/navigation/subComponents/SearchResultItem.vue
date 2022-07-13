<template>
    <div :class="$style.resultGroup">
      <div :class="$style.resultImgContainer">
        <img :src="channel.img" alt="result" :class="$style.resultImg" />
      </div>
      <div :class="$style.infoGroup">
        <span :class="$style.channelName">{{ channel.title }}</span>
        <div :class="$style.streamInfoGroup">
          <span :class="$style.currentStreamInfo">Atv Anahaber</span>
          <span :class="$style.currentStreamValue">15:00 - 17:00 </span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    channel: Object,
  },
};
</script>
<style module>


.resultGroup {
  display: flex;
  column-gap: 1rem;
  align-items: center;
  border-radius: var(--border-radius-md);
  padding: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
}

.resultGroup:hover {
  background-color: var(--color-black-soft);
}

.resultImgContainer {
  padding: 0.5rem;
  border-radius: 50%;
  background-color: var(--color-white);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-highlight-text2);
  box-shadow: rgb(0 0 0 / 63%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
}

.resultImg {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.infoGroup {
  display: flex;
  flex-direction: column;
  row-gap: 0.5 rem;
}

.channelName {
  color: var(--color-light-gray);
  font-weight: 600;
  font-size: var(--font-size-ml);
}

.streamInfoGroup {
  display: flex;
  flex-direction: column;
}

.currentStreamInfo {
  color: var(--color-light-gray);
}

.currentStreamValue {
  color: var(--color-highlight-text);
  font-size: var(--font-size-sm);
}
</style>
