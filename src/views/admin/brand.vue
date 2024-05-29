<template>
  <div>
    <div class="head mb-2">
      <div class="df align-item-center">
        <h1>Бренди</h1>
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
    <brand-table
      :data="brands"
      :page="page"
      @remove="handleRemove"
      @edit="handleEdit"
      @status="handleStatus"
    />
    <div class="text-center mt-1" v-if="brandsCount > limit">
      <el-pagination
        :current-page="page"
        background
        @current-change="handleCurrentChange"
        :page-size="limit"
        :total="brandsCount"
      >
      </el-pagination>
    </div>
    <brand-dialog
      @close="handleClose"
      @save="handleSave"
      :toggle="toggle"
      :type="type"
      :data="brand"
    />
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import brandDialog from '@/components/brand/brand-dialog.vue'
import brandTable from '@/components/brand/brand-table.vue'

import { useBrandStore } from '@/stores/data/brand'
// import { useRoute } from 'vue-router'
import { url } from '@/stores/env'
import router from '@/router'
const store = useBrandStore()
const { brands, brandsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const brand = ref({})
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
    await store.saveBrand({
      _id: value._id,
      ...data
    })
  } else {
    await store.addBrand({ ...data })
  }
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/brand',
    query: { page: page.value }
  })
  await store.getAllBrands({
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
  brand.value = await store.getTranslateBrand({ id, language })
  let { key, ...translate } = brand.value

  brand.value = {
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
  await store.deleteBrand(id)
}

const handleStatus = async (val) => {
  await store.statusBrand(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  brand.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

onMounted(async () => {
  await getDate()
})
</script>



<style></style>
