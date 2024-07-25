<script setup>
import useThemeStore from "./stores/theme";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const theme = useThemeStore();
console.log(theme.theme);
</script>

<template>
  <div :data-theme="theme.theme" class="h-screen">
    <Navbar />
    <div class="flex w-screen">
      <aside>
        <Sidebar />
      </aside>
      <main class="w-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
