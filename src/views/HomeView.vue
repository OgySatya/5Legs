<script setup>
import { ref } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const email = ref();
const password = ref();

function login() {
  axios
    .post("http://127.0.0.1:8000/api/auth/login", {
      email: email.value,
      password: password.value,
    })
    .then(function (response) {
      userStore.addUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role_id,
        token: response.data.token,
      });
      if (response.data.role_id == 1) {
        router.push("/dashboard");
      } else if (response.data.role_id == 2) {
        router.push("/costomer-order");
      } else if (response.data.role_id == 3) {
        router.push("/kitchen");
      } else if (response.data.role_id == 4) {
        router.push("/cashier");
      }
    });
}
</script>

<template>
  <main>
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form class="card-body" @submit.prevent="login()">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="email"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="password"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
