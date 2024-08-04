<script setup>
import { ref, onMounted } from "vue";

import detailed from "../modal/OrderDetail.vue";
import useOrderListStore from "@/stores/orders";

const orderListStore = useOrderListStore();

onMounted(async () => {
  await orderListStore.getData()
});
async function detailOrder(id) {
  await orderListStore.showData(id)
  toggle()
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
        <detailed v-if="modal" @back="() => toggle()" />
      </Transition>
    </Teleport>
  </div>
  <section class="grid grid-cols-2 gap-5 m-10 lg:grid-cols-4">
    <div v-for="(order, index) in orderListStore.allOrder" :key="index"
      class="card bg-base-200 border-4 border-primary w-72 p-3">
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
          <span :class="[
            order.status === 'Ready' ? 'badge-success' : '',
            order.status === 'On Prosess' ? 'badge-warning' : '',
            order.status === 'Lunas' ? 'badge-info' : '',
          ]" class="badge">{{ order.status }}</span>
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
        <RouterLink class="btn btn-lg btn-info text-base-100" to="/costomer-order">Back</RouterLink>
      </div>
    </div>
  </section>
</template>
