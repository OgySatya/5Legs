<script setup>
import { ref, onMounted } from "vue";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();
onMounted(() => {
  userData.value = userStore.showUser
  console.log(userStore.showUser)
});
const emit = defineEmits(["back", "edit"]);
const userData = ref('')
async function deleteUser(id) {
  await userStore.removeUser(id)
  location.reload()
}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class="w-full mx-auto mt-10">
      <div class="bg-neutral p-4 w-fit mx-auto rounded-box bg-opacity-70">
        <div class="w-[500px] mx-auto bg-base-100 rounded-box">
          <div class="rounded-t-lg h-40 overflow-hidden " style="background-image: url(https://picsum.photos/500/200)">
            <div class="flex justify-end p-2">
              <button @click="$emit('back')" class="bg-base-100 rounded-btn bg-opacity-50 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="mx-auto size-40 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img class="object-cover object-center h-40" src='https://i.pravatar.cc/300' alt='Woman looking front'>
          </div>
          <div class="text-center mt-2">
            <h2 class="font-bold uppercase text-xl">{{ userData.id }} - {{ userData.name }}</h2>
            <p class="text-gray-800">{{ userData.email }}</p>
          </div>
          <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">

            <li class="flex flex-col items-center justify-around">
              <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>
              <div v-if="userData.roles" class="capitalize">{{ userData.roles.name }}</div>
            </li>
          </ul>
          <div class="p-4 border-t mx-24 mt-2 flex justify-between">
            <button @click="$emit('edit')" class="btn btn-active btn-sm btn-warning">Update</button>
            <button @click="deleteUser(userData.id)" class="btn btn-active btn-sm btn-error">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
