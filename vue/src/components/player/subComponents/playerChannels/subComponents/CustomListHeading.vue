<template>
  <span :class="[$style.heading, { [$style.red]: red }]">{{ heading }}</span>
</template>
<script>
import { boolean } from "yup";

export default {
  props: {
    heading: String,
    red: Boolean,
  },
};
</script>
<style module>
.heading {
  height: var(--small-icon-size);
  font-size: var(--font-size-normal);
  color: white;
  padding: 0.5rem;
  background-color: var(--color-divider-bg);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  letter-spacing: 2px;
}

.red {
  background: var(--color-brand-logo-bg);
  height: 35px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
