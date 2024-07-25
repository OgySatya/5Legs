<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();
const props = defineProps({
  data: Number,
});
onMounted(() => {
  setTimeout(() => {
    getData(props.data);
  }, 500);
});
const emit = defineEmits(["back"]);
const userData = ref('')
function getData(id) {
  axios
    .get(`http://127.0.0.1:8000/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      userData.value = response.data;
      email.value = response.data.email
      role.value = response.data.roles.name
      console.log(response.data)
    })

}
const email = ref()
const role = ref()

</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class=" w-2/5 mx-auto mt-40 bg-neutral rounded-2xl bg-opacity-50">


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
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <h1 class="flex justify-center text-accent font-bold text-4xl">{{ userData.name }}</h1>
          <form class="card-body" @submit.prevent="editItem()">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="email" type="text" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Role</span>
              </label>
              <input v-model="role" type="text" class="input input-bordered" step="1000" required />
            </div>
            <div class="flex justify-between mt-6">
              <button class="btn btn-error text-base-100 text-xl">
                Delete User
              </button>
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
