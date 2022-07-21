<template>
    <div :class="$style.container">
        <CustomListHeading heading="Yayın akışı" :red="true" />
        <LoadingDot v-if="store.getters.getGuideLoading" />
        <DateHeader
            v-else
            :guideObject="guide"
            v-for="guide in processedData"
            @toggleOpen="toggleOpen"
            :isOpen="isOpen"
        />
    </div>
</template>
<script>
import CustomListHeading from "../playerChannels/subComponents/CustomListHeading.vue";
import DateHeader from "./subComponents/DateHeader.vue";
import DateItem from "./subComponents/DateItem.vue";
import store from "../../../../store";
import { watch, ref } from "vue";
import { processData } from "../../../../helpers/helpers";
import LoadingDot from "../../../loading/LoadingDot.vue";

export default {
    components: { CustomListHeading, DateHeader, DateItem, LoadingDot },
    setup() {
        const processedData = ref(null);
        const isOpen = ref(false);

        watch(
            () => store.getters.getGuide,
            (guide) => {
                processedData.value = processData(guide);
            }
        );

        const toggleOpen = () => {
            isOpen.value = !isOpen.value;
        };

        return { store, processedData, toggleOpen, isOpen };
    },
};
</script>
<style module>
.container {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
}
</style>
