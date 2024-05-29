<script setup>
import { ElMessageBox } from 'element-plus'
import { url, langs } from '@/stores/env'
const emit = defineEmits(['edit', 'remove', 'status'])
const props = defineProps({
  data: Array,
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  }
})

const edit = (id) => {
  emit('edit', { id })
}

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

const indexMethod = (index) => (+props.page - 1) * props.limit + index + 1
</script>
<template>
  <el-table stripe :data="data">
    <el-table-column type="index" :index="indexMethod" />
    <el-table-column width="80">
      <template #default="scope">
        <div>
          <img
            v-if="scope.row.img?.at(0)?.response"
            :src="`${url}/${scope.row.img.at(0)?.response}`"
            alt=""
            style="width: 60px; aspect-ratio: 1/1; object-fit: cover"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column v-for="lang of langs" :key="lang.language" :label="lang.label">
      <template #default="scope">
        <el-button
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
    <el-table-column label="Краткое название" prop="slug" width="150" />

    <el-table-column label="Статус" width="90">
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
    <el-table-column width="100" align="right">
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
</template>

<style></style>
