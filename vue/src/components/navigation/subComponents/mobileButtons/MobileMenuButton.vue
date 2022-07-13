<template>
  <font-awesome-icon
    v-if="!store.getters.getShowAside"
    @click="
      () => {
        store.commit('toggleAside', true);
        store.dispatch('toggleBodyScroll',true);
      }
    "
    icon="fa-solid fa-bars"
    :class="$style.menuIcon"
  />
  <font-awesome-icon
    v-else
    @click="store.commit('toggleAside', false)"
    icon="fa-solid fa-arrow-left"
    :class="$style.menuIcon"
  />
</template>
<script>
import store from "../../../../store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>
<style module>
.menuIcon {
  font-size: var(--base-icon-size);
  color: var(--color-brand);
  display: none;
}

@media screen and (max-width: 1068px) {
  /* menu */
  .menuIcon {
    display: block;
  }
}

@media screen and (max-width: 568px) {
  .menuIcon {
    font-size: var(--small-icon-size);
  }
}
</style>
