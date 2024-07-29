<script setup>
import { ref, computed } from "vue";
import useOrderStore from "@/stores/order.js";
import ListMenu from "./ListMenu.vue";

const orderStore = useOrderStore();

const costomerName = ref("");
const tabelNumber = ref(0);

function addNewOrder() {
  let name = costomerName.value;
  let table = tabelNumber.value;
  orderStore.proses(name, table);
  costomerName.value = "";
  tabelNumber.value = 0;
}

const products = computed(() => orderStore.products);
const totalPrice = computed(() => orderStore.totalPrice);
const totalQuantity = computed(() => orderStore.totalQuantity);

function addQuantity(product) {
  orderStore.add(product);
}
function subtractQuantity(product) {
  orderStore.subtract(product);
}
function removeProduct(productId) {
  orderStore.remove(productId);
}
</script>
<template>
  <div class="m-5 flex w-full">
    <main class="w-1/3 bg-neutral bg-opacity-50">
      <div class="p-5">
        <div class="bg-base-100 rounded-btn bg-opacity-80">
          <form class="card-body" @submit.prevent="addNewOrder()">
            <h1 class="text-accent font-bold text-4xl">Costomer Order</h1>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Costomer Name</span>
              </label>
              <input
                v-model="costomerName"
                type="text"
                placeholder="name"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Table Number</span>
              </label>
              <input
                v-model="tabelNumber"
                type="number"
                class="input input-bordered"
                required
              />
            </div>
            <label class="label">
              <span class="label-text">Items</span>
            </label>
            <table class="table">
              <thead class="uppercase bg-accent text-base-100">
                <tr class="text-center">
                  <th>image</th>
                  <th>Menu Name</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="list in products">
                  <td>
                    <img :src="list.image" class="rounded-full h-14" />
                  </td>
                  <td class="capitalize">
                    <p class="font-bold text-lg">
                      {{ list.name }}
                    </p>
                    <p class="">Rp.{{ list.price }}</p>
                  </td>
                  <td>
                    <div class="flex items-center">
                      <button @click="subtractQuantity(list)">
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 16.881V7.119a1 1 0 0 0-1.636-.772l-5.927 4.881a1 1 0 0 0 0 1.544l5.927 4.88a1 1 0 0 0 1.636-.77Z"
                          />
                        </svg>
                      </button>
                      <div>
                        <span class="text-lg font-semibold">{{
                          list.quantity
                        }}</span>
                      </div>
                      <button @click="addQuantity(list)" type="button">
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 16.881V7.119a1 1 0 0 1 1.636-.772l5.927 4.881a1 1 0 0 1 0 1.544l-5.927 4.88A1 1 0 0 1 8 16.882Z"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      @click="removeProduct(list.id)"
                      type="button"
                      class="font-medium text-error"
                    >
                      Remove
                    </button>
                  </td>
                  <td
                    class="px-6 py-4 font-semibold text-gray-900 dark:text-white"
                  >
                    <p
                      class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600 dark:text-gray-100"
                    >
                      Rp.{{ list.quantity * list.price }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="divider divider-accent"></div>
            <div class="stats shadow">
              <div class="stat place-items-center w-fit">
                <div class="stat-title">Total Items</div>
                <div class="stat-value">{{ totalQuantity }}</div>
              </div>

              <div class="stat place-items-center flex">
                <div class="text-xl font-bold">Total Price :</div>
                <div class="stat-value text-secondary">Rp.{{ totalPrice }}</div>
              </div>
            </div>
            <div class="form-control mt-6">
              <button
                type="submit"
                class="btn btn-accent text-base-100 text-xl"
              >
                Prosses Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    <section>
      <ListMenu />
    </section>
  </div>
  <div class="relative">
    <div class="fixed bottom-0 right-0 p-10">
      <RouterLink class="btn btn-lg" to="/order-list">Order List</RouterLink>
    </div>
  </div>
</template>
