import { useApi } from '@/stores/api';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBrandStore = defineStore('useBrandStore', () => {
  const brands = ref([]);
  const brandsCount = ref(0);
  const brand = ref({});
  const api = useApi();

  const addBrand = async (data) => {
    let newBrand = await api.request({
      url: 'api/brand',
      method: 'post',
      data
    })
    brands.value = [newBrand, ...brands.value]
    brandsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllBrands = async (params) => {
    brands.value = []
    brandsCount.value = 0

    let res = await api.request({
      url: `api/brand`,
      params
    })
    brands.value = [...res.data]
    brandsCount.value = res.count
  }

  const deleteBrand = async (id) => {
    await api.request({
      url: `api/brand/${id}`,
      method: 'delete'
    })
    brands.value = brands.value.filter((brand) => brand._id !== id)
    brandsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusBrand = async (data) => {
    await api.request({
      url: `api/brand/${data._id}/${data.status}`,
      method: 'get'
    })
    brands.value = [
      ...brands.value.map((brand) => {
        return { ...brand, status: brand._id == data._id ? data.status : brand.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveBrand = async (data) => {
    let res = await api.request({
      url: `api/brand`,
      method: 'put',
      data
    })
    brands.value = [
      ...brands.value.map((brand) => {
        if (brand._id == res._id) return { ...res }
        return { ...brand }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const getBrand = async ({ id }) => {
    return await api.request({
      url: `api/brand/${id}`
    })
  }

  const getTranslateBrand = async ({ id, language }) => {
    return await api.request({
      url: `api/brand/translate/${id}/${language}`
    })
  }


  return {
    brands,
    brand,
    brandsCount,

    getTranslateBrand,
    getBrand,
    addBrand,
    getAllBrands,
    deleteBrand,
    statusBrand,
    saveBrand
  }
})
