<script setup>
import { ref } from "vue";
import { service } from "@/utils/service";

const menuName = ref();
const price = ref(0);
const category = ref(-1);
const file = ref();
const props = defineProps({});
const emit = defineEmits(["back"]);

function onFileChange(event) {
  const files = event.target.files;
  if (files.length > 0) {
    file.value = files[0];
  } else {
    file.value = null;
  }
  console.log(file.value);
}
async function addNew() {
  const formData = new FormData();
  formData.append("name", menuName.value);
  formData.append("price", price.value);
  formData.append("category_id", category.value);
  formData.append("image_file", file.value);
  await service().post("/item", formData);

}
</script>
<template>
  <div class="inset-0 fixed left-0 top-0 bg-base-300 bg-opacity-70">
    <div class="w-1/2 mx-auto mt-40 bg-neutral rounded-2xl bg-opacity-50">
      <div class="flex justify-end pt-3 pr-3 pb-2">
        <button @click.prevent="$emit('back')" class="bg-base-100 rounded-btn bg-opacity-80 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="px-10 pb-10">
        <div class="bg-base-100 px-5 rounded-btn bg-opacity-80 mx-auto">
          <form class="card-body" @submit.prevent="addNew()">
            <h1 class="text-accent font-bold text-4xl">New Menu</h1>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Menu Name</span>
              </label>
              <input v-model="menuName" type="text" placeholder="name" class="input input-bordered" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Price</span>
              </label>
              <input v-model="price" type="number" class="input input-bordered" step="1000" required />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Category Makanan</span>
              </label>
              <select class="select select-bordered w-full" v-model="category">
                <option disabled selected>Category</option>
                <option :value="1">Makanan</option>
                <option :value="2">Minuman</option>
                <option :value="3">Dessert</option>
              </select>
            </div>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Pick a file</span>
              </div>
              <input @change="onFileChange" type="file" class="file-input file-input-bordered w-full" />
            </label>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-accent text-base-100 text-xl">
                Create New Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
