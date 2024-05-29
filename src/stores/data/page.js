import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('usePageStore', () => {
  const pages = ref([])
  const pagesCount = ref(0)
  const page = ref({})
  const api = useApi()

  const addPage = async (data) => {
    let newPage = await api.request({
      url: 'api/page',
      method: 'post',
      data
    })
    pages.value = [newPage, ...pages.value]
    pagesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllPages = async (params) => {
    pages.value = []
    pagesCount.value = 0
    let res = await api.request({
      url: `api/page`,
      params
    })
    pages.value = [...res.data]
    pagesCount.value = res.count
  }

  const deletePage = async (id) => {
    await api.request({
      url: `api/page/${id}`,
      method: 'delete'
    })
    pages.value = pages.value.filter((page) => page._id !== id)
    pagesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusPage = async (data) => {
    await api.request({
      url: `api/page/${data._id}/${data.status}`,
      method: 'get'
    })
    pages.value = [
      ...pages.value.map((page) => {
        return { ...page, status: page._id == data._id ? data.status : page.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const savePage = async (data) => {
    let res = await api.request({
      url: `api/page`,
      method: 'put',
      data
    })
    pages.value = [
      ...pages.value.map((page) => {
        if (page._id == res._id) return { ...res }
        return { ...page }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getPage = async ({ id }) => {
    return await api.request({
      url: `api/page/${id}`
    })
  }

  const getTranslatePage = async ({ id, language }) => {
    return await api.request({
      url: `api/page/translate/${id}/${language}`
    })
  }

  return {
    pages,
    page,
    pagesCount,

    getTranslatePage,
    getPage,
    addPage,
    getAllPages,
    deletePage,
    statusPage,
    savePage
  }
})
