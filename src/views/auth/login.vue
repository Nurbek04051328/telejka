<template>
  <div class="auth">
    <div class="auth__box">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />        
      </div>
      <el-form @submit.prevent="send" label-position="top">
        <el-form-item>
          <el-input v-model="login" placeholder="Логин" size="large" clearable prefix-icon="User" />
        </el-form-item>

        <el-form-item>
          <el-input
            type="password"
            show-password
            placeholder="Пароль"
            size="large"
            prefix-icon="Lock"
            v-model="password"
            @keypress.enter="send"
          />
        </el-form-item>
        <el-button type="success" @click="send" size="large">Войти</el-button>
      </el-form>
    </div>
    <div></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const auth = useAuthStore()
const login = ref('')
const password = ref('')

const send = () => {
  if (login.value && password.value) {
    auth.login({
      login: login.value,
      password: password.value
    })
  } else {
    ElMessage({
      type: 'warning',
      message: 'Запольните полей'
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layout/auth.scss';
</style>
