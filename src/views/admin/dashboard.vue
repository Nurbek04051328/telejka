<template>
  <h1>salom</h1>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
const authStore = useAuthStore()

onMounted(async () => {
    await authStore.checkUser()
})
</script>

<style></style>
