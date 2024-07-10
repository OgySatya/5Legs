import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  linkExactActiveClass:
    "bg-neutral text-neutral-content px-3 py-1.5 rounded-box",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
  ],
});

export default router;
