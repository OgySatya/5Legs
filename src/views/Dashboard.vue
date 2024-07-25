<script setup>
import Sidebar from "../components/Sidebar.vue";
</script>
<template>

  <div class="w-full flex">
    <aside>
      <Sidebar />
    </aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>
