<template>
  <div class="app">
    <aside-part />
    <div class="wrapper">
      <header-part />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import headerPart from '@/components/layout/header-part.vue'
import asidePart from '@/components/layout/aside-part.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.checkUser()
})
</script>

<style lang="scss">
@import '@/assets/styles/layout/main.scss';
</style>
