import { createRouter, createWebHistory } from "vue-router";
import ChannelDetailView from "../views/ChannelDetailView.vue";
import HomeView from "../views/HomeView.vue";
import ShoppingView from "../views/ShoppingView.vue";
import LoginForm from "../components/authForms/LoginForm.vue";
import RegisterForm from "../components/authForms/RegisterForm.vue";
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
        },
        {
          name: "Login",
          path: "giris",
          component: LoginForm,
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
  if (to.meta.requiresAuth && !store.getters.getUser) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
