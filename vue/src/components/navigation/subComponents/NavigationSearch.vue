<template>
    <div :class="$style.searchGroup">
        <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            :class="$style.searchIcon"
        />
        <!-- search results -->
        <div :class="[$style.searchResults, { [$style.show]: showResults }]">
            <SearchResultItem
                v-for="(channel, index) in store.getters.getSearchResults"
                :key="index"
                :channel="channel"
            />
        </div>

        <input
            type="text"
            :class="['input', $style.search]"
            placeholder="Kanal Ara"
            v-model="phrase"
            @blur="() => (showResults = false)"
            @focus="() => (showResults = true)"
        />
    </div>
</template>
<script setup>
import store from "../../../store";
import SearchResultItem from "./SearchResultItem.vue";
import { ref, watch } from "vue";

const phrase = ref("");
const showResults = ref(false);

watch(phrase, (newVal, _) => {
    if (newVal.length > 1) {
        store.dispatch("searchChannel", newVal);
    } else {
        store.commit("clearSearchResults");
    }
});
</script>
<style module>
.searchGroup {
    background-color: var(--color-white);
    height: 35px;
    width: 250px;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    transition: 0.3s all ease-in-out;
    position: relative;
}

/* search group */
.searchGroup:focus-within {
    width: 350px;
}
.search {
    background-color: transparent;
    height: 100%;
    color: var(--color-black-soft);
    padding: 0 0.5rem;
    font-size: var(font-size-normal);
}

.searchIcon {
    color: var(--color-brand);
}

/* searchResults */
.searchResults {
    width: 100%;
    position: absolute;
    background-color: var(--color-divider-bg);
    top: calc(var(--nav-height) - 18px);
    right: 0;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    transition: all 0.3s ease-in;
    overflow-y: auto;
    max-height: 0px;
    transition: all 0.3s ease-out;
}

.show {
    max-height: 650px;
}

@media screen and (max-width: 1068px) {
    .searchGroup {
        display: none;
    }
}
</style>

<!-- webkit settings -->
<!-- <style>
.searchGroup::-webkit-scrollbar-track {
  color: var(--color-divider-bg);
  
}

.searchGroup::-webkit-scrollbar-thumb {
  color: var(--color-divider-bg);
}
.searchGroup::-webkit-scrollbar-track:active {
  color: var(--color-divider-bg);
}
</style> -->
