import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAttributeStore = defineStore('useAttributeStore', () => {
  const attributes = ref([])
  const attributesCount = ref(0)
  const attribute = ref({})
  const api = useApi()

  const addAttribute = async (data) => {
    let newAttribute = await api.request({
      url: 'api/attribute',
      method: 'post',
      data
    })
    attributes.value = [newAttribute, ...attributes.value]
    attributesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllAttributes = async (params) => {
    attributes.value = []
    attributesCount.value = 0
    let res = await api.request({
      url: `api/attribute`,
      params
    })
    attributes.value = [...res.data]
    attributesCount.value = res.count
  }

  const deleteAttribute = async (id) => {
    await api.request({
      url: `api/attribute/${id}`,
      method: 'delete'
    })
    attributes.value = attributes.value.filter((attribute) => attribute._id !== id)
    attributesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusAttribute = async (data) => {
    await api.request({
      url: `api/attribute/${data._id}/${data.status}`,
      method: 'get'
    })
    attributes.value = [
      ...attributes.value.map((attribute) => {
        return { ...attribute, status: attribute._id == data._id ? data.status : attribute.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveAttribute = async (data) => {
    let res = await api.request({
      url: `api/attribute`,
      method: 'put',
      data
    })
    attributes.value = [
      ...attributes.value.map((attribute) => {
        if (attribute._id == res._id) return { ...res }
        return { ...attribute }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getAttribute = async ({ id }) => {
    return await api.request({
      url: `api/attribute/${id}`
    })
  }

  const getTranslateAttribute = async ({ id, language }) => {
    return await api.request({
      url: `api/attribute/translate/${id}/${language}`
    })
  }

  return {
    attributes,
    attribute,
    attributesCount,

    getTranslateAttribute,
    getAttribute,
    addAttribute,
    getAllAttributes,
    deleteAttribute,
    statusAttribute,
    saveAttribute
  }
})
