import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceStore = defineStore('useServiceStore', () => {
  const services = ref([])
  const servicesCount = ref(0)
  const service = ref({})
  const api = useApi()

  const addService = async (data) => {
    let newService = await api.request({
      url: 'api/service',
      method: 'post',
      data
    })
    services.value = [newService, ...services.value]
    servicesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllServices = async (params) => {
    services.value = []
    servicesCount.value = 0
    let res = await api.request({
      url: `api/service`,
      params
    })
    services.value = [...res.data]
    servicesCount.value = res.count
  }

  const deleteService = async (id) => {
    await api.request({
      url: `api/service/${id}`,
      method: 'delete'
    })
    services.value = services.value.filter((service) => service._id !== id)
    servicesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusService = async (data) => {
    await api.request({
      url: `api/service/${data._id}/${data.status}`,
      method: 'get'
    })
    services.value = [
      ...services.value.map((service) => {
        return { ...service, status: service._id == data._id ? data.status : service.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveService = async (data) => {
    let res = await api.request({
      url: `api/service`,
      method: 'put',
      data
    })
    services.value = [
      ...services.value.map((service) => {
        if (service._id == res._id) return { ...res }
        return { ...service }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getService = async ({ id }) => {
    return await api.request({
      url: `api/service/${id}`
    })
  }

  const getTranslateService = async ({ id, language }) => {
    return await api.request({
      url: `api/service/translate/${id}/${language}`
    })
  }

  return {
    services,
    service,
    servicesCount,

    getTranslateService,
    getService,
    addService,
    getAllServices,
    deleteService,
    statusService,
    saveService
  }
})
