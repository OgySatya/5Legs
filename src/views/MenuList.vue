<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import addMenu from "./modal/AddMenu.vue";

const userStore = useUserStore();
const itemList = ref([]);
onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/item", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      itemList.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
const showModal = ref(false);
function add() {
  showModal.value = !showModal.value;
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <addMenu v-if="showModal" @back="() => add()" />
      </Transition>
    </Teleport>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
    <div
      v-for="(item, index) in itemList"
      :key="index"
      class="card card-compact bg-base-100 w-48 shadow-xl"
    >
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ item.name }}</h2>
        <p>Rp.{{ item.price }}</p>
        <button class="btn btn-xs btn-primary">Order Now</button>
      </div>
    </div>
  </div>

  <div class="relative">
    <div class="fixed bottom-0 right-0 p-10">
      <button
        @click="add()"
        class="btn btn-secondary text-xl text-secondary-content"
      >
        Tambah Menu
      </button>
    </div>
  </div>
</template>
