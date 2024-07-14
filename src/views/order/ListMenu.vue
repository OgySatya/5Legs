<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import useOrderStore from "@/stores/order.js";

const orderStore = useOrderStore();

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

function addItem(product) {
  orderStore.add(product);
}
</script>
<template>
  <section class="">
    <div class="grid grid-cols-3 gap-6 px-5">
      <div v-for="(item, index) in itemList" :key="index" class="card card-compact bg-base-100 w-60 shadow-xl">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>Rp.{{ item.price }}</p>
          <div class="join mx-auto">
            <button @click="addItem(item, index)" class="btn btn-success join-item btn-sm bg-opacity-70 text-base-100">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
