<template>
  <div :class="[$style.container, { [$style.active]: isActive }]">
    <span :class="$style.hour">{{ hour }}</span>
    <span :class="$style.program">{{ program }}</span>
    <span
      class="material-symbols-outlined"
      v-if="isActive"
      :class="$style.activeIcon"
    >
      cast
    </span>
  </div>
</template>
<script>
export default {
  props: {
    hour: String,
    program: String,
    isActive: Boolean,
  },
};
</script>
<style module>
.container {
  display: flex;
  column-gap: 0.75rem;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  color: var(--color-divider-bg);
  cursor: pointer;
}

.active {
  background-color: var(--color-light-gray);
  color: var(--color-success-green);
}
.activeIcon {
  color: var(--color-success-green);
  font-size: var(--small-icon-size);
}
</style>
