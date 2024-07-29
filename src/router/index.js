import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import useUserStore from "@/stores/user.js";

const router = createRouter({
  linkExactActiveClass: " font-bold",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
      meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("../views/MenuList.vue"),
      meta: { requiresAuth: true, roles: [1] },
    },
    {
      path: "/costomer-order",
      name: "makeorder",
      component: () => import("../views/order/MakeOrder.vue"),
      meta: { requiresAuth: true, roles: [2] },
    },
    {
      path: "/order-list",
      name: "order-list",
      component: () => import("../views/order/OrderList.vue"),
      meta: { requiresAuth: true, roles: [2, 1] },
    },
    {
      path: "/kitchen",
      name: "kitchen",
      component: () => import("../views/order/Kitchen.vue"),
      meta: { requiresAuth: true, roles: [3] },
    },
    {
      path: "/cashier",
      name: "cashier",
      component: () => import("../views/order/Cashier.vue"),
      meta: { requiresAuth: true, roles: [4] },
    },
    {
      path: "/invoice/:id",
      name: "invoice",
      component: () => import("../views/invoice.vue"),
      
    },
    {
      path: "/",
      name: "about",
      component: () => import("../views/About.vue"),

    },
    {
      path: "/report",
      name: "report",
      component: () => import("../views/Report.vue"),
      meta: { requiresAuth: true, roles: [1] },
    },
  ],
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.isLoggedIn) {
      next("/login");
    } else {
      const routeRoles = to.meta.roles;
      if (routeRoles.includes(userStore.users.role)) {
        next();
      } else {
        next("/");
      }
    }
  } else {
    next();
  }
});

export default router;
