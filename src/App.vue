<script setup>
import useThemeStore from "./stores/theme";
import Navbar from "./components/Navbar.vue";

const theme = useThemeStore();
console.log(theme.theme);
</script>

<template>
  <div :data-theme="theme.theme" class="h-screen">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
