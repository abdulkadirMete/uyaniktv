<template>
  <div :class="[$style.errorContainer, { [$style.showError]: error }]">
    <font-awesome-icon
      icon="fa-solid fa-circle-exclamation"
      :class="$style.errorIcon"
    />
    <p :class="$style.errorMessage">
      {{ error }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    error: String,
  },
  setup() {},
};
</script>

<style module>
/* errors */

.errorContainer {
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-md);
  position: absolute;
  top: -60px;
  left: 0;
  right:0;
  background-color: var(--color-black);
  padding: 1rem 1.5rem;
  column-gap: 0.5rem;
  transform: translateY(100%);
  z-index: -1;
  transition: 0.3s all linear;
  opacity: 0;
}

.showError {
  transform: translateY(0%);
  opacity: 1;
}

.errorIcon {
  font-size: var(--small-icon-size);
  color: var(--color-fail-red);
}

.errorMessage {
  font-size: var(--font-size-normal);
  color: var(--color-fail-red);
}
</style>
