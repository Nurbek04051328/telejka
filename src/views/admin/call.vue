<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import callTable from '@/components/admin/call/call-table.vue'

import { useCallStore } from '@/stores/data/calls'
import { useRoute } from 'vue-router'
const store = useCallStore()
const { calls, callsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const title = ref('Менеджеры')
const call = ref({})
const page = ref(1)
const route = useRoute()
const uniqueLogin = ref(false)
const handleSave = async (value) => {
  await store[type.value ? 'saveCall' : 'addCall']({ ...value })
}

const handleCheckingLogin = async (value) => {
  uniqueLogin.value = await store.checkLogin(value)
}

const handleEdit = async (id) => {
  call.value = await store.getCall(id)
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteCall({ id })
}

const handleStatus = async (val) => {
  await store.statusCall(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  call.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

onMounted(async () => {
  await store.getAllCalls()
})
</script>

<template>
  <div class="head mb-2">
    <div class="df align-item-center">
      <h1>Звонки</h1>
    </div>

    <div class="df align-item-center" v-if="false">
      <el-button type="primary" @click="handleOpen" class="add__btn">
        <el-icon>
          <plus />
        </el-icon>
        <span class="add__title">Добавить</span>
      </el-button>
    </div>
  </div>
  <call-table
    :data="calls"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
</template>

<style></style>
