<script setup>
import { RouterLink, RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import SiteFooter from './components/Footer.vue';
</script>

<template>
  <NavBar />
  <RouterView />
  <SiteFooter />
</template>

