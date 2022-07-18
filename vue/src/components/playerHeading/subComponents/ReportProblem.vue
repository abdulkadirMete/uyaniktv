<template>
    <FormModal @submit.prevent="sendReport" :staySamePage="true">
        <div :class="$style.container">
            <CustomError :error="messageError" v-if="showError" />

            <font-awesome-icon
                icon="fa-solid fa-xmark"
                :class="$style.closeBtn"
                @click="closeModal"
            />
            <!-- heading -->
            <h1 :class="$style.heading">Sorun Bildir</h1>
            <div :class="$style.formContent">
                <!-- channel -->
                <div :class="$style.inputGroup">
                    <input
                        :class="$style.input"
                        :value="store.getters.getSingleChannel?.title"
                    />
                </div>
                <!-- message -->
                <div :class="$style.inputGroup">
                    <textarea
                        :class="[$style.input, $style.textAreaInput]"
                        placeholder="Mesaj"
                        v-model="message"
                    />
                </div>

                <button :class="$style.sendButton" type="submit">Gönder</button>
            </div>
        </div>
    </FormModal>
</template>
<script>
import FormModal from "../../formFragments/FormModal.vue";
import CustomError from "../../authForms/subComponents/CustomError.vue";
import { ref } from "vue";
import store from "../../../store";
import { notify } from "@kyvg/vue3-notification";
import { notifyMaker } from "../../../helpers/helpers";
export default {
    components: { FormModal, CustomError },
    setup(props) {
        const message = ref("");
        const messageError = ref("");
        const showError = ref(false);

        const closeModal = () => {
            store.commit("toggleReportModal", false);
        };

        const sendReport = () => {
            console.log(message.value);
            if (message.value.length > 5) {
                notify(
                    notifyMaker("Mesajınız Başarı ile iletildi!!", "success")
                );
                closeModal();
            } else {
                showError.value = true;
                messageError.value = "Mesajınız çok kısa!";
                setTimeout(() => (showError.value = false), 5000);
            }
        };

        return {
            message,
            messageError,
            store,
            closeModal,
            sendReport,
            showError,
        };
    },
};
</script>
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

.sendButton {
    border: none;
    margin-top: 1rem;
    padding: 0.5rem 0;
    background-color: var(--color-brand-light);
    border-radius: var(--border-radius-sm);
    color: white;
    font-weight: 500;
    font-size: var(--font-size-l);
    transition: all 0.3s ease-in-out;
}

.sendButton:hover {
    transform: scale(1.05);
}

.closeBtn {
    font-size: var(--small-icon-size);
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: var(--color-white);
    cursor: pointer;
}

.infoGroup {
    margin-top: 1.5rem;
    display: flex;
    column-gap: 1rem;
}

.infoText {
    color: var(--color-border);
}

.infoButton {
    padding: 0.25rem 0.75rem;
    border: 1px solid #999c9f;
    background-color: transparent;
    color: #999c9f;
    cursor: pointer;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-normal);
}
.infoButton:hover {
    border: 1px solid white;
    color: white;
}

/* input */
.inputGroup {
    display: flex;
    padding: 1rem 0;
}

.input {
    width: 100%;
    display: block;
    padding: 0.75rem 1rem;
    font-size: var(--font-size-l);
    background-color: transparent;
    border: solid 1px var(--color-aside-bg);
    color: var(--color-light-gray);
    cursor: not-allowed;
}

.textAreaInput {
    cursor: text;
    height: 200px;
}

.input:focus {
    box-shadow: none;
    outline: none;
    background-position: 0 0;
}
</style>
