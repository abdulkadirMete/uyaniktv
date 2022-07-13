<template>
  <nav :class="$style.nav">
    <div :class="$style.container">
      <!-- left -->
      <MobileMenuButton />
      <BrandGroup />
      <!-- right -->
      <div :class="$style.right">
        <MenuGroup />
        <NavigationSearch />
        <MobileSearchButtonVue />
        <button
          v-if="!store.getters.getUser"
          @click="redirectLogin"
          class="btnPrimary"
          :class="$style.loginButton"
        >
          Giriş Yap
        </button>
        <OptionsMenu v-if="store.getters.getUser" />
      </div>
    </div>
  </nav>
</template>
<script>
import router from "../../router";
import BrandGroup from "./subComponents/BrandGroup.vue";
import MenuGroup from "./subComponents/MenuGroup.vue";
import {
  default as MobileMenuButton,
  default as MobileMenuButtonVue,
} from "./subComponents/mobileButtons/MobileMenuButton.vue";
import MobileSearchButtonVue from "./subComponents/mobileButtons/MobileSearchButton.vue";
import NavigationSearch from "./subComponents/NavigationSearch.vue";
import OptionsMenu from "./subComponents/OptionsMenu.vue";
import store from "../../store";


export default {
  components: {
    BrandGroup,
    MenuGroup,
    NavigationSearch,
    MobileMenuButtonVue,
    MobileSearchButtonVue,
    MobileMenuButton,
    OptionsMenu,
  },

  setup() {
    const redirectLogin = () => {
      router.push("/giris");
    };
    // get user

    return { redirectLogin,store};
  },
};
</script>

<style module>
.nav {
  height: var(--nav-height);
  background-color: var(--color-nav);
  border: 2px solid var(--color-border);
  position: relative;
  z-index: 2 !important;
}
.container {
  max-width: 90%;
  padding: 0 1.5rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* right */
.right {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

@media screen and (max-width: 1068px) {
  .loginButton {
    display: none;
  }

  .container {
    padding: 0 1rem;
  }
}

@media screen and (max-width: 568px) {
  .loginButton {
    display: none;
  }

  .container {
    padding: 0 0.5rem;
  }
}

/* custom router link */
</style>
