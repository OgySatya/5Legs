<script setup>
import { ref, onMounted } from "vue";
import AddMenu from "./modal/AddMenu.vue";
import EditMenu from "./modal/EditMenu.vue";
import useMenuStore from "@/stores/menu";

const menuStore = useMenuStore();
const menuEdit = ref({});
onMounted(async () => {
  await menuStore.getData()
});
const showModal = ref(false);
function add() {
  showModal.value = !showModal.value;
}
async function removeItem(id) {
  await menuStore.removeData(id);
  location.reload();
}
const editModal = ref(false);
function edit() {
  editModal.value = !editModal.value;
}
async function editItem(id) {
  await menuStore.editData(id);
  edit();
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <AddMenu v-if="showModal" @back="() => add()" />
      </Transition>
    </Teleport>
  </div>
  <div>
    <Teleport to="body">
      <Transition>
        <EditMenu v-if="editModal" :data="menuEdit" @back="() => edit()" />
      </Transition>
    </Teleport>
  </div>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-5">
    <div v-for="(item, index) in menuStore.allMenu" :key="index" class="card card-compact bg-base-100 w-60 shadow-xl">
      <figure>
        <img :src="item.image" class="h-40" />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title">{{ item.name }}</h2>
          <h2 class="badge badge-lg badge-neutral capitalize p-3">
            {{ item.categories.name }}
          </h2>
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
      <button @click="add()" class="btn btn-secondary text-xl text-base-100 bg-opacity-90">
        Tambah Menu
      </button>
    </div>
  </div>
</template>
