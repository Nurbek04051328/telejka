import { useApi } from '@/stores/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('useProductStore', () => {
  const products = ref([])
  const productsCount = ref(0)
  const product = ref({})
  const api = useApi()

  const addProduct = async (data) => {
    let newProduct = await api.request({
      url: 'api/product',
      method: 'post',
      data
    })
    products.value = [newProduct, ...products.value]
    productsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllProducts = async (params) => {
    products.value = []
    productsCount.value = 0
    let res = await api.request({
      url: `api/product`,
      params
    })
    products.value = [...res.data]
    productsCount.value = res.count
  }

  const deleteProduct = async (id) => {
    await api.request({
      url: `api/product/${id}`,
      method: 'delete'
    })
    products.value = products.value.filter((product) => product._id !== id)
    productsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusProduct = async (data) => {
    await api.request({
      url: `api/product/${data._id}/${data.status}`,
      method: 'get'
    })
    products.value = [
      ...products.value.map((product) => {
        return { ...product, status: product._id == data._id ? data.status : product.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveProduct = async (data) => {
    let res = await api.request({
      url: `api/product`,
      method: 'put',
      data
    })
    products.value = [
      ...products.value.map((product) => {
        if (product._id == res._id) return { ...res }
        return { ...product }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getProduct = async ({ id }) => {
    return await api.request({
      url: `api/product/${id}`
    })
  }

  const getTranslateProduct = async ({ id, language }) => {
    return await api.request({
      url: `api/product/translate/${id}/${language}`
    })
  }

  return {
    products,
    product,
    productsCount,

    getTranslateProduct,
    getProduct,
    addProduct,
    getAllProducts,
    deleteProduct,
    statusProduct,
    saveProduct
  }
})
