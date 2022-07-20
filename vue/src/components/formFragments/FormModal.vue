<template>
    <section :class="$style.modalBg" ref="area" @click="closeModal($event)">
        <form :class="$style.modalForm">
            <slot></slot>
        </form>
    </section>
</template>
<script>
import CustomInput from "../formFragments/CustomInput.vue";
import router from "../../router";
import store from "../../store";
import { ref } from "vue";
export default {
    props: {
        staySamePage: Boolean,
    },
    components: { CustomInput },
    setup(props) {
        const area = ref(null);
        const closeModal = (event) => {
            if (area.value === event.target) {
                if (props.staySamePage) {
                    store.commit("toggleReportModal", false);
                } else {
                    if (window.history.length) {
                        router.push("/");
                    } else {
                        router.go(-1);
                    }
                }
            }
        };

        return { closeModal, area };
    },
};
</script>
<style module>
.modalBg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    padding: 0 1.5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--color-dark-transparent-bg);
    z-index: 99;
}

.modalForm {
    width: 500px;
    background-color: var(--color-black-soft);
    border-radius: var(--border-radius-md);
    display: flex;
}
</style>
