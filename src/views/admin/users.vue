<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import userDialog from '@/components/admin/users/user-dialog.vue'
import userTable from '@/components/admin/users/user-table.vue'

import { useUserStore } from '@/stores/data/users'
import { useRoute } from 'vue-router'
const store = useUserStore()
const { users, usersCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const title = ref('Менеджеры')
const user = ref({})
const page = ref(1)
const route = useRoute()
const uniqueLogin = ref(false)
const handleSave = async (value) => {
  await store[type.value ? 'saveUser' : 'addUser']({ ...value })
}

const handleCheckingLogin = async (value) => {
  uniqueLogin.value = await store.checkLogin(value)
}

const handleEdit = async (id) => {
  user.value = await store.getUser(id)
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteUser({ id })
}

const handleStatus = async (val) => {
  await store.statusUser(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  user.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

onMounted(async () => {
  await store.getAllUsers()
})
</script>

<template>
  <div class="head mb-2">
    <div class="df align-item-center">
      <h1>Менеджеры</h1>
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
  <user-table
    :data="users"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <user-dialog
    @close="handleClose"
    @save="handleSave"
    @checklogin="handleCheckingLogin"
    :toggle="toggle"
    :type="type"
    :data="user"
    :uniqueLogin="uniqueLogin"
  />
</template>

<style></style>
