<template>
  <div class="wrapper-list">
    <ShoppingDropdownItem
      :title="advantages.header"
      v-for="advantages in premmiumAdvantages"
    ></ShoppingDropdownItem>
  </div>
</template>
<script setup>
import ShoppingDropdownItem from "./ShoppingDropdownItem.vue";
import { premmiumAdvantages } from "../../data/dummyData";
</script>
<style scoped>
.wrapper-list {
  max-width: 600px;
  width: 600px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-1);
}
</style>
