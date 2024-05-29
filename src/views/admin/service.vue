<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import serviceDialog from '@/components/service/service-dialog.vue'
import serviceTable from '@/components/service/service-table.vue'

import { useServiceStore } from '@/stores/data/service'
import { useRoute } from 'vue-router'
import { url } from '@/stores/env'
const store = useServiceStore()
const { services, servicesCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const service = ref({})
const page = ref(1)
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    translates: [
      {
        title: value.title,
        language: value.language,
        description: value.description,
        text: value.text
      }
    ]
  }
  if (type.value) {
    await store.saveService({
      _id: value._id,
      ...data
    })
  } else {
    await store.addService({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  service.value = await store.getTranslateService({ id, language })

  let { key, ...translate } = service.value

  service.value = {
    ...key,
    resslug: key.slug.slice(),
    img: key.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    language: translate.language,
    title: translate.title,
    text: translate.text,
    description: translate.description
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteService(id)
}

const handleStatus = async (val) => {
  await store.statusService(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  service.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

onMounted(async () => {
  await store.getAllServices()
})
</script>

<template>
  <div class="head mb-2">
    <div class="df align-item-center">
      <h1>Услуги</h1>
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
  <service-table
    :data="services"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <service-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="service"
  />
</template>

<style></style>
