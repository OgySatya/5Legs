<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";

const userStore = useUserStore();
const data = ref([]);
onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      data.value = response.data;
      console.log(data.value);
    });
});
</script>
<template>
  <div class="grid mx-auto w-fit mt-10">
    <div class="justify-between gap-4 flex">
      <div class="stat bg-primary text-primary-content rounded-box">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-primary-content">Total Order</div>
        <div class="stat-value">{{ data.totalorder }}</div>
        <div class="stat-desc text-primary-content">Jan 1st - Feb 1st</div>
      </div>

      <div class="stat bg-secondary text-secondary-content rounded-box">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-secondary-content">Cuan</div>
        <div class="stat-value">Rp. {{ data.totalamount }}</div>
        <div class="stat-desc text-secondary-content">↗︎ 400 (22%)</div>
      </div>

      <div class="stat bg-accent text-accent-content rounded-box">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-accent-content">Total User</div>
        <div v-if="data.users" class="stat-value">{{ data.users.length }}</div>
        <div class="stat-desc text-accent-content">↘︎ 90 (14%)</div>
      </div>
    </div>

    <section>
      <div class="overflow-x-auto mt-10">
        <table class="table table-zebra">
          <!-- head -->
          <thead class="bg-neutral text-base-100">
            <tr>
              <th></th>
              <th>Costomer</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in data.allorder">
              <th>{{ list.id }}</th>
              <td>{{ list.costomer_name }}</td>
              <td>{{ list.total_price }}</td>
              <td
                :class="[
                  list.status === 'Ready' ? 'bg-success' : '',
                  list.status === 'On Prosess' ? 'bg-warning' : '',
                  list.status === 'Lunas' ? 'bg-info' : '',
                ]"
                class="text-center"
              >
                {{ list.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
