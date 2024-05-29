<template>
  <div>
    <div class="head mb-2">
      <div class="df align-item-center">
        <h1>Категории</h1>
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
    <category-table
      :data="categorys"
      :page="page"
      @remove="handleRemove"
      @edit="handleEdit"
      @status="handleStatus"
    />
    <div class="text-center mt-1" v-if="categorysCount > limit">
      <el-pagination
        :current-page="page"
        background
        @current-change="handleCurrentChange"
        :page-size="limit"
        :total="categorysCount"
      >
      </el-pagination>
    </div>
    <category-dialog
      @close="handleClose"
      @save="handleSave"
      :toggle="toggle"
      :type="type"
      :data="category"
    />
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import categoryDialog from '@/components/category/category-dialog.vue'
import categoryTable from '@/components/category/category-table.vue'

import { useCategoryStore } from '@/stores/data/category'
// import { useRoute } from 'vue-router'
import { url } from '@/stores/env'
import router from '@/router'
const store = useCategoryStore()
const { categorys, categorysCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const category = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
// const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    translates: [
      {
        title: value.title,
        language: value.language
      }
    ]
  }
  if (type.value) {
    await store.saveCategory({
      _id: value._id,
      ...data
    })
  } else {
    await store.addCategory({ ...data })
  }
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/category',
    query: { page: page.value }
  })
  await store.getAllCategorys({
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
  category.value = await store.getTranslateCategory({ id, language })
  let { key, ...translate } = category.value

  category.value = {
    ...key,
    resslug: key.slug.slice(),
    img: key.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    language: translate.language,
    title: translate.title
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteCategory(id)
}

const handleStatus = async (val) => {
  await store.statusCategory(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  category.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

onMounted(async () => {
  await getDate()
})
</script>



<style></style>
