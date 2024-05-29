import { useApi } from '@/stores/api';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('useCategoryStore', () => {
  const categorys = ref([]);
  const categorysCount = ref(0);
  const category = ref({});
  const api = useApi();

  const addCategory = async (data) => {
    let newCategory = await api.request({
      url: 'api/category',
      method: 'post',
      data
    })
    categorys.value = [newCategory, ...categorys.value]
    categorysCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllCategorys = async (params) => {
    categorys.value = []
    categorysCount.value = 0

    let res = await api.request({
      url: `api/category`,
      params
    })
    categorys.value = [...res.data]
    categorysCount.value = res.count
  }

  const deleteCategory = async (id) => {
    await api.request({
      url: `api/category/${id}`,
      method: 'delete'
    })
    categorys.value = categorys.value.filter((category) => category._id !== id)
    categorysCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusCategory = async (data) => {
    await api.request({
      url: `api/category/${data._id}/${data.status}`,
      method: 'get'
    })
    categorys.value = [
      ...categorys.value.map((category) => {
        return { ...category, status: category._id == data._id ? data.status : category.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveCategory = async (data) => {
    let res = await api.request({
      url: `api/category`,
      method: 'put',
      data
    })
    categorys.value = [
      ...categorys.value.map((category) => {
        if (category._id == res._id) return { ...res }
        return { ...category }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getCategory = async ({ id }) => {
    return await api.request({
      url: `api/category/${id}`
    })
  }

  const getTranslateCategory = async ({ id, language }) => {
    return await api.request({
      url: `api/category/translate/${id}/${language}`
    })
  }


  return {
    categorys,
    category,
    categorysCount,

    getTranslateCategory,
    getCategory,
    addCategory,
    getAllCategorys,
    deleteCategory,
    statusCategory,
    saveCategory
  }
})
