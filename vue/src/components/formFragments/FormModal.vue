<template>
  <section :class="$style.modalBg" ref="area" @click="closeModal($event)">
    <form @submit.prevent="submitAction" :class="$style.modalForm">
      <slot></slot>
    </form>
  </section>
</template>
<script>
import CustomInput from "../formFragments/CustomInput.vue";
import router from "../../router";
export default {
  components: { CustomInput },
  data() {
    return {
      router,
    };
  },
  methods: {
    closeModal(event) {
      if (this.$refs.area === event.target) {
        router.push("/");
      }
    },
  },
  props: {
    submitAction: Function,
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
