<template>
    <footer :class="$style.footer">
        <div :class="$style.container">
            <div :class="$style.brandSection">
                <BrandGroupBlackWhite />
                <p :class="$style.copyright">
                    Tüm hakları saklıdır <br />
                    @2022 Uyanık Tv
                </p>
            </div>
            <ul>
                <li :class="$style.linkHeader">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
            </ul>
            <ul>
                <li :class="$style.linkHeader">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
                <li :class="$style.otherLinks">Blank</li>
            </ul>
        </div>
    </footer>
</template>
<script>
import BrandGroup from "../navigation/subComponents/BrandGroup.vue";
import BrandGroupBlackWhite from "./subComponents/BrandGroupBlackWhite.vue";
export default { components: { BrandGroup, BrandGroupBlackWhite } };
</script>
<style module>
.footer {
    background-color: var(--color-black-soft);
    height: 300px;
    border-top: 2px solid var(--color-fail-red);
    display: flex;
    align-items: center;
}
.container {
    width: 90%;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
}

.copyright {
    color: white;
}

.linkHeader {
    color: var(--color-highlight-text);
    border-bottom: 2px solid white;
    font-size: var(--font-size-l);
    margin-bottom: 0.5rem;
}

.otherLinks {
    color: white;
}
</style>
