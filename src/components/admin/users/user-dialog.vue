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
      <el-form-item label="Имя" prop="name">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item label="Фамилия" prop="lastname">
        <el-input v-model="data.lastname" />
      </el-form-item>

      <el-divider />

      <el-form-item label="Логин" prop="login">
        <el-input v-model="data.login" @blur="checklogin" />
      </el-form-item>
      <el-alert title="Такой логин занят" type="error" :closable="false" v-if="uniqueLogin" />
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="data.password" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Отменить</el-button>
        <el-button type="primary" @click="save" :disabled="uniqueLogin"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const emits = defineEmits(['close', 'save', 'checklogin'])
const props = defineProps(['toggle', 'id', 'type', 'data', 'uniqueLogin'])
const dialogToggle = ref(false)

const form = ref()

const checklogin = (el) => {
  // console.log(val)
  let login = el.target.value
  login = login.trim()
  if (!login.length > 0) return false
  emits('checklogin', login)
}

const data = ref({})

const rules = computed(() => {
  return props.type ? rulesList.value : { ...rulesList.value, ...rulesPassword.value }
})

const rulesList = ref({
  name: [
    {
      required: true,
      message: 'Напишите имя менеджера',
      trigger: 'blur'
    }
  ],
  lastname: [
    {
      required: true,
      message: 'Напишите фамилии менеджера',
      trigger: 'blur'
    }
  ],
  login: [
    {
      required: true,
      message: 'Напишите логин',
      trigger: 'blur'
    }
  ]
})

const rulesPassword = ref({
  password: [
    {
      required: true,
      message: 'Напишите пароль',
      trigger: 'blur'
    }
  ]
})

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
  await form.value.validate(async (valid, fields) => {
    if (valid) {
      emits('save', { ...data.value })
      close()
    }
  })
}

watch(
  () => props.toggle,
  async (to) => {
    if (props.type) data.value = { ...props.data }
    dialogToggle.value = to
  }
)
</script>

<style></style>
