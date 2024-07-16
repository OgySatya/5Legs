import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  linkExactActiveClass: " font-bold",
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
      path: "/auth/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("../views/MenuList.vue"),
    },
    {
      path: "/costomer-order",
      name: "makeorder",
      component: () => import("../views/order/MakeOrder.vue"),
    },
    {
      path: "/order-list",
      name: "order-list",
      component: () => import("../views/order/OrderList.vue"),
    },
    {
      path: "/kitchen",
      name: "kitchen",
      component: () => import("../views/order/Kitchen.vue"),
    },
    {
      path: "/cashier",
      name: "cashier",
      component: () => import("../views/order/Cashier.vue"),
    },
  ],
});

export default router;
