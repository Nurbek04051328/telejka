import { defineStore } from 'pinia'
import { url } from '@/stores/env'
import router from '@/router'
import cookies from 'vue-cookies'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useApi = defineStore('useApi', () => {
  const request = async (payload) => {
    const result = await axios({
      method: payload.method || 'get',
      url: `${url}/${payload.url}`,
      data: payload.data || null,
      params: payload.params || {},
      timeout: 2000,
      headers: {
        Authorization: `Bearer ${cookies.get('telejka-token') || ''}`
      }
    }).catch((error) => {
      console.log(error)
      ElMessage({
        type: 'error',
        message: error.response.data
      })
      if (error.response.status == 401) {
        router.push({ name: 'login' })
        cookies.remove('telejka-token')
        cookies.remove('telejka-user')
      }
    })
    // console.log(result)
    return result.data
  }

  const checkSlug = async (model, slug) => {
    return request({
      url: `api/${model}/${slug}`
    })
  }

  return {
    request,
    checkSlug
  }
})
