<script setup>
import useUserStore from "@/stores/user.js";
import useOrderListStore from "@/stores/orders";

const orderListStore = useOrderListStore();
const userStore = useUserStore();
const data = orderListStore.showOrder
const emit = defineEmits(["back"]);

async function removeOrder(id) {
  await orderListStore.removeData(id)
  location.reload();
}
async function serveOrder(id) {
  await orderListStore.serve(id)
  location.reload()
}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class="card bg-base-200 mx-auto w-max mt- bg-opacity-90">
      <div class="flex justify-end p-3">
        <button @click.prevent="$emit('back')"
          class="bg-error text-base-100 rounded-btn bg-opacity-80 p-1 hover:bg-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="px-5 pb-5">
        <h1 class="text-center font-bold text-2xl border-2 border-neutral rounded-btn">
          Order Number : {{ data.id }}
        </h1>
        <table class="table capitalize text-lg">
          <thead>
            <tr>
              <th class="sr-only">1</th>
              <th class="sr-only">1</th>
              <th class="sr-only">1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order Time</td>
              <td>: {{ data.order_time }}</td>
            </tr>
            <tr>
              <td>Costomer Name</td>
              <td>: {{ data.costomer_name }}</td>
            </tr>
            <tr>
              <td>Table Number</td>
              <td>: {{ data.table_number }}</td>
            </tr>
            <tr>
              <td>Ordered Items :</td>
            </tr>

            <tr v-for="(menu, index) in data.order_detail" :key="index">
              <td>
                {{ index + 1 }}. {{ menu.item.name }}
                <span class="lowercase">x {{ menu.quantity }}</span>
              </td>
              <td>@ Rp.{{ menu.item.price }}</td>
            </tr>

            <tr>
              <td>Total Price</td>
              <td>: Rp.{{ data.total_price }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>
                :
                <span :class="[
                  data.status === 'Ready' ? 'badge-success' : '',
                  data.status === 'On Prosess' ? 'badge-warning' : '',
                  data.status === 'Lunas' ? 'badge-info' : '',
                ]" class="badge badge-lg">{{ data.status }}</span>
              </td>
            </tr>
            <tr>
              <td>Waiter Name</td>
              <td>: {{ data.waiter.name }}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex">
          <button @click="removeOrder(data.id)" class="btn btn-outline btn-error mx-auto px-8 text-2xl">
            Remove
          </button>
          <button :class="[data.status !== 'Ready' ? 'btn-disabled' : '']" v-if="userStore.users.role == 2"
            @click="serveOrder(data.id)" class="btn btn-outline mx-auto px-8 text-2xl">
            Serve
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
