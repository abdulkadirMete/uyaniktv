<template>
  <ul :class="$style.menu">
    <li :class="$style.menuLinkGroup">
      <router-link :class="$style.menuItem" to="/uyelik"
        >Üyelik Paketlerimiz</router-link
      >
    </li>
  </ul>
</template>
<script>
export default {};
</script>
<style module>
.menu {
  display: flex;
  column-gap: 1rem;
  cursor: pointer;
  font-size: var(font-size-normal);
}
.menuItem {
  background-image: linear-gradient(
    to right,
    var(--color-brand),
    var(--color-black-soft) 50%,
    var(--color-black) 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 5px 0;
  position: relative;
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
}

.menuItem:before {
  content: "";
  background: var(--color-brand);
  font-weight: 500;
  display: block;
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
}

.menuItem:hover {
  background-position: 0;
}

.menuItem:hover::before {
  width: 100%;
}

.menuLinkGroup {
  display: flex;
  align-items: center;
}

/* menuItemIcon */
.menuItemIcon {
  color: var(--color-brand);
  font-size: var(--small-icon-size);
  margin-right: 5px;
  margin-bottom: 5px;
}

@media screen and (max-width: 1068px) {
  .menu {
    display: none;
  }
}
</style>
