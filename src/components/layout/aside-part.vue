<template>
  <aside>
    <router-link to="/dashboard" class="logo">
      <img src="@/assets/logo.png" alt="" />
    </router-link>
    <div class="links">
      <router-link
        to="/dashboard"
        :class="{
          link: true,
          active: route.name == 'dashboard'
        }"
      >
        <el-icon>
          <house />
        </el-icon>
        <span>Главная</span>
      </router-link>
      <div v-for="(gr, gr_index) of groups" :key="gr_index">
        <div class="title">{{ gr.title }}</div>
        <router-link
          v-for="(item, index) of menuList.filter((it) => it?.meta?.group == gr.slug)"
          :key="index"
          :index="`/${item.name}`"
          :class="{
            link: true,
            active: route.name == item.name
          }"
          :to="{ name: item.name }"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
          <span>{{ allCount[item.name] }}</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const route = useRoute()
import { useAuthStore } from '@/stores/auth'
import { adminMenu } from '@/stores/menu/admin'

import { useStatisticStore } from '@/stores/statistic/main'
const statisticStore = useStatisticStore()
const { allCount } = storeToRefs(statisticStore)

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const groups = [
  {
    slug: 'dashboard',
    title: 'Клиенты'
  },
  {
    slug: 'product',
    title: 'Товары'
  },
  {
    slug: 'content',
    title: 'Контент'
  }
]

const menuList = computed(() => {
  return [...adminMenu].filter((item) => item?.meta?.role?.includes(user?.value?.role))
})

onMounted(async () => {
  await statisticStore.getAllCount()
})
</script>

<!-- <style lang="scss">
@import '@/assets/styles/layout/aside.scss';
</style> -->
