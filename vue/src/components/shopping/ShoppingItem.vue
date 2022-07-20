<template>
    <div :class="$style.buy">
        <div :class="$style.priceGroup" @click="buyPacket(membership)">
            <span :class="$style.title">{{ membership.title }}</span>
            <span :class="$style.price">{{ membership.price }}</span>
        </div>
    </div>
</template>
<script>
import moment from "moment";
import { ref } from "vue";
import { dateFormat } from "../../data/options";
import store from "../../store";
import { notify } from "@kyvg/vue3-notification";
import { notifyMaker } from "../../helpers/helpers";
import { defineAsyncComponent } from "vue";
import router from "../../router";

export default {
    components: {
        StripeCheckout: defineAsyncComponent((_) =>
            import("@vue-stripe/vue-stripe")
        ),
    },
    props: { membership: Object },
    setup() {
        const stripeKey = `${import.meta.env.VITE_API_STRIPE_KEY}`;
        const successUrl = `${import.meta.env.VITE_API_PAYMENT_SUCCESS_URL}`;
        const cancelUrl = `${import.meta.env.VITE_API_PAYMENT_CANCEL_URL}`;
        const checkoutRef = ref(null);

        // global loading
        const loading = (state) => {
            store.commit("toggleLoading", state);
        };

        // calculate finishDate
        const calcMembershipDate = (days) => {
            const currentDate = moment().format(dateFormat);
            return moment(currentDate).add(days, "days").format(dateFormat);
        };

        const buyPacket = (membership) => {
            let user;
            store
                .dispatch("setUserIfExist")
                .then((res) => (user = res))
                .finally(() => {
                    // check user
                    if (!user) {
                        notify(
                            notifyMaker(
                                "Üyelik paketi satın almak için önce giriş yapmalısınız!",
                                "warning"
                            )
                        );
                    } else {
                        if (user.membership) {
                            return notify(
                                notifyMaker(
                                    "Zaten üyeliğiniz bulunmakta!",
                                    "warning"
                                )
                            );
                        }
                        // create membership object
                        const finishDate = calcMembershipDate(membership.day);
                        // buy membership
                        loading(true);
                        store
                            .dispatch("buyMembership", finishDate)
                            .then(() => {
                                loading(false);
                                store.dispatch("setUserIfExist").then(() => {
                                    router.push("/");
                                    notify(
                                        notifyMaker(
                                            "Satın alma işlemi başarılı!",
                                            "success"
                                        )
                                    );
                                });
                            })
                            .catch(() => {
                                loading(false);
                                notify(notifyMaker("Bir hata oluştu", "error"));
                            });
                    }
                });
        };

        return {
            checkoutRef,
            buyPacket,
            stripeKey,
            successUrl,
            cancelUrl,
            loading
        };
    },
};
</script>
<style module>
.buy {
    display: flex;
    row-gap: 2rem;
    flex-direction: column;
    flex: 2;
}

.priceGroup {
    display: flex;
    box-shadow: var(--shadow-1);
    border-radius: var(--border-radius-sm);
    justify-content: space-between;
    padding: 2rem;
    column-gap: 2rem;
    transition: all 0.3s linear;
    cursor: pointer;
    border-left: 8px solid var(--color-brand);
}

.priceGroup:hover {
    transform: scale(1.05);
}

.title {
    font-size: var(--font-size-xxl);
    color: var(--color-divider-bg);
    font-weight: 600;
}

.price {
    font-size: var(--font-size-xxl);
    font-weight: 700;
    color: var(--color-white);
    background: var(--color-brand-logo-bg);
    padding: 0 0.5rem;
    border-radius: var(--border-radius-md);
    width: 140px;
    text-align: center;
}

@media screen and (max-width: 768px) {
    .buy,
    .priceGroup {
        width: 100%;
    }
    .price {
        font-size: var(--font-size-l);
    }

    .title {
        font-size: var(--font-size-normal);
    }
}
</style>
