<template>
  <side_bar></side_bar>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import side_bar from './components/side_bar.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped>

</style>