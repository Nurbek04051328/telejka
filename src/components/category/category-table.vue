<template>
  <el-table stripe :data="data" class="main-table">
    <el-table-column type="index" label="№" :index="indexMethod" max-width="40" min-width="20"/>
    <el-table-column label="img"  max-width="80" min-width="70">
      <template #default="scope">
        <div>
          <img
          class="table-img"
            v-if="scope.row.img?.at(0)?.response"
            :src="`${url}/${scope.row.img.at(0)?.response}`"
            alt=""
            style="aspect-ratio: 1/1; object-fit: cover"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column v-for="lang of langs" :key="lang.language" :label="lang.label" max-width="180" min-width="160">
      <template #default="scope">
        <el-button
          class="table-button"
          @click="getTranslate(scope.row._id, lang.language)"
          :type="
            scope.row.translates.some((tr) => tr.language == lang.language) ? 'primary' : 'warning'
          "
        >
          {{
            scope.row.translates.find((tr) => tr.language == lang.language)?.title || 'Не добавлено'
          }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="Краткое название" prop="slug" max-width="180" min-width="150" />

    <el-table-column label="Статус" max-width="90" min-width="60">
      <template #default="scope">
        <div>
          <el-button
            :icon="scope.row.status == 0 ? 'check' : 'close'"
            :type="scope.row.status == 0 ? 'success' : 'warning'"
            @click="
              changeStatus({
                _id: scope.row._id,
                status: scope.row.status == 1 ? 0 : 1
              })
            "
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column max-width="90" min-width="65" align="right">
      <template #default="scope">
        <el-dropdown>
          <el-button class="el-dropdown-link">
            <el-icon>
              <more />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon class="mr-1">
                  <delete />
                </el-icon>
                Удалить
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>

  <el-row :gutter="24" v-for="item in data" :key="item._id">
    <el-col :span="10">
      <img :src="`${url}/${item.img.at(0)?.response}`" class="table-img" alt="">
      <div>
        <div class="table-slug">{{ item?.slug }}</div>
        <div class="table-slug">{{ item?.slug }}</div>
        <div class="table-slug">{{ item?.slug }}</div>
      </div>
    </el-col> 
  </el-row>
</template>





<script setup>


import { ElMessageBox } from 'element-plus';
import { url, langs } from '@/stores/env';

const emit = defineEmits(['edit', 'remove', 'status']);
const props = defineProps({
  data: Array,
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 2
  }
})

// const edit = (id) => {
//   emit('edit', { id })
// }

const changeStatus = (val) => {
  emit('status', val)
}

const getTranslate = (id, language) => {
  emit('edit', { id, language })
}

const remove = (id) => {
  ElMessageBox.confirm('Вы хотите удалить', 'Инцормация', {
    confirmButtonText: 'Да',
    cancelButtonText: 'Отменить',
    type: 'warning'
  })
    .then(() => {
      emit('remove', id)
    })
    .catch(() => {})
}

const indexMethod = (index) => (+props.page - 1) * props.limit + index + 1;



</script>





<style></style>
