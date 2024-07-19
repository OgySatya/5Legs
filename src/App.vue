<script setup>
import useThemeStore from "./stores/theme";
import Navbar from "./components/Navbar.vue";

const theme = useThemeStore();
console.log(theme.theme);
</script>

<template data-theme="retro">
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
