<template>
  <header class="header">
    <div></div>
    <div class="profile">
      <div class="name">{{ user?.name }}</div>
      <button @click="logout">
        <el-icon>
          <switch-button />
        </el-icon>
      </button>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)



const logout = () => {
  if (confirm('Вы уверены?')) {
    authStore.exit()
  }
}
</script>

<!-- <style lang="scss">
@import '@/assets/styles/layout/header.scss';
@import '@/assets/styles/layout/navbar.scss';
</style> -->
