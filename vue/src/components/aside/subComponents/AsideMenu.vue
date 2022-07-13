<template>
  <div :class="$style.menuContainer">
    <div :class="$style.menuGroup" v-for="item in menuItems" :key="item.id">
      <font-awesome-icon :icon="item.icon" :class="$style.menuIcon" />
      <router-link :class="$style.menuLink" :to="item.path">{{
        item.title
      }}</router-link>
    </div>
  </div>
</template>
<script>
import { menuItems } from "../../../data/data";
export default {
  data() {
    return {
      menuItems,
    };
  },
};
</script>
<style module>
.menuContainer {
  display: flex;
  padding: 1rem;
  flex-direction: column;
}

.menuGroup {
  display: flex;
  column-gap: 2rem;
  padding: 0.75rem;
  align-items: center;
  border-radius: var(--border-radius-md);
}

.menuGroup:hover {
  background-color: var(--color-text-dark-2);
}

.menuIcon {
  font-size: var(--small-icon-size);
  color: var(--color-indigo);
}

.menuLink {
  font-size: var(--font-size-l);
  color: var(--color-black-soft);
}

@media screen and (max-width: 568px) {
  .menuGroup {
    column-gap: 1rem;
    font-size: var(--font-size-sm);
  }
}
</style>
 