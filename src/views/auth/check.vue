<template>
  
</template>

<script setup>
import {useAuthStore} from '@/stores/auth'
import { onMounted } from 'vue'
const authStore = useAuthStore()

onMounted(async ()=>{
  await authStore.checkUser('check')
})

</script>

<style>

</style>