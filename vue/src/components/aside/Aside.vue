<template>
  <aside :class="[$style.aside, { [$style.open]: store.getters.getShowAside }]">
    <div :class="$style.asideContainer">
      <div :class="$style.asideTop">
        <!-- close aside button -->
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          :class="$style.closeAsideButton"
          @click="store.commit('toggleAside', false)"
        />

        <BlankProfile />
      </div>
      <AsideMenu />
    </div>
  </aside>
</template>
<script>
import BlankProfile from "./subComponents/BlankProfile.vue";
import AsideMenu from "./subComponents/AsideMenu.vue";
import store from "../../store";
export default {
  data() {
    return { store };
  },

  components: { BlankProfile, AsideMenu },
};
</script>
<style module>
.aside {
  width: 70%;
  height: calc(100vh - var(--nav-height));
  margin-top: calc(var(--nav-height) - 1px);
  background-color: var(--color-aside-bg);
  border: 1px solid var(--color-border);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
}

/* open close aside  */
.open {
  transform: translateX(0);
}

.closeAsideButton {
  color: var(--color-white);
  font-size: var(--base-icon-size);
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}

.asideContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
}

.asideTop {
  background: var(--color-brand-logo-bg);
}
@media screen and (max-width: 568px) {
  .closeAsideButton {
    font-size: var(--small-icon-size);
  }
}
</style>
