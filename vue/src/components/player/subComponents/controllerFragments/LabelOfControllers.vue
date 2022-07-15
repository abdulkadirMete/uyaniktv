<template>
    <div :class="[$style.container, { [$style.show]: show }]">
        <span :class="$style.text">{text}</span>
    </div>
</template>
<script>
export default {
    props: {
        text: String,
        show: Boolean,
    },
};
</script>
<style>
.container {
    background-color: var(--color-light-gray);
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    max-height: 0px;
    transition: all 0.3s linear;
}

.show {
    max-height: 60px;
}

.text {
    color: var(--color-black);
}
</style>
