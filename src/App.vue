<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template class="theme-controller">
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
