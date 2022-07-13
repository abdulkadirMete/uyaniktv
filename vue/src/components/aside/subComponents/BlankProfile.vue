<template>
  <div :class="$style.container">
    <div :class="$style.info">
      <img
        src="../../../assets/images/default-avatar.png"
        alt=""
        :class="$style.defaultUserImg"
      />
      <span :class="$style.profileInfoText">Oturum Açılmadı</span>
      <CustomLinkButton />
    </div>
  </div>
</template>
<script>
import CustomLinkButton from "../../utilFragments/CustomLinkButton.vue";
export default { components: { CustomLinkButton } };
</script>
<style module>
.container {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* profile info */
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  text-align: center;
}
.defaultUserImg {
  width: 80px;
  height: 80px;
}

.profileInfoText {
  color: lightgray;
  font-size: var(--font-size-normal);
}

@media screen and (max-width: 568px) {
  .defaultUserImg {
    width: 60px;
    height: 60px;
  }

  .profileInfoText {
    font-size: var(--font-size-small);
  }
}
</style>
