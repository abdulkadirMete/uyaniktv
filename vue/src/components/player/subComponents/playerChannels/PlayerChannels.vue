<template>
  <div :class="$style.container">
    <PlayerFilter />
  </div>
</template>
<script>
import NavigationSearch from "../../../navigation/subComponents/NavigationSearch.vue";
import PlayerFilter from "./subComponents/PlayerFilter.vue";
export default { components: { NavigationSearch, PlayerFilter } };
</script>
<style module>
.container {
  flex: 2;
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
