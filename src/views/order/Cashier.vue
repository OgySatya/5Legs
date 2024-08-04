<script setup>
import { ref, onMounted, computed } from "vue";
import detailed from "../modal/CashierDetail.vue";

import useOrderListStore from "@/stores/orders";
const orderListStore = useOrderListStore();
const filteredOrder = computed(() => {
  return orderListStore.allOrder.filter((cashier) => cashier.status === "Served");
});

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
  <section class="grid grid-cols-4 gap-5 m-10">
    <div v-for="(order, index) in filteredOrder" :key="index" class="card bg-base-200 border-4 border-primary w-96 p-5">
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
  </section>
</template>
