<script setup>
import { ref, onMounted } from "vue";
import UserDetail from "../views/modal/UserDetail.vue";
import useUsersStore from "@/stores/user.js";
import UserProfile from "./modal/UserProfile.vue";

const userStore = useUsersStore();
const data = ref();
const url = "https://avatar.iran.liara.run/public/"
onMounted(async () => {
  await userStore.allData()
  data.value = userStore.allUsers;
});
const showModal = ref(false);
async function show(id) {
  await userStore.showData(id)
  showModal.value = !showModal.value;
}
async function deleteUser(id) {
  await userStore.removeUser(id)
  location.reload()
}
const toggle = ref(false)
async function userProfile(id) {
  await userStore.showData(id)
  toggle.value = !toggle.value
}
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition>
        <UserDetail v-if="showModal" @back="() => showModal = false" />
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition>
        <UserProfile v-if="toggle" @back="() => toggle = false"
          @edit="() => [toggle = false, show(userStore.showUser.id)]" />
      </Transition>
    </Teleport>
  </div>
  <div class="w-3/4 m-4">
    <table class="table-zebra table">
      <thead>
        <tr class="text-xl bg-neutral text-neutral-content text-left">
          <th>ID</th>
          <th>Name</th>
          <th>E-Mail</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody class=" capitalize">
        <tr v-for="(user, index) in data">
          <td>{{ user.id }}</td>
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="url + (index + 1)" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ user.name }}</div>
              </div>
            </div>
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>{{ user.roles.name }}</td>
          <td class="w-56">
            <ul class="menu menu-horizontal p-0 rounded-box">
              <li>
                <button @click="userProfile(user.id)" class="tooltip bg-info rounded-r-none" data-tip="Detail User">
                  <svg class="w-6 h-6 text-base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
                  </svg>

                </button>
              </li>
              <li>
                <button @click="show(user.id)" class="tooltip bg-success rounded-none" data-tip="Edit User">
                  <svg class="w-6 h-6 text-base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                      d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                </button>
              </li>
              <li>
                <button @click="deleteUser(user.id)" class="tooltip bg-error rounded-l-none" data-tip="Remove User">
                  <svg class="w-6 h-6 text-base-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>

                </button>
              </li>
            </ul>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>
