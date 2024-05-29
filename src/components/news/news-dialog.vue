<template>
  <el-dialog
    v-model="dialogToggle"
    title="Добавить"
    width="1000"
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
      <el-row :gutter="30">
        <el-col :span="10">
          <el-form-item label="Название страниц" prop="title">
            <el-input v-model="data.title" @input="convertSlug" @blur="checkingSlug" />
          </el-form-item>
          <el-form-item label="Краткое название (для URL)">
            <el-input v-model="data.slug" @blur="checkingSlug" />
            <el-alert
              v-if="lockToggle"
              title="Такое короткое название занята"
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
          <el-form-item label="Фотография страниц">
            <el-upload
              v-model:file-list="data.img"
              class="avatar-uploader"
              list-type="picture-card"
              :action="`${url}/api/news/upload`"
              :on-preview="handlePictureCardPreview"
              :headers="{
                Authorization: `Bearer ${cookies.get('telejka-token') || ''}`
              }"
              :limit="1"
            >
              <el-icon><plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="Краткие текст" class="editor small">
            <QuillEditor
              theme="snow"
              v-model:content="data.description"
              ref="editordesc"
              contentType="html"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Подробный текст" class="editor">
        <QuillEditor
          theme="snow"
          v-model:content="data.text"
          ref="editortext"
          contentType="html"
          :modules="modules"
          toolbar="full"
        />
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
import { computed, ref, watch } from 'vue'
import ImageUploader from 'quill-image-uploader'

import 'quill-image-uploader/dist/quill.imageUploader.min.css'

const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'data', 'option'])
const dialogToggle = ref(false)
const lockToggle = ref(false)
import { useApi } from '@/stores/api'
import axios from 'axios'
const api = useApi()

const editortext = ref()
const editordesc = ref()

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

const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        axios
          .post(`${url}/api/news/upload`, formData, {
            headers: {
              Authorization: `Bearer ${cookies.get('telejka-token') || ''}`
            }
          })
          .then((res) => {
            resolve(`${url}/${res.data}`)
          })
          .catch((err) => {
            reject('Upload failed')
            console.error('Error:', err)
          })
      })
    }
  }
}

const list = ref([])
const dialogImageUrl = ref('')
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
  lockToggle.value = await api.checkSlug('news', data.value.slug)
}

const close = async () => {
  emits('close')
  dialogToggle.value = false
  editordesc.value.setHTML('')
  editortext.value.setHTML('')
  setTimeout(async () => {
    data.value = {}
    if (!form.value) return
    await form?.value?.resetFields()
  }, 100)
}

const save = async () => {
  if (!form.value) return
  await form.value.validate(async (valid, fields) => {
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
    console.log(props.data, data.value)
    if (props.type) data.value = { ...props.data }
    else data.value = {}
    dialogToggle.value = to
  }
)
</script>

<style></style>
