<script setup>
import { computed, ref } from "vue";
import useUserStore from "@/stores/user.js";
import axios from "axios";
import { useRouter } from "vue-router";
import useThemeStore from "@/stores/theme.js";

const theme = useThemeStore();
const newTheme = ref("");
const themeDark = ref("");
function ThemeQ() {
  if (newTheme.value) {
    theme.change('retro')
  } else if (themeDark.value) {
    theme.change('dark')
  }
  else { theme.change('') }
}

const userStore = useUserStore();
const router = useRouter();

const userName = computed(() => userStore.users.name);
function logout() {
  axios.get("http://127.0.0.1:8000/api/auth/logout", {
    headers: {
      Authorization: `Bearer ${userStore.users.token}`,
    },
  });

  userStore.logout();
  router.push("/login");
}
</script>
<template>
  <nav>
    <div class="navbar bg-base-300 px-6">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li class="">
              <RouterLink to="/dashboard">Dashborad</RouterLink>
            </li>
            <li class="">
              <RouterLink to="/login">Login</RouterLink>
            </li>
            <li>
              <RouterLink to="/auth/Register">Register</RouterLink>
            </li>
            <li>
              <RouterLink to="/menu">Menu</RouterLink>
            </li>
            <li class="dropdown">
              <div tabindex="0" role="button" class="">Order</div>
              <ul tabindex="0" class="p-2">
                <li>
                  <RouterLink to="/costomer-order">Costomer</RouterLink>
                </li>
                <li>
                  <RouterLink to="/order-list">Order List</RouterLink>
                </li>
                <li>
                  <RouterLink to="/kitchen">Kitchen</RouterLink>
                </li>
                <li>
                  <RouterLink to="/cashier">Cashier</RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <label class="swap">
          <input type="checkbox" value="retro" v-model="newTheme" @change="ThemeQ()" />
          <div class="swap-on text-4xl font-bold">Kaki5</div>
          <div class="swap-off text-4xl font-bold">5Legs</div>
        </label>
        <!-- <select
          v-model="newTheme"
          @change="themeQ()"
          class="select select-bordered select-sm w-full max-w-xs"
        >
          <option disabled selected>Small</option>
          <option value="retro">Small Apple</option>
          <option>Small Orange</option>
          <option>Small Tomato</option>
        </select>
        <button @click="ThemeQ()">xxxx</button> -->
      </div>
      <div v-if="userStore.users.role == 1" class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 text-2xl">
          <li class="">
            <RouterLink to="/dashboard">Dashborad</RouterLink>
          </li>
          <li class="">
            <RouterLink to="/login">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/auth/Register">Register</RouterLink>
          </li>
          <li>
            <RouterLink to="/menu">Menu</RouterLink>
          </li>
          <li class="dropdown">
            <div tabindex="0" role="button" class="">Order</div>
            <ul tabindex="0"
              class="text-xl dropdown-content bg-base-300 rounded-btn z-[1] p-2 mx-auto mt-2 bg-opacity-85">
              <li>
                <RouterLink to="/costomer-order">Costomer</RouterLink>
              </li>
              <li>
                <RouterLink to="/order-list">Order List</RouterLink>
              </li>
              <li>
                <RouterLink to="/kitchen">Kitchen</RouterLink>
              </li>
              <li>
                <RouterLink to="/cashier">Cashier</RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="navbar-end space-x-2">
        <label class="swap swap-rotate">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" v-model="themeDark" @change="ThemeQ()" />

          <!-- sun icon -->
          <svg class="swap-on h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <!-- moon icon -->
          <svg class="swap-off h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        <div v-if="userStore.users.name" class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn m-1 w-fit uppercase text-xl font-bold">
            {{ userName }}
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
