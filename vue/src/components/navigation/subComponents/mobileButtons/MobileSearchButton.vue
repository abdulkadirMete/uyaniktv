<template>
  <!-- mobile search input -->
  <div
    :class="[
      $style.mobileSearchGroup,
      { [$style.showSearchInput]: setMobileSearch },
    ]"
  >
    <!-- Search Results -->
    <div
      :class="$style.searchResults"
      v-if="
        showResults &&
        store.getters.isThereAnyResult &&
        !store.getters.getShowDropdown
      "
    >
      <SearchResultItem
        v-for="(channel, index) in store.getters.getSearchResults"
        :key="index"
        :channel="channel"
      />
    </div>

    <input
      type="text"
      placeholder="Kanal Ara"
      ref="searchInputRef"
      :class="$style.searchInput"
      v-model="phrase"
      @blur="() => (showResults = false)"
      @focus="() => (showResults = true)"
    />
    <font-awesome-icon
      icon="fa-solid fa-xmark"
      :class="$style.searchCloseButton"
      @click="cancelSearch"
    />
  </div>
  <!-- mobile search open  -->
  <font-awesome-icon
    icon="fas fa-search"
    :class="$style.menuIcon"
    @click="openSearch"
  />
</template>
<script>
import store from "../../../../store";
import SearchResultItem from "../SearchResultItem.vue";
export default {
  data() {
    return {
      store,
      setMobileSearch: false,
      store,
      phrase: "",
      showResults: false,
    };
  },
  methods: {
    cancelSearch() {
      this.setMobileSearch = false;
    },
    openSearch() {
      this.setMobileSearch = true;
      this.$refs.searchInputRef.focus();
    },
  },
  watch: {
    phrase: function () {
      if (this.phrase.length > 2) {
        store.commit("searchChannel", this.phrase);
      } else {
        store.commit("clearSearchResults");
      }
    },
  },
  components: { SearchResultItem },
};
</script>

/* change placeholder color */
<style>
::placeholder {
  color: var(--color-pale-white);
  opacity: 1;
}

:-ms-input-placeholder {
  color: var(--color-pale-white);
}

::-ms-input-placeholder {
  color: var(--color-pale-white);
}
</style>

<style module>
.menuIcon {
  font-size: var(--base-icon-size);
  color: var(--color-brand);
  display: none;
}

.mobileSearchGroup {
  display: flex;
  align-items: center;
  position: relative;
  position: absolute;
  height: calc(var(--nav-height));
  right: -1px;
  left: -1px;
  top: calc(-1 * var(--nav-height));
  background-color: var(--color-divider-bg);
  transition: 0.3s all ease-in-out;
}

.searchInput {
  width: 100%;
  background-color: transparent;
  padding: 1rem 0.75rem;
  color: var(--color-white);
  font-size: var(--font-size-l);
}

.searchCloseButton {
  z-index: 2;
  position: absolute;
  color: var(--color-white) !important;
  right: 3.5rem;
  font-size: var(--base-icon-size);
}
.showSearchInput {
  top: -1px;
}

/* media query  */
@media screen and (max-width: 1068px) {
  .menuIcon {
    display: block;
  }
}

@media screen and (max-width: 568px) {
  .menuIcon,
  .searchCloseButton {
    font-size: var(--small-icon-size);
    right: 2.5rem;
  }
  .searchInput {
    font-size: var(--font-size-sm);
  }
}

/* searchResults */
.searchResults {
  width: 100%;
  position: absolute;
  background-color: var(--color-divider-bg);
  top: calc(var(--nav-height) + 8px);
  right: 0;
  left: 0;
  padding: 0.5rem;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  transition: all 0.3s ease-in;
  border-radius: var(--border-radius-md);
  overflow-y: scroll;
}

.searchResults::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border: 1px solid black;
}
</style>
