<template>
  <router-link to="/">
    <div :class="$style.brandGroup">
      <!-- <div :class="$style.brandLogo">
        <font-awesome-icon icon="fa-solid fa-tv" :class="$style.brandIcon" />
      </div> -->
      <img src="../../../assets/logo-dark.svg" alt="logo" :class="$style.brandImg" />
      <span :class="$style.brandText">{{ textData.brandName }}</span>
    </div>
  </router-link>
</template>

<script>
import { textData } from "../../../data/data";

export default {
  data() {
    return {
      textData,
    };
  },
};
</script>

<style module>
.brandGroup {
  display: flex;
  column-gap: 1rem;
  align-items: center;
  cursor: pointer;
}

/* .brandLogo {
  height: 50px;
  width: 50px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--color-brand-logo-bg);
}

.brandIcon {
  font-size: 1.2rem;
  color: white;
} */

.brandImg {
  height: 60px;
  width: 60px;
  object-fit: cover;
  stroke: var(--color-white);
}

.brandText {
  font-size: var(--font-size-xl);
  color: var(--color-white);
  font-weight: 500;
}

@media screen and (max-width: 568px) {
  .brandText {
    font-size: var(--font-size-l);
  }

  .brandLogo {
    height: 40px;
    width: 40px;
  }

  .brandGroup {
    column-gap: 0.5rem;
  }
}
</style>
