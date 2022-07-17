<template>
  <div :class="$style.container">
    <CustomListHeading heading="Yayın akışı" :red="true" />
    <DateHeader date="6 Temmuz Çarşamba" />
    <DateItem hour="15:00" program="Ana haber" />
    <DateItem hour="15:00" program="Ana haber" />
    <DateItem hour="15:00" program="Ana haber" />
    <DateItem hour="15:00" program="Ana haber" />
    <DateItem hour="15:00" program="Ana haber" :isActive="true" />
  </div>
</template>
<script>
import CustomListHeading from "../playerChannels/subComponents/CustomListHeading.vue";
import DateHeader from "./subComponents/DateHeader.vue";
import DateItem from "./subComponents/DateItem.vue";
export default { components: { CustomListHeading, DateHeader, DateItem } };
</script>
<style module>
.container {
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
</style>
