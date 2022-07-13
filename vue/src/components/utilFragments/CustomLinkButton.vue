<template>
  <router-link to="/giris" :class="$style.customButton">
    <font-awesome-icon icon="fa-solid fa-user" :class="$style.icon" />
    <span
      :class="$style.customButtonText"
      @click="store.commit('toggleAside', false)"
      >Giriş Yap</span
    >
  </router-link>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return { store };
  },
};
</script>
<style module>
.customButton {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.75rem;
  border: 2px solid rgb(255, 255, 255);
  padding: 0.4rem;
  background-color: transparent;
}

.customButton:hover {
  transition: 1s ease-in-out;
  background: var(--color-brand-light);
}

.customButton:hover svg {
  stroke-dashoffset: -480;
}

.icon {
  color: var(--color-white);
}

.customButtonText {
  color: var(--color-white);
}

@media screen and (max-width: 568px) {
  .customButtonText {
    font-size: var(--font-size-small);
  }
  .customButton {
    padding: 0.2rem;
  }
}
</style>
