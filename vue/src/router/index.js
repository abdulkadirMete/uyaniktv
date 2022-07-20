import { createRouter, createWebHistory } from "vue-router";
import ChannelDetailView from "../views/ChannelDetailView.vue";
import HomeView from "../views/HomeView.vue";
import ShoppingView from "../views/ShoppingView.vue";
import LoginForm from "../components/authForms/LoginForm.vue";
import RegisterForm from "../components/authForms/RegisterForm.vue";
import ProfileForm from "../components/authForms/ProfileForm.vue";
import store from "../store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
            children: [
                {
                    name: "Register",
                    path: "kaydol",
                    component: RegisterForm,
                    meta: { notNeedIfUserExist: true },
                },
                {
                    name: "Login",
                    path: "giris",
                    component: LoginForm,
                    meta: { notNeedIfUserExist: true },
                },

                {
                    name: "Profile",
                    path: "profil",
                    component: ProfileForm,
                    meta: { requireLogin: true },
                },
            ],
        },
        {
            path: "/uyelik",
            name: "Membership",
            component: ShoppingView,
        },

        {
            path: "/canli-izle/:id",
            name: "ChannelDetail",
            component: ChannelDetailView,
            meta: { requiresAuth: true },
        },
    ],
});

router.beforeEach((to, from, next) => {
    // login register lock
    if (to.meta.notNeedIfUserExist && store.getters.getSession) {
        next({ name: "Home" });
    }
    // try
    if (to.meta.requireLogin && store.getters.getUser) {
        next();
    }
    // protect watch page
    if (to.meta.requiresAuth && !store.getters.getMembership) {
        next({ name: "Membership" });
    } else {
        next();
    }
});

export default router;
