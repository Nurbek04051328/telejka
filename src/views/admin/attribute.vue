<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import attributeDialog from '@/components/attribute/attribute-dialog.vue'
import attributeTable from '@/components/attribute/attribute-table.vue'

import { useAttributeStore } from '@/stores/data/attribute'
import { useRoute } from 'vue-router'
import { url } from '@/stores/env'
const store = useAttributeStore()
const { attributes, attributesCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const attribute = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    category: value.category.slice(),
    translates: [
      {
        title: value.title,
        language: value.language
      }
    ]
  }
  if (type.value) {
    await store.saveAttribute({
      _id: value._id,
      ...data
    })
  } else {
    await store.addAttribute({ ...data })
  }
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/attribute',
    query: { page: page.value }
  })
  await store.getAllAttributes({
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
  attribute.value = await store.getTranslateAttribute({ id, language })
  let { key, ...translate } = attribute.value

  attribute.value = {
    ...key,
    resslug: key.slug.slice(),
    img: key.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    category: key.category.slice(),
    language: translate.language,
    title: translate.title
  }

  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteAttribute(id)
}

const handleStatus = async (val) => {
  await store.statusAttribute(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  attribute.value = {}
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
      <h1>Атрибуты</h1>
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
  <attribute-table
    :data="attributes"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="attributesCount > limit">
    <el-pagination
      :current-page="page"
      background
      @current-change="handleCurrentChange"
      :page-size="limit"
      :total="attributesCount"
    >
    </el-pagination>
  </div>
  <attribute-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="attribute"
    :option="{
      categorys
    }"
  />
</template>

<style></style>
