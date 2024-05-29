<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import productDialog from '@/components/product/product-dialog.vue'
import productTable from '@/components/product/product-table.vue'

import { useProductStore } from '@/stores/data/product'
import { useRoute } from 'vue-router'
import { url } from '@/stores/env'
const store = useProductStore()
const { products, productsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const product = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    category: value.category.slice(),
    price: value.price,
    code: value.code,
    ball: value.ball,
    attributes: [
      ...value.attributes.map((attr) => {
        return {
          ...attr,
          language: value.language
        }
      }),
      ...(value.resAttributes || [])
    ],
    translates: [
      {
        title: value.title,
        language: value.language,
        description: value.description
      }
    ]
  }
  if (type.value) {
    await store.saveProduct({
      _id: value._id,
      ...data
    })
  } else {
    await store.addProduct({ ...data })
  }
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/product',
    query: { page: page.value }
  })
  await store.getAllProducts({
    page: page.value,
    limit: limit.value,
    search: search.value || {}
  })
}

const handleCurrentChange = async (val) => {
  page.value = val
  await getDate()
}

const handleEdit = async ({ id, language = null }) => {
  product.value = await store.getTranslateProduct({ id, language })

  let { key, ...translate } = product.value

  product.value = {
    ...key,
    resslug: key.slug.slice(),
    img: key.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    price: key.price,
    code: key.code,
    ball: key.ball,
    attributes: [...key.attributes.filter((attr) => attr.language == translate.language)],
    resAttributes: [...key.attributes.filter((attr) => attr.language !== translate.language)],
    category: key.category.slice(),
    language: translate.language,
    title: translate.title,
    description: translate.description
  }

  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteProduct(id)
}

const handleStatus = async (val) => {
  await store.statusProduct(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  product.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

import { useCategoryStore } from '@/stores/data/category'
import router from '@/router'
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore)

onMounted(async () => {
  await categoryStore.getAllCategorys({
    limit: 0,
    select: ['_id', 'title']
  })
  await getDate()
})
</script>

<template>
  <div class="head mb-2">
    <div class="df align-item-center">
      <h1>Товары</h1>
    </div>

    <div class="df align-item-center">
      <el-button type="primary" @click="handleOpen" class="add__btn">
        <el-icon>
          <plus />
        </el-icon>
        <span class="add__title">Добавить</span>
      </el-button>
    </div>
  </div>
  <product-table
    :data="products"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="productsCount > limit">
    <el-pagination
      :current-page="page"
      background
      @current-change="handleCurrentChange"
      :page-size="limit"
      :total="productsCount"
    >
    </el-pagination>
  </div>
  <product-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="product"
    :option="{
      categorys
    }"
  />
</template>

<style></style>
