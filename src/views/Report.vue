<script setup>
import { ref, onMounted } from "vue";
import detailed from "./modal/OrderDetail.vue";
import { service } from "@/utils/service";
import useOrderListStore from "@/stores/orders";

const orderListStore = useOrderListStore();
const today = ref(new Date().toISOString().split('T')[0]);
const data = ref([]);
const orderDetail = ref({});
const startDate = ref(today.value);
const endDate = ref(today.value);
onMounted(async () => {
  const response = await service().get("/dashboard"
    // , {
    //   params: {
    //     start: today.value,
    //     end: today.value,
    //   },
    // }
  );
  data.value = response.data;
});
async function detailOrder(id) {
  await orderListStore.showData(id)
  toggle();
}
async function reportByDate() {
  const response = await service().get("/dashboard", {
    params: {
      start: startDate.value,
      end: endDate.value,
    },
  });
  data.value = response.data;
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
  <main class="reltive w-full">
    <div class="grid px-20 mt-5">
      <div class="flex gap-8 my-4">
        <div class="border-4 p-2 rounded-btn border-neutral">
          <p class="inline-flex mx-2 font-bold">Start Date :</p>
          <input type="date" v-model="startDate" class="bg-transparent" />
        </div>
        <div class="border-4 p-2 rounded-btn border-neutral">
          <p class="inline-flex mx-2 font-bold">End Date :</p>

          <input type="date" v-model="endDate" class="bg-transparent" />
        </div>
        <button class="btn btn-outline border-4 border-neutral font-bold" @click="reportByDate">
          Gas
        </button>
      </div>

      <div class="justify-between gap-4 flex">
        <div class="stat bg-primary text-primary-content rounded-box">
          <div class="stat-figure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="stat-title text-primary-content">Total Order</div>
          <div class="stat-value">{{ data.totalorder }}</div>
          <div class="stat-desc text-primary-content">Jan 1st - Feb 1st</div>
        </div>

        <div class="stat bg-secondary text-secondary-content rounded-box">
          <div class="stat-figure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
              </path>
            </svg>
          </div>
          <div class="stat-title text-secondary-content">Cuan</div>
          <div class="stat-value">Rp. {{ data.totalamount }}</div>
          <div class="stat-desc text-secondary-content">↗︎ 400 (22%)</div>
        </div>

        <div class="stat bg-accent text-accent-content rounded-box">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              class="inline-block h-8 w-8 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div class="stat-title text-accent-content">Total User</div>
          <div v-if="data.users" class="stat-value">
            {{ data.users }}
          </div>
          <div class="stat-desc text-accent-content">↘︎ 90 (14%)</div>
        </div>
      </div>

      <section>
        <div class="overflow-x-auto mt-10">
          <table class="table table-zebra">
            <!-- head -->
            <thead class="bg-neutral text-neutral-content">
              <tr class="text-lg">
                <th></th>
                <th>Costomer</th>
                <th>Ordering Time</th>
                <th>Waiter</th>
                <th>Chef</th>
                <th>Cashier</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in data.allorder" class="capitalize">
                <th>{{ list.id }}</th>
                <td>{{ list.costomer_name }}</td>
                <td>{{ list.order_time }}</td>
                <td>{{ list.waiter ? list.waiter.name : "-" }}</td>
                <td>{{ list.chef ? list.chef.name : "-" }}</td>
                <td>{{ list.cashier ? list.cashier.name : "-" }}</td>
                <td>{{ list.total_price }}</td>
                <td>
                  <div :class="[
                    list.status === 'Ready' ? 'bg-success' : 'bg-base-300',
                    list.status === 'On Prosess'
                      ? 'bg-warning'
                      : 'bg-base-300',
                    list.status === 'Lunas' ? 'bg-info' : 'bg-base-300',
                  ]" class="text-center p-2 rounded-btn dark:text-slate-100">
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
</template>
