<template>
    <div :class="$style.playerFilter">
        <div :class="$style.container">
            <div :class="$style.searchGroup">
                <font-awesome-icon
                    icon="fa-solid fa-magnifying-glass"
                    :class="$style.searchIcon"
                />
                <input
                    type="text"
                    :class="['input', $style.search]"
                    placeholder="Kanalları Filtrele"
                    v-model="phrase"
                    @blur="() => (showResults = false)"
                    @focus="
                        () => {
                            showResults = true;
                            phrase = '';
                        }
                    "
                />
            </div>
            <div :class="$style.toggleGroup">
                <Toggle v-model="doNeedShowList" />
            </div>
        </div>
        <CustomListHeading
            :heading="doNeedShowList ? 'Listem' : 'Tüm Kanallar'"
        />
        <!-- filter list -->
        <div :class="$style.channelList">
            <PlayerFilterResultItem
                v-for="channel in channels"
                :channel="channel"
                :key="channel.id"
                :favoriteChannels="favoriteChannels"
                @addItem="addItem"
                @removeItem="removeItem"
            />
        </div>
    </div>
</template>
<script setup>
import Toggle from "@vueform/toggle";
import { ref, watchEffect } from "vue";
import store from "../../../../../store";
import CustomListHeading from "./CustomListHeading.vue";
import PlayerFilterResultItem from "./PlayerFilterResultItem.vue";

const doNeedShowList = ref(false);
const phrase = ref("");
let channels = ref([]);
let favoriteChannels = ref(JSON.parse(localStorage.getItem("MYLIST")) || []);

// save changes
const updateStorage = () => {
    localStorage.setItem("MYLIST", JSON.stringify(favoriteChannels.value));
};

// add channel to storage
const addItem = (channel) => {
    favoriteChannels.value.push(channel);
    updateStorage();
};
// remove channel from storage
const removeItem = (id) => {
    favoriteChannels.value = favoriteChannels.value.filter(
        (channel) => channel.id != id
    );
    updateStorage();
};

// filter process
watchEffect(
    () => {
        channels.value = [];
        if (doNeedShowList.value) {
            // favorite channels
            if (phrase.value) {
                const tmpArray = favoriteChannels.value.filter((channel, _) =>
                    channel.title
                        .toUpperCase()
                        .includes(phrase.value.toUpperCase())
                );
                channels.value.push(...tmpArray);
            } else {
                channels.value.push(...favoriteChannels.value);
            }
        } else {
            // all channels
            if (phrase.value) {
                const tmpArray = store.getters.getChannels.filter(
                    (channel, _) =>
                        channel.title
                            .toUpperCase()
                            .includes(phrase.value.toUpperCase())
                );
                channels.value.push(...tmpArray);
            } else {
                channels.value.push(...store.getters.getChannels);
            }
        }
    },
);
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style module>
/* channel list */
.channelList {
    width: 100%;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    row-gap: 0.75rem;
}

/* toggle */

.playerFilter {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: center;
}

.toggleGroup {
    position: relative;
}

.container {
    display: flex;
    column-gap: 0.5rem;
}

.searchGroup {
    background-color: var(--color-divider-bg);
    height: 35px;
    width: 100%;
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    transition: 0.3s all ease-in-out;
    position: relative;
}

/* search group */
.search {
    background-color: transparent;
    height: 100%;
    color: var(--color-white);
    padding: 0 0.5rem;
    font-size: var(font-size-normal);
}

.searchIcon {
    color: var(--color-white);
}

/* searchResults */
.searchResults {
    width: 100%;
    position: absolute;
    background-color: var(--color-divider-bg);
    top: calc(var(--nav-height) - 18px);
    right: 0;
    padding: 0.5rem;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    transition: all 0.3s ease-in;
    border-radius: var(--border-radius-md);
}

@media screen and (max-width: 1068px) {
    .searchGroup {
        display: none;
    }
}
</style>
