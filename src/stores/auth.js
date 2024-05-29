import { defineStore } from 'pinia'
import { useApi } from '@/stores/api'
import cookies from 'vue-cookies'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const api = useApi()
  const user = ref({})
  const login = async (payload) => {
    console.log("pay",payload);
    let data = await api.request({
      url: 'auth/login',
      method: 'post',
      data: payload
    })
    console.log("data",data);
    await cookies.set('telejka-token', data.token)
    user.value = { ...data }
    await cookies.set('telejka-user', {
      login: user.login,
      name: user.name,
      lastname: user.lastname
    })
    setTimeout(() => {
      router.push({ name: `dashboard` })
    }, 200)
  }

  const checkUser = async () => {
    if (cookies.get('telejka-token')) {
      let data = await api.request({
        url: 'auth/checkuser'
      })
      user.value = { ...data }
      return true
    }
    router.push({ name: 'login' })
  }

  const exit = () => {
    cookies.remove('telejka-token')
    cookies.remove('welive-user')
    ElMessage({
      type: 'warning',
      message: 'Вы вышли с систем'
    })
    router.push({ name: 'login' })
  }

  return {
    user,
    login,
    exit,
    checkUser
  }
})
