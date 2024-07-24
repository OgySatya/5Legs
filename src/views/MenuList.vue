<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import useUserStore from "@/stores/user.js";
import addMenu from "./modal/AddMenu.vue";
import editMenu from "./modal/EditMenu.vue";

const userStore = useUserStore();
const itemList = ref([]);
const menuEdit = ref({});
onMounted(() => {
  axios
    .get("http://127.0.0.1:8000/api/item", {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      itemList.value = response.data;
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
});
const showModal = ref(false);
function add() {
  showModal.value = !showModal.value;
}
function removeItem(id) {
  axios
    .delete(`http://127.0.0.1:8000/api/item/${id}`, {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}
const editModal = ref(false);
function edit() {
  editModal.value = !editModal.value;
}
function editItem(id) {
  axios
    .get(`http://127.0.0.1:8000/api/item/${id}/edit`, {
      headers: {
        Authorization: `Bearer ${userStore.users.token}`,
      },
    })
    .then(function (response) {
      menuEdit.value = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  edit();
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <addMenu v-if="showModal" @back="() => add()" />
      </Transition>
    </Teleport>
  </div>
  <div>
    <Teleport to="body">
      <Transition>
        <editMenu v-if="editModal" :data="menuEdit" @back="() => edit()" />
      </Transition>
    </Teleport>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
    <div v-for="(item, index) in itemList" :key="index" class="card card-compact bg-base-100 w-60 shadow-xl">
      <figure>
        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title">{{ item.name }}</h2>
          <h2 class="badge badge-lg badge-neutral capitalize p-3">{{ item.categories.name }}</h2>
        </div>

        <p>Rp.{{ item.price }}</p>
        <div class="join mx-auto">
          <button @click="editItem(item.id)" class="btn btn-success join-item btn-sm bg-opacity-70 text-base-100">
            Edit Menu
          </button>
          <button @click="removeItem(item.id)" class="btn btn-error join-item btn-sm bg-opacity-70 text-base-100">
            Delete Menu
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="relative">
    <div class="fixed bottom-0 right-0 p-10">
      <button @click="add()" class="btn btn-secondary text-xl text-base-100 bg-opacity-70">
        Tambah Menu
      </button>
    </div>
  </div>
</template>
