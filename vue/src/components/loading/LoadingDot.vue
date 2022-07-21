<template>
    <div class="loadingDot"></div>
</template>
<script>
export default {};
</script>
<style scoped>
.loadingDot {
    margin: 1rem auto;
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    z-index: 2;
    background-color: var(--color-brand-light);

    color: var(--color-brand-light);
    animation: dotElastic 1s infinite linear;
}

.loadingDot::before,
.loadingDot::after {
       content: "";
    display: inline-block;
    position: absolute;
    top: 0;
}
.loadingDot::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--color-brand-light);
    color: var(--color-brand-light);
    animation: dotElasticBefore 1s infinite linear;
}
.loadingDot::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--color-brand-light);
    color: var(--color-brand-light);
}
@keyframes dotElasticBefore {
    0% {
        transform: scale(1, 1);
    }
    25% {
        transform: scale(1, 1.5);
    }
    50% {
        transform: scale(1, 0.67);
    }
    75% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1, 1);
    }
}
@keyframes dotElastic {
    0% {
        transform: scale(1, 1);
    }
    25% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1, 1.5);
    }
    75% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1, 1);
    }
}
@keyframes dotElasticAfter {
    0% {
        transform: scale(1, 1);
    }
    25% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1, 0.67);
    }
    75% {
        transform: scale(1, 1.5);
    }
    100% {
        transform: scale(1, 1);
    }
}
</style>
