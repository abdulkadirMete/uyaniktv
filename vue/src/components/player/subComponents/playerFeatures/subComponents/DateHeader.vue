<template>
  <div>
    <div class="datetime" @click="() => (isOpen = !isOpen)">
      <font-awesome-icon icon="fa-solid fa-calendar-days" />
      <div class="date">{{ date }}</div>
    </div>
    <!-- dropdown menu -->

    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in dummyDates" :key="i" class="notActiveDateTime">
          <div class="date">{{ item.title }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { ref } from "vue";
import { dummyDates } from "../../../../../data/dummyData";

export default {
  props: {
    date: String,
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen, dummyDates };
  },
};
</script>
<style>
.notActiveDateTime {
  font-size: var(--font-size-sm);
  background-color: var(--color-aside-bg);
  color: var(--color-black-soft);
  align-items: center;
  font-family: "Inter", sans-serif;
  padding: 8px;
  cursor: pointer;
  margin: 3px 0;
  column-gap: 0.5rem;
}

.notActiveDateTime:hover {
  color: var(--color-light-gray);
  background-color: var(--color-divider-bg);
}

.datetime {
  font-size: var(--font-size-sm);
  background-color: #444444;
  display: flex;
  padding: 8px;
  margin-top: 1rem;
  align-items: center;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  column-gap: 0.5rem;
}

.datetime > * {
  color: var(--color-light-gray);
}

.date {
  font-size: var(--font-size-m);
  border-radius: var(--small-icon-size);
  font-weight: 500;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
