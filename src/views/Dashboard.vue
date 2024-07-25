<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import detailed from "./modal/OrderDetail.vue";
import Sidebar from "../components/Sidebar.vue";

const userStore = useUserStore();
const data = ref([]);
const orderDetail = ref({});
const startDate = ref();
const endDate = ref();
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
function reportByDate() {
  axios
    .post(
      "http://127.0.0.1:8000/api/dashboard",
      {
        start: startDate.value,
        end: endDate.value,
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.users.token}`,
        },
      }
    )
    .then(function (response) {
      data.value = response.data;
      console.log(data.value);
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
  <div class="w-full flex">
    <aside>
      <Sidebar />
    </aside>
    <main class="reltive w-screen">
      <div class="grid px-10 mt-5">
        <div class="flex justify-between my-4">
          <div class="grid">
            <label class="label">
              <span class="label-text">date strat from</span>
            </label>
            <input
              type="date"
              v-model="startDate"
              class="border-4 p-2 rounded-btn border-neutral"
            />
          </div>
          <div class="grid">
            <label class="label">
              <span class="label-text">date end</span>
            </label>
            <input
              class="border-4 p-2 rounded-btn border-neutral"
              type="date"
              v-model="endDate"
            />
          </div>
          <button class="btn" @click="reportByDate">Gas</button>
        </div>

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
            <div v-if="data.users" class="stat-value">
              {{ data.users.length }}
            </div>
            <div class="stat-desc text-accent-content">↘︎ 90 (14%)</div>
          </div>
        </div>

        <section>
          <div class="overflow-x-auto mt-10">
            <table class="table table-zebra">
              <!-- head -->
              <thead class="bg-neutral text-neutral-content">
                <tr>
                  <th></th>
                  <th>Costomer</th>
                  <th>Waiter</th>
                  <th>Chef</th>
                  <th>cashier</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in data.allorder" class="capitalize">
                  <th>{{ list.id }}</th>
                  <td>{{ list.costomer_name }}</td>
                  <td>{{ list.waiter ? list.waiter.name : "-" }}</td>
                  <td>{{ list.chef ? list.chef.name : "-" }}</td>
                  <td>{{ list.cashier ? list.cashier.name : "-" }}</td>
                  <td>{{ list.total_price }}</td>
                  <td>
                    <div
                      :class="[
                        list.status === 'Ready' ? 'bg-success' : 'bg-base-300',
                        list.status === 'On Prosess'
                          ? 'bg-warning'
                          : 'bg-base-300',
                        list.status === 'Lunas' ? 'bg-info' : 'bg-base-300',
                      ]"
                      class="text-center p-2 rounded-btn"
                    >
                      <button @click="detailOrder(list.id)">
                        {{ list.status }}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
