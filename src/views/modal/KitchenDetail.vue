<script setup>
import { ref } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();

const props = defineProps({
  data: Object,
});
const emit = defineEmits(["back"]);
const check = ref([]);
const warning = ref(false);

function readyOrder(id, chef) {
  if (check.value.length == props.data.order_detail.length) {
    axios
      .post(
        `http://127.0.0.1:8000/api/order/${id}/kitchen`,
        {
          id: chef,
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.users.token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    warning.value = false;
  } else {
    warning.value = true;
  }
}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div
      class="relative card bg-base-200 mx-auto w-max mt-28 bg-opacity-90 p-3"
    >
      <div class="flex justify-end">
        <button
          @click.prevent="$emit('back')"
          class="bg-base-100 rounded-btn bg-opacity-80 p-1 hover:bg-base-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <h1
        v-if="warning"
        class="inset-x-0 top-0 absolute py-3 px-6 text-lg text-warning font-bold w-fit"
      >
        Check ulang Boss!!
      </h1>
      <div class="px-5 pb-5 mt-3">
        <h1
          class="text-center font-bold text-2xl border-2 border-neutral rounded-btn"
        >
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
              <td>
                <input
                  type="checkbox"
                  class="checkbox checkbox-warning checkbox-sm"
                  :value="index"
                  v-model="check"
                />
              </td>
            </tr>

            <tr>
              <td>Status</td>
              <td>
                :
                <span
                  :class="[
                    data.status === 'Ready' ? 'badge-success' : '',
                    data.status === 'On Prosess' ? 'badge-warning' : '',
                    data.status === 'Lunas' ? 'badge-info' : '',
                  ]"
                  class="badge badge-lg"
                  >{{ data.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <button
          @click="readyOrder(data.id, userStore.users.id)"
          class="btn btn-outline btn-success flex mx-auto px-8 text-2xl"
        >
          Ready
        </button>
      </div>
    </div>
  </div>
</template>
