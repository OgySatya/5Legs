<script setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const role = ref("");
const password = ref("");
const confirmPassword = ref("");
const warning = ref(false);
const success = ref(false);

function registerUser() {
  if (password.value === confirmPassword.value) {
    axios
      .post(
        "http://127.0.0.1:8000/api/user",
        { headers: { Authorization: `Bearer ${tokenStr}` } },
        {
          name: name.value,
          email: email.value,
          role_id: role.value,
          password: password.value,
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    warning.value = false;
    success.value = true;
  } else {
    warning.value = true;
    success.value = false;
  }
}
</script>
<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-base-300 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl"
          >
            Create New User
          </h1>
          <p
            v-if="warning"
            class="text-red-500 text-center text-sm font-semibold animate-bounce"
          >
            Password Sing Patuh!!!
          </p>
          <p
            v-else-if="success"
            class="text-lime-500 text-center text-sm font-semibold animate-bounce"
          >
            Mantap Boss!!!
          </p>
          <form class="space-y-4 md:space-y-6" @submit.prevent="registerUser()">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium"
                >Name</label
              >
              <input
                type="string"
                v-model="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name"
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium"
                >E-mail</label
              >
              <input
                type="email"
                v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Name@email.com"
                required
              />
            </div>
            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Role</label
              >
              <select
                id="role"
                v-model="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose a role</option>
                <option :value="1">Boss</option>
                <option :value="2">Waiter</option>
                <option :value="3">Chef</option>
                <option :value="4">Cashier</option>
              </select>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium"
                >Password</label
              >
              <input
                type="password"
                v-model="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium"
                >Confirm password</label
              >
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-amber-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-500"
            >
              Create an account
            </button>
          </form>
          <RouterLink
            class="text-blue-700 text-center text-sm font-semibold"
            to="/auth/login"
            >Back to Login</RouterLink
          >
        </div>
      </div>
    </div>
  </section>
</template>
