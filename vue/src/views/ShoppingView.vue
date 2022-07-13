<template>
  <div class="customSection" :class="$style.container">
    <PlayerHeading
      :channelImg="premiumImgPath"
      channelName="Neden Üyelik Satın Almalıyım ?"
      :hideButton="true"
    />
    <div :class="$style.altInfo">
      <ShoppingDropdownList />
      <div :class="$style.buy">
        <div :class="$style.priceItem">
          <span :class="$style.header">1 Aylık 24DVR aboneliği</span>
          <span :class="$style.price">33.76₺</span>
        </div>

        <div :class="$style.priceItem">
          <span :class="$style.header">6 Aylık 24DVR aboneliği</span>
          <span :class="$style.price">134.23₺</span>
        </div>

        <div :class="$style.priceItem">
          <span :class="$style.header">1 Senelik 24DVR aboneliği</span>
          <span :class="$style.price">235.91₺</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlayerHeading from "../components/playerHeading/PlayerHeading.vue";
import ShoppingDropdownList from "../components/shopping/ShoppingDropdownList.vue";
export default {
  components: { PlayerHeading, ShoppingDropdownList },
  setup() {
    const premiumImgPath = "/src/assets/premium/premium.png";

    return { premiumImgPath };
  },
};
</script>
<style module>
.container {
  max-width: 90%;
  margin: 0 auto;
  padding: 1.5rem;
}

.altInfo {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  column-gap: 3rem;
}
/* buy */
.buy {
  display: flex;
  row-gap: 2rem;
  flex-direction: column;
  flex: 2;
}

.priceItem {
  display: flex;
  box-shadow: var(--shadow-1);
  border-radius: var(--border-radius-sm);
  padding: 2rem;
  justify-content: space-between;
  transition: all 0.3s linear;
  cursor: pointer;
  border-left: 8px solid var(--color-brand);
}

.priceItem:hover {
  transform: scale(1.05);
}

.header {
  font-size: var(--font-size-xxl);
  color: var(--color-divider-bg);
  font-weight: 600;
}

.price {
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--color-white);
  background: var(--color-brand-logo-bg);
  padding: 0 0.5rem;
  border-radius: var(--border-radius-md);
  width: 140px;
  text-align: center;
}
</style>
