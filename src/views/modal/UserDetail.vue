<script setup>
import { ref, onMounted } from "vue";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();
onMounted(async () => {
  userData.value = userStore.showUser
  console.log(userData.value)
  name.value = userData.value.name
  email.value = userData.value.email
  role.value = userData.value.role_id
});
const emit = defineEmits(["back"]);
const userData = ref('')
const name = ref()
const email = ref()
const role = ref()

async function editUser(id) {
  const param = {
    name: name.value,
    email: email.value,
    role_id: role.value,
    _method: "put",
  }
  await userStore.updateData(id, param)
  location.reload()
}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class=" w-2/5 mx-auto mt-10 bg-neutral rounded-2xl bg-opacity-50">


      <div class="p-5">

        <div class="bg-base-100 rounded-btn bg-opacity-80 mx-auto">
          <div class="flex justify-end p-2">
            <button @click="$emit('back')" class="bg-base-100 rounded-btn bg-opacity-80 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="avatar w-full">
            <div class="mask mask-squircle w-24 mx-auto">
              <img src="https://i.pravatar.cc/300" />
            </div>
          </div>
          <h1 class="flex justify-center text-accent font-bold text-4xl uppercase">{{ userData.name }}</h1>
          <form class="card-body" @submit.prevent="editUser(userData.id)">
            <div class="form-control">
              <label class="label">
                <span class="label-text">User Name</span>
              </label>
              <input v-model="name" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="email" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Role</span>
              </label>
              <select id="role" v-model="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choose a role</option>
                <option :value="1">Manager</option>
                <option :value="2">Waiter</option>
                <option :value="3">Chef</option>
                <option :value="4">Cashier</option>
              </select>
            </div>
            <div class="mx-auto mt-6">
              <button type="submit" class="btn btn-accent text-base-100 text-xl">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
