import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCallStore = defineStore('useCallStore', () => {
  const calls = ref([])
  const callsCount = ref(0)
  const call = ref({})
  const api = useApi()

  const getAllCalls = async (params) => {
    calls.value = []
    callsCount.value = 0
    let res = await api.request({
      url: `call/all`,
      params
    })
    console.log(res.data)
    calls.value = [...res.data]
    callsCount.value = res.count
  }

  const deleteCall = async (id) => {
    await api.request({
      url: `call/${id}`,
      method: 'delete'
    })
    calls.value = calls.value.filter((call) => call._id !== id)
    callsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusCall = async (data) => {
    await api.request({
      url: `call/${data._id}/${data.status}`,
      method: 'get'
    })
    calls.value = [
      ...calls.value.map((call) => {
        return { ...call, status: call._id == data._id ? data.status : call.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveCall = async (data) => {
    let res = await api.request({
      url: `call`,
      method: 'put',
      data
    })
    calls.value = [
      ...calls.value.map((call) => {
        if (call._id == res._id) return { ...res }
        return { ...call }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getCall = async ({ id }) => {
    return await api.request({
      url: `call/${id}`
    })
  }

  return {
    calls,
    call,
    callsCount,

    getCall,
    getAllCalls,
    deleteCall,
    statusCall,
    saveCall
  }
})
