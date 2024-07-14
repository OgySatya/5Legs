<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";

const itemList = ref([]);
onMounted(() => {
    axios
        .get("http://127.0.0.1:8000/api/item", {
            headers: {
                Authorization: `Bearer ${userStore.users.token}`,
            },
        })
        .then(function (response) {
            itemList.value = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
});

const costomerName = ref('');
const tabelNumber = ref(0);
const items = ref([]);
const userStore = useUserStore();

function addNew() {
    const order = {
        costomer_name: costomerName.value,
        table_number: tabelNumber.value,
        items: items.value
    }
    axios
        .post("http://127.0.0.1:8000/api/order", order, {
            headers: {
                Authorization: `Bearer ${userStore.users.token}`,
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
</script>
<template>
    <div class="m-5 flex w-full">
        <main class="w-1/3 bg-neutral bg-opacity-50">
            <div class="p-5">
                <div class="bg-base-100 rounded-btn bg-opacity-80">
                    <form class="card-body" @submit.prevent="addNew()">
                        <h1 class="text-accent font-bold text-4xl">Costomer Order</h1>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Costomer Name</span>
                            </label>
                            <input v-model="menuName" type="text" placeholder="name" class="input input-bordered"
                                required />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Table Number</span>
                            </label>
                            <input v-model="tabelNumber" type="number" class="input input-bordered" step="1000"
                                required />
                        </div>
                        <label class="label">
                            <span class="label-text">Items</span>
                        </label>
                        <div class="overflow-x-auto rounded-btn">
                            <table class="table table-zebra">
                                <thead class="uppercase bg-accent  text-base-100">
                                    <tr>
                                        <th scope="col" class="px-4 py-2">
                                            <span class="sr-only">Image</span>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Menu Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="list in products"
                                        class="bg-white border-b dark:bg-gray-600 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td class="p-4">
                                            <img :src="list.image" class="w-16 md:w-32 mx-auto rounded-lg">
                                        </td>
                                        <td class="p-2 font-semibold text-gray-900 dark:text-white">
                                            <h6
                                                class="font-semibold text-base leading-7 text-black text-wrap max-w-28 lg:max-w-80 dark:text-gray-400">
                                                {{ list.title }}
                                            </h6>
                                            <h6 class="font-normal text-base leading-7 text-gray-500">
                                                {{ list.category }}
                                            </h6>
                                            <h6
                                                class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600 dark:text-gray-100">
                                                ${{ list.price }}
                                            </h6>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <button @click="subtractQuantity(list)">
                                                    <svg class="w-7 h-7 text-gray-800 dark:text-white"
                                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                                        height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="2"
                                                            d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </button>
                                                <div>
                                                    <span
                                                        class="text-gray-900 text-lg font-semibold py-0.5 px-2 rounded-lg text-center bg-transparent dark:text-gray-200">{{
                                                            list.quantity }}</span>
                                                </div>
                                                <button @click="addQuantity(list)" type="button">
                                                    <svg class="w-7 h-7 text-gray-800 dark:text-white"
                                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                                        height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                            stroke-linejoin="round" stroke-width="2"
                                                            d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                </button>
                                            </div>
                                            <button @click="removeProduct(list.id)" type="button"
                                                class="font-medium text-red-600 hover:text-indigo-500 mt-3 mx-auto">
                                                Remove
                                            </button>
                                        </td>
                                        <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            <p
                                                class="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600 dark:text-gray-100">
                                                ${{ (list.quantity * list.price).toFixed(2) }}
                                            </p>
                                        </td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="form-control mt-6">
                            <button type="submit" class="btn btn-accent text-base-100 text-xl">
                                Create New Menu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        <section>
            <div class="grid grid-cols-2 gap-6 px-5 mx-auto">
                <div v-for="(item, index) in itemList" :key="index"
                    class="card card-compact bg-base-100 w-60 shadow-xl">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">{{ item.name }}</h2>
                        <p>Rp.{{ item.price }}</p>
                        <div class="join mx-auto">
                            <button @click="editItem(item.id)"
                                class="btn btn-success join-item btn-sm bg-opacity-70 text-base-100">
                                Add Item
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
