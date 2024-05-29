<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import { project_title } from '@/stores/env'
document.title = `Dashboard | ${project_title}`
</script>

<style lang="scss">
@import '@/assets/styles/app.scss';
@import '@/assets/styles/layout/media.scss';
</style>

