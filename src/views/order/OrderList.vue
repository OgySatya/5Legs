<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import detailed from "../modal/OrderDetail.vue";

const userStore = useUserStore();

const orderList = ref([]);
const orderDetail = ref({});

onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/order", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      orderList.value = response.data.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
function detailOrder(id) {
  axios
    .get(`http://127.0.0.1:8000/api/order/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      orderDetail.value = response.data;
      toggle();
    });
}
const modal = ref(false);
function toggle() {
  modal.value = !modal.value;
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <detailed v-if="modal" :data="orderDetail" @back="() => toggle()" />
      </Transition>
    </Teleport>
  </div>
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
        Waiter : {{ order.waiter_id }}
      </p>
      <div class="card-body">
        <h2 class="card-title">Time : {{ order.order_time }}</h2>
        <p>Costomer Name : {{ order.costomer_name }}</p>
        <p>Table Number: {{ order.table_number }}</p>
        <p>Total Price: {{ order.total_price }}</p>
        <p>
          Status:
          <span
            :class="[
              order.status === 'Ready' ? 'badge-success' : '',
              order.status === 'On Prosess' ? 'badge-warning' : '',
              order.status === 'Lunas' ? 'badge-info' : '',
            ]"
            class="badge"
            >{{ order.status }}</span
          >
        </p>
        <div class="card-actions justify-end">
          <button @click="detailOrder(order.id)" class="btn btn-primary">
            Open Detail
          </button>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="fixed bottom-0 right-0 p-10">
        <RouterLink
          class="btn btn-lg btn-info text-base-100"
          to="/costomer-order"
          >Back</RouterLink
        >
      </div>
    </div>
  </section>
</template>
