<template>
    <FormModal @submit.prevent="">
        <div :class="$style.container" ref="containerRef">
            <font-awesome-icon
                icon="fa-solid fa-xmark"
                :class="$style.closeBtn"
                @click="
                    () => {
                        router.push('/');
                    }
                "
            />
            <h1 :class="$style.heading">Profil</h1>
            <div :class="$style.formContent">
                <div :class="$style.profileGroup">
                    <img
                        :src="defaultAvatar"
                        alt="user"
                        :class="$style.profileImg"
                    />
                    <!-- user info group  -->
                    <div :class="$style.info">
                        <div :class="$style.infoGroup">
                            <span :class="$style.username">{{
                                getUser?.name
                            }}</span>
                            <span :class="$style.email">{{
                                getUser?.email
                            }}</span>
                        </div>
                        <div :class="$style.infoGroup">
                            <div :class="$style.memberHeader" ref="targetRef">
                                <span :class="$style.memberHeading"
                                    >Abonelik Durumu</span
                                >
                                <font-awesome-icon
                                    icon="fa-solid fa-circle-question"
                                    :class="$style.icon"
                                    @mouseover="showHelp(false)"
                                    @mouseleave="closeHelp"
                                    @click="helpClick"
                                />
                            </div>
                            <span
                                :class="[
                                    $style.memberInfo,
                                    { [$style.active]: getUser.membership },
                                ]"
                                >{{
                                    !getUser.membership
                                        ? "Abonelik yok"
                                        : `${daysRemaining(
                                              getUser.membership
                                          )} gün kaldı`
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <hr :class="$style.divider" />
                <!-- options -->
                <div :class="$style.options">
                    <div :class="$style.optionsGroup">
                        <div :class="$style.optionsHeader" ref="targetRef2">
                            <span :class="$style.optionsHeading"
                                >Sunucu Optimizasyonu</span
                            >
                            <font-awesome-icon
                                icon="fa-solid fa-circle-question"
                                :class="$style.icon"
                                @mouseover="showHelp(true)"
                                @mouseleave="closeHelp"
                            />
                        </div>
                        <Toggle v-model="serverOptimization" />
                    </div>
                    <span :class="$style.changePassword">Şifremi Değiştir</span>
                </div>
            </div>
            <!-- what is membership -->
            <div :class="$style.memberHelp" ref="infoRef">
                <p v-if="isServerHelp">
                    Otomatik Sunucu Optimizasyonu düzenli olarak sunucu ile
                    aranızdaki hızı kontrol eder. Yavaşlama tesbit edildiği
                    zaman başka bir sunucuya yönlendirme yapılır. Böylece
                    sürekli mümkün olan en iyi hızda yayın almanızı sağlamaya
                    çalışır.
                </p>
                <p v-else>
                    Abonelik satın alarak bir çok avantaj elde edin. Detaylar
                    için tıklayın!
                </p>
            </div>
        </div>
    </FormModal>
</template>
<script>
import Toggle from "@vueform/toggle";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
import { defaultAvatar } from "../../data/data";
import { getElementPosition, setElementPosition } from "../../helpers/utilHelpers";
import store from "../../store";
import FormModal from "../formFragments/FormModal.vue";
import { daysRemaining } from "../../helpers/momentHelpers";

export default {
    components: { FormModal, Toggle },
    computed: {
        ...mapGetters(["getUser"]),
    },
    setup(props) {
        const targetRef = ref(null);
        const targetRef2 = ref(null);
        const containerRef = ref(null);
        const infoRef = ref(null);
        const router = useRouter();
        const serverOptimization = ref(false);
        const isServerHelp = ref(false);


        const showHelp = (switchParameter) => {
            isServerHelp.value = switchParameter;
            let currentTarget = switchParameter
                ? targetRef2.value
                : targetRef.value;
            const { x, y } = getElementPosition(
                currentTarget,
                containerRef.value
            );
            infoRef.value = setElementPosition(
                infoRef.value,
                y + 40,
                null,
                null,
                x
            );
            infoRef.value.style.display = "block";
        };

        const closeHelp = () => {
            infoRef.value.style.display = "none";
        };

        const helpClick = () => {
            router.push("/uyelik");
        };

        return {
            store,
            defaultAvatar,
            showHelp,
            targetRef,
            containerRef,
            infoRef,
            closeHelp,
            helpClick,
            serverOptimization,
            router,
            targetRef2,
            isServerHelp,
            daysRemaining,
        };
    },
};
</script>
<!-- toggle style -->
<style src="@vueform/toggle/themes/default.css"></style>

<style module>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.formContent {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.5rem;
}

.heading {
    color: white;
    font-size: var(--font-size-xl);
    background-color: var(--color-black);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem 1.5rem;
    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);
}

.closeBtn {
    font-size: var(--small-icon-size);
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: var(--color-white);
    cursor: pointer;
}

/* profile */
.profileGroup {
    display: flex;
    column-gap: 1.5rem;
}

.profileImg {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.info {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: center;
}

.infoGroup {
    display: flex;
    column-gap: 1rem;
    align-items: center;
}

.username {
    font-size: var(--font-size-l);
    color: var(--color-light-gray);
}

.email {
    color: var(--color-gray);
}

.memberHeader {
    display: flex;
    column-gap: 8px;
    background-color: #000000;
    background-image: linear-gradient(315deg, #363636 0%, #414141 74%);
    align-items: center;
    padding: 3px 6px;
    cursor: pointer;
}

.memberHeading {
    color: white;
}

.icon {
    color: white;
}

.memberInfo {
    color: var(--color-fail-red);
}
.active {
    color: var(--color-success-green);
}

.memberHelp {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    padding: 0.5rem;
    position: absolute;
    background-color: var(--color-aside-bg);
    border-radius: var(--border-radius-sm);
    max-width: 300px;
    display: none;
    z-index: 2;
}

.helpButton {
    font-size: var(--font-size-sm);
}
.divider {
    margin: 1rem -1.5rem;
    z-index: 2;
}

/* .options */

.options {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
}

.optionsGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.optionsHeader {
    display: flex;
    column-gap: 0.5rem;
    color: var(--color-white);
    align-items: center;
}

.changePassword {
    color: var(--color-gray);
    border-bottom: 2px solid transparent;
    cursor: pointer;
    margin-right: auto;
}
.changePassword:hover {
    border-bottom: 2px solid var(--color-gray);
}
</style>
