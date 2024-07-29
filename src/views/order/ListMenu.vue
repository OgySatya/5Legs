<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import useOrderStore from "@/stores/order.js";

const orderStore = useOrderStore();
const imgUrl = "http://localhost:8000/storage/item/"
const itemList = ref([]);
onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/item", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      itemList.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
});

const userStore = useUserStore();

function addItem(item) {
  orderStore.add(item);
}
</script>
<template>
  <section class="">
    <div class="grid grid-cols-3 gap-6 px-5">
      <div v-for="(item, index) in itemList" :key="index" class="card card-compact bg-base-100 w-60 shadow-xl">
        <figure>
          <img :src="imgUrl + item.image" class="h-40" />
        </figure>
        <div class="card-body">
          <div class="flex justify-between">
            <h2 class="card-title">{{ item.name }}</h2>
            <h2 class="badge badge-lg badge-neutral capitalize p-3">{{ item.categories.name }}</h2>
          </div>
          <p>Rp.{{ item.price }}</p>
          <div class="join mx-auto">
            <button @click="addItem(item)" class="btn btn-success join-item btn-sm bg-opacity-70 text-base-100">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
