<template>
  <div :class="$style.divider">
    <span>{{ heading }}</span>
  </div>
</template>
<script>
export default {
  props: {
    heading: String,
  },
};
</script>
<style module>
.divider {
  border-bottom: 5px solid var(--color-divider-bg);
  padding-bottom: 4px;
  position: relative;
  z-index: -2;
}

.divider > span {
  border-radius: var(--border-radius-md) var(--border-radius-md) 0px 0px;
  padding: 0.5rem;
  background-color: var(--color-divider-bg);
  color: var(--color-white);
  font-size: var(--font-size-xl);
  font-weight: 500;
}

@media screen and (max-width: 568px) {
  .divider > span {
    font-size: var(--font-size-l);
  }
}
</style>
