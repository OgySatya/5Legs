<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();

const orderList = ref([]);
onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/order", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      orderList.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>
<template>
  <section class="grid grid-cols-4 gap-5 m-10">
    <div
      v-for="(order, index) in orderList"
      :key="index"
      class="card bg-base-200 border-4 border-primary w-96 p-5"
    >
      <p class="text-center font-bold text-2xl">
        Order Number : {{ order.id }}
      </p>
      <p class="text-center font-bold text-2xl">
        Waiter : {{ userStore.users.name }}
      </p>
      <div class="card-body">
        <h2 class="card-title">Time : {{ order.order_time }}</h2>
        <p>Costomer Name : {{ order.costomer_name }}</p>
        <p>Table Number: {{ order.table_number }}</p>
        <p>Total Price: {{ order.total_price }}</p>
        <p>
          Status:
          <span class="badge badge-info text-base-100">{{ order.status }}</span>
        </p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Open Detail</button>
        </div>
      </div>
    </div>
  </section>
</template>
