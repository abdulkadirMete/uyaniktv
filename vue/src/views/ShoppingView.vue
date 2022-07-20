<template>
    <div
        :class="$style.container"
        @mouseenter="store.commit('toggleDropdown', false)"
    >
        <PlayerHeading
            :channelImg="premiumImgPath"
            channelName="Neden Üyelik Satın Almalıyım ?"
            :hideButton="true"
        />
        <div :class="$style.altInfo">
            <ShoppingDropdownList />
            <div :class="$style.shopContainer">
                <ShoppingItem
                    v-for="membership in memberPackets"
                    :membership="membership"
                />
            </div>
        </div>
    </div>
</template>
<script>
import PlayerHeading from "../components/playerHeading/PlayerHeading.vue";
import ShoppingDropdownList from "../components/shopping/ShoppingDropdownList.vue";
import { memberPackets } from "../data/data";
import ShoppingItem from "../components/shopping/ShoppingItem.vue";
import store from "../store";

export default {
    components: {
        PlayerHeading,
        ShoppingDropdownList,
        ShoppingItem,
    },
    setup() {
        const premiumImgPath = "src/assets/premium/premium.png";
        return {
            premiumImgPath,
            memberPackets,
            store,
        };
    },
};
</script>
<style module>
.container {
    max-width: 90%;
    margin: 0 auto;
    padding: 0 1.5rem;
    padding-bottom: 40px;
}

.altInfo {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    column-gap: 40px;
}

.shopContainer {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
}

/* buy */
@media screen and (max-width: 1268px) {
    .altInfo {
        flex-direction: column;
        row-gap: 40px;
        align-items: center;
    }
}

@media screen and (max-width: 768px) {
    .shopContainer {
        width: 100%;
    }
}
</style>
