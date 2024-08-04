<script setup>
import useThemeStore from "./stores/theme";
import useUserStore from "./stores/user.js";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const theme = useThemeStore();
const userStore = useUserStore();

</script>

<template>
  <div :data-theme="theme.theme" class="h-full">
    <Navbar />
    <div class="flex w-screen">
      <aside v-if="userStore.users.role == 1">
        <Sidebar />
      </aside>
      <main class="w-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
