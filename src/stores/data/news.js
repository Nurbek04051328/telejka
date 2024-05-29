import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsStore = defineStore('useNewsStore', () => {
  const newss = ref([])
  const newssCount = ref(0)
  const news = ref({})
  const api = useApi()

  const addNews = async (data) => {
    let newNews = await api.request({
      url: 'api/news',
      method: 'post',
      data
    })
    newss.value = [newNews, ...newss.value]
    newssCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllNewss = async (params) => {
    newss.value = []
    newssCount.value = 0
    let res = await api.request({
      url: `api/news`,
      params
    })
    newss.value = [...res.data]
    newssCount.value = res.count
  }

  const deleteNews = async (id) => {
    await api.request({
      url: `api/news/${id}`,
      method: 'delete'
    })
    newss.value = newss.value.filter((news) => news._id !== id)
    newssCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusNews = async (data) => {
    await api.request({
      url: `api/news/${data._id}/${data.status}`,
      method: 'get'
    })
    newss.value = [
      ...newss.value.map((news) => {
        return { ...news, status: news._id == data._id ? data.status : news.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveNews = async (data) => {
    let res = await api.request({
      url: `api/news`,
      method: 'put',
      data
    })
    newss.value = [
      ...newss.value.map((news) => {
        if (news._id == res._id) return { ...res }
        return { ...news }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getNews = async ({ id }) => {
    return await api.request({
      url: `api/news/${id}`
    })
  }

  const getTranslateNews = async ({ id, language }) => {
    return await api.request({
      url: `api/news/translate/${id}/${language}`
    })
  }

  return {
    newss,
    news,
    newssCount,

    getTranslateNews,
    getNews,
    addNews,
    getAllNewss,
    deleteNews,
    statusNews,
    saveNews
  }
})
