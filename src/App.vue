<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useScriptsStore } from "./stores/scripts-store";

const scriptsStore = useScriptsStore();

onMounted(() => {
  scriptsStore.loadScripts();
  // scriptsStore.saveScripts();
});
</script>
