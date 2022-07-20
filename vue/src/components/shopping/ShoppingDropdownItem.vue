<template>
    <div class="dropdown">
        <div class="dropdown-header" @click="toggleDropdown()">
            {{ title }}

            <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/02-arrow-direction/angle-circle-arrow-down.png"
                alt=""
                class="dropdown-icon"
                :class="[dropdown && 'active']"
            />
        </div>

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @before-leave="beforeLeave"
            @leave="leave"
        >
            <div class="dropdown-wrapper" v-if="dropdown">
                <ul class="dropdown-list">
                    <li class="dropdown-list-item">
                        {{
                            desc ||
                            "Lorem Ipsum, kısaca Lipsum, masaüstü yayıncılık ve basın yayın sektöründe kullanılan taklit yazı bloğu olarak tanımlanır. Lipsum, oluşturulacak şablon ve taslaklarda içerik yerine geçerek yazı bloğunu doldurmak için kullanılır."
                        }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        desc: String,
    },
    data: () => ({
        dropdown: false,
    }),
    methods: {
        toggleDropdown() {
            this.dropdown = !this.dropdown;
        },
        beforeEnter(el) {
            el.style.height = 0;
        },
        enter(el) {
            el.style.height = el.scrollHeight + "px";
        },
        beforeLeave(el) {
            el.style.height = el.scrollHeight + "px";
        },
        leave(el) {
            el.style.height = 0;
        },
    },
};
</script>
<style scoped>
button:focus {
    outline: 0;
}

img,
embed,
svg,
audio,
canvas,
iframe,
video {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
}

h1,
h1,
h3,
h4,
p {
    margin-top: 0;
    margin-bottom: 1rem;
}

/* DROPDOWN */
.dropdown {
    margin-bottom: 12px;
}
.dropdown:last-child {
    margin-bottom: 0;
}
.dropdown-header {
    font-size: 1rem;
    font-weight: 600;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 20px;
}
.dropdown-icon {
    max-width: 24px;
    transition: transform 200ms ease;
}
.dropdown-icon.active {
    transform: rotate(180deg);
    border-radius: 50%;
    background-color: var(--color-brand-light);
}
.dropdown-wrapper {
    overflow: hidden;
    transition: height 400ms ease;
}
.dropdown-list {
    list-style: none;
    background-color: #fff;
    border-radius: 8px;
    padding: 4px 20px;
    margin: 0;
    transform: translateY(8px);
}
.dropdown-list-item {
    padding: 12px 0;
    border-bottom: 1px solid #ebebed;
}
.dropdown-list-item:last-child {
    border-bottom: 0;
}
</style>
