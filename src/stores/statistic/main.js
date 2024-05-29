import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '../api'

export const useStatisticStore = defineStore('useStatistic', () => {
  const allCount = ref({})
  const api = useApi()
  const getAllCount = async () => {
    let res = await api.request({
      url: 'statistic/allcount'
    })

    allCount.value = { ...res }
  }

  return {
    getAllCount,
    allCount
  }
})
