import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const users = ref([])
  const usersCount = ref(0)
  const user = ref({})
  const api = useApi()

  const addUser = async (data) => {
    let newUser = await api.request({
      url: 'user',
      method: 'post',
      data
    })
    users.value = [newUser, ...users.value]
    usersCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllUsers = async (params) => {
    users.value = []
    usersCount.value = 0
    let res = await api.request({
      url: `user`,
      params
    })

    users.value = [...res.data]
    usersCount.value = res.count
  }

  const deleteUser = async (params) => {
    await api.request({
      url: `user`,
      method: 'delete',
      params
    })
    users.value = users.value.filter((user) => user._id !== params.id)
    usersCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusUser = async (data) => {
    await api.request({
      url: `user/status/${data._id}/${data.status}`,
      method: 'get'
    })
    users.value = [
      ...users.value.map((user) => {
        return { ...user, status: user._id == data._id ? data.status : user.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveUser = async (data) => {
    await api.request({
      url: `user`,
      method: 'put',
      data
    })
    users.value = [
      ...users.value.map((user) => {
        if (user._id == data._id) return { ...data }
        return { ...user }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getUser = async (id) => {
    return await api.request({
      url: `user/${id}`
    })
  }

  const checkLogin = async (login) => {
    return await api.request({
      url: `auth/checklogin/${login}`
    })
  }

  return {
    users,
    user,
    usersCount,
    checkLogin,
    saveUser,
    getUser,
    addUser,
    statusUser,
    getAllUsers,
    deleteUser
  }
})
