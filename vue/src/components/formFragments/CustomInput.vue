<template>
  <div :class="$style.inputGroup">
    <input
      :placeholder="placeholder"
      :type="type"
      required
      :class="$style.input"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    placeholder: String,
    hasError: Boolean,
    type: String,
  },
};
</script>

<style module>
.inputGroup {
  display: flex;
  padding: 1rem 0;
}

.input {
  width: 100%;
  display: block;
  border: none;
  padding: 0.75rem 0;
  font-size: var(--font-size-l);
  border-bottom: solid 1px var(--color-aside-bg);
  -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 96%,
    var(--color-aside-bg) 4%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 96%,
    var(--color-aside-bg) 4%
  );
  background-position: calc(-100%) 0;
  background-size: calc(100%) 100%;
  background-repeat: no-repeat;
  color: var(--color-white);
}

.input:focus,
.input:valid {
  box-shadow: none;
  outline: none;
  background-position: 0 0;
}

.input::-webkit-input-placeholder {
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.input:focus::-webkit-input-placeholder,
.input:valid::-webkit-input-placeholder {
  color: var(--color-white);
  font-size: var(--font-size-normal);
  -webkit-transform: translateY(-20px);
  transform: translateY(-8px);
  visibility: visible !important;
}

@media screen and (max-width: 568px) {
  * {
    font-size: var(--font-size-small);
  }
}
</style>
