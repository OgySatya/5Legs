<script setup>
import { ref } from "vue";
import useUserStore from "@/stores/user.js";
import axios from "axios";

const userStore = useUserStore();
const userName = ref(userStore.users.name);
function logout() {
  axios
    .get("http://127.0.0.1:8000/api/auth/logout", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function () {
      userStore.logout();
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>
<template>
  <nav>
    <div class="navbar bg-base-300 px-6">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a>Home</a></li>
            <li>
              <a>User</a>
              <ul class="p-2">
                <li><a>New User</a></li>
                <li><a>Login</a></li>
              </ul>
            </li>
            <li><a>Order</a></li>
          </ul>
        </div>
        <label class="swap">
          <input type="checkbox" value="retro" class="theme-controller" />
          <div class="swap-on text-4xl font-bold">Kaki5</div>
          <div class="swap-off text-4xl font-bold">5Legs</div>
        </label>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 text-2xl">
          <li class="">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/auth/Register">Register</RouterLink>
          </li>
          <li>
            <RouterLink to="/menu">Menu</RouterLink>
          </li>
          <li>
            <details class="dropdown">
              <summary>Order</summary>
              <ul
                tabindex="0"
                class="menu menu-lg dropdown-content bg-base-200 rounded-btn z-[1] mt-3 p-2"
              >
                <li>
                  <RouterLink to="/costomer-order">Costomer</RouterLink>
                </li>
                <li>
                  <RouterLink to="/order-list">Order List</RouterLink>
                </li>
                <li>
                  <RouterLink to="/costomer-order">Kitchen</RouterLink>
                </li>
                <li>
                  <RouterLink to="/costomer-order">Cashier</RouterLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end space-x-2">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" class="theme-controller" value="dark" />

          <!-- sun icon -->
          <svg
            class="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
        <div v-if="userStore.users.name" class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn m-1 w-fit uppercase">
            {{ userStore.users.name }}
          </div>
          <ul tabindex="0" class="z-[1] menu dropdown-content bg-transparent">
            <li class="">
              <button class="btn" @click="logout()">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
