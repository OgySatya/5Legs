<script setup>
import { ref } from "vue";
import { service } from "@/utils/service";
import useMenuStore from "@/stores/menu";

const menuStore = useMenuStore();
const menuName = ref(menuStore.editMenu.name);
const price = ref(menuStore.editMenu.price);
const file = ref();
const emit = defineEmits(["back"]);
function onFileChange(event) {
  const files = event.target.files;
  if (files.length > 0) {
    file.value = files[0];
  } else {
    file.value = null;
  }
}
async function editItem() {
  const formData = new FormData();
  formData.append("name", menuName.value);
  formData.append("price", price.value);
  formData.append("image_file", file.value);
  formData.append("_method", "put");
  await service().post(`/item/${menuStore.editMenu.id}`, formData);
  location.reload()
}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class=" w-2/5 mx-auto mt-40 bg-neutral rounded-2xl bg-opacity-50">


      <div class="p-5">

        <div class="bg-base-100 rounded-btn bg-opacity-80 mx-auto">
          <div class="flex justify-end p-2">
            <button @click.prevent="$emit('back')" class="bg-base-100 rounded-btn bg-opacity-80 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h1 class="flex justify-center text-accent font-bold text-4xl">Edit Menu</h1>
          <form class="card-body" @submit.prevent="editItem()">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Menu Name</span>
              </label>
              <input v-model="menuName" type="text" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Price</span>
              </label>
              <input v-model="price" type="number" class="input input-bordered" step="1000" required />
            </div>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Pick a file</span>
              </div>
              <input @change="onFileChange" type="file" class="file-input file-input-bordered w-full" />
            </label>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-accent text-base-100 text-xl">
                Update Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
