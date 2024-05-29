<template>
  <el-dialog
    v-model="dialogToggle"
    title="Добавить"
    width="500"
    center
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form
      @submit.prevent="save"
      :rules="rules"
      :model="data"
      name="form"
      ref="form"
      label-position="top"
    >
      <el-form-item label="Название категории" prop="title">
        <el-input v-model="data.title" @input="convertSlug" @blur="checkingSlug" />
      </el-form-item>
      <el-form-item label="Краткое название (для URL)">
        <el-input v-model="data.slug" @blur="checkingSlug" />
        <el-alert
          v-if="lockToggle"
          title="Такой короткая название занята"
          type="error"
          :closable="false"
        />
      </el-form-item>
      <el-form-item label="Язык" v-if="!type">
        <el-radio-group v-model="data.language" class="ml-4">
          <el-radio v-for="lang of langs" :key="lang.language" :value="lang.language" border>{{
            lang.label
          }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Фотография категории">
        <el-upload
          v-model:file-list="data.img"
          class="avatar-uploader"
          list-type="picture-card"
          :action="`${url}/api/category/upload`"
          :on-preview="handlePictureCardPreview"
          :headers="{
            Authorization: `Bearer ${cookies.get('telejka-token') || ''}`
          }"
          :limit="1"
        >
          <el-icon><plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Отменить</el-button>
        <el-button type="primary" @click="save" :disabled="lockToggle"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { url } from '@/stores/env'
import cookies from 'vue-cookies'
import { convertToSlug, langs } from '@/stores/env'
import { ref, watch } from 'vue'

const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'data', 'option'])
const dialogToggle = ref(false)
const lockToggle = ref(false)
import { useApi } from '@/stores/api'
const api = useApi()

const form = ref()
const data = ref({
  language: 'uz'
})
const rules = ref({
  title: [
    {
      required: true,
      message: 'Напишите название категории'
    }
  ]
})

// const list = ref([])
// const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = () => {
  dialogVisible.value = true
}

const handleUpload = (path) => {
  data.value.img = [...path]
}

const convertSlug = () => {
  if (props.type && props.data?.resslug == data.value.slug) return false
  data.value.slug = convertToSlug(data.value.title)
}

const checkingSlug = async () => {
  if (data.value.slug < 1) return false
  if (props.data?.resslug == data.value.slug) return false
  lockToggle.value = await api.checkSlug('category', data.value.slug)
}

const close = async () => {
  emits('close')
  dialogToggle.value = false

  data.value = {}
  setTimeout(async () => {
    if (!form.value) return
    await form?.value?.resetFields()
  }, 100)
}

const save = async () => {
  if (!form.value) return
  await form.value.validate(async (valid) => {
    if (valid) {
      // console.log(data.value)
      emits('save', { ...data.value })
      close()
    }
  })
}

watch(
  () => props.toggle,
  async (to) => {
    if (props.type) data.value = { ...props.data }
    else data.value
    dialogToggle.value = to
  }
)
</script>

<style></style>
