<template>
  <div>
    <div
      :class="[
        $style.profile,
        { [$style.active]: store.getters.getShowDropdown },
      ]"
      @mouseover="store.commit('toggleDropdown', true)"
    >
      <div :class="$style.infoGroup">
        <span :class="$style.username">{{ store.getters.getUser.name }}</span>
        <span :class="$style.email">{{ store.getters.getUser.email }}</span>
      </div>

      <img :src="defaultAvatar" :class="[$style.menuIcon]" />
    </div>
  </div>
  <div
    :class="[
      $style.dropdownMenu,
      { [$style.showDropdownAnimate]: store.getters.getShowDropdown },
    ]"
    ref="dropdown"
  >
    <ul :class="$style.menuContainer">
      <!-- router links -->
      <li :class="$style.menuGroup" v-for="item in dropdownItems">
        <font-awesome-icon :icon="item.icon" :class="$style.menuItemIcon" />
        <router-link :class="$style.menuLink" :to="item.path">{{
          item.title
        }}</router-link>
      </li>

      <!-- logout -->
      <li :class="$style.menuGroup" v-if="store.getters.getUser">
        <font-awesome-icon
          icon="fa-solid fa-right-from-bracket"
          :class="$style.menuItemIcon"
        />
        <span :class="$style.menuLink" @click="logout">Çıkış yap</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import store from "../../../store";
import router from "../../../router";
import { defaultAvatar, dropdownItems } from "../../../data/data";

// get user

// signOut
async function logout() {
  store
    .dispatch("logout")
    .then(() => {
      router.push({
        name: "Home",
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
<style module>
.profile {
  display: flex;
  column-gap: 0.75rem;
  align-items: center;
  margin-left: 0.75rem;
  padding: 0.25rem;
  border: 2px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
}

.active {
  border: 2px solid var(--color-gray);
  background-color: var(--color-white);
}

.infoGroup {
  display: flex;
  flex-direction: column;
  column-gap: 0.5rem;
  margin-bottom: 10px;
}

.username {
  font-size: var(--font-size-normal);
  font-weight: 600;
  color: var(--color-divider-bg);
  padding: 0px;
}

.email {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray);
  line-height: 10px;
}

.menuIcon {
  width: var(--base-icon-size);
  height: var(--base-icon-size);
}

/* dropdown menu */
.dropdownMenu {
  background-color: var(--color-divider-bg);
  top: calc(var(--nav-height) - 1px);
  right: 110px;
  position: absolute;
  border-radius: var(--border-radius-md);
  opacity: 0;
  z-index: -1;
  transform: translateY(-100%);
}

/* showDropDown */
.showDropdownAnimate {
  animation: animate 0.3s forwards;
}

/* animate */
@keyframes animate {
  0% {
    opacity: 0;
    z-index: -1;
    transform: translateY(-100%);
  }
  99% {
    opacity: 1;
    z-index: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    z-index: 1;
    transform: translateY(0%);
  }
}

.menuContainer {
  display: flex;
  padding: 0.75rem;
  flex-direction: column;
}

.menuGroup {
  display: flex;
  column-gap: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  border-radius: var(--border-radius-md);
  cursor: pointer;
}

.menuGroup:hover {
  background-color: var(--color-black-soft);
}

.menuItemIcon {
  font-size: var(--font-size-l);
  color: var(--color-light-gray);
}

.menuLink {
  font-size: var(--font-size-normal);
  color: var(--color-light-gray);
}

/* user img  */
.userImg {
  width: var(--base-icon-size);
  height: var(--base-icon-size);
  object-fit: cover;
}

/* media query */
@media screen and (max-width: 1068px) {
  .profile {
    display: none;
  }
}
</style>
