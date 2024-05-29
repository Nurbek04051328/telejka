<template>
    <el-dialog
      v-model="usefullStore.toggle"
      title="Ответ"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="data"
        name="form"
        ref="form"
        label-position="top"
        @submit.prevent
      >
        
        <el-form-item label="Напишите ответ на сообщение" >
          <el-input v-model="data.text" @keypress.enter="data.text?.length > 0 ? add(form) : false"/>
        </el-form-item>
        
      </el-form>
  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Отменить</el-button>
          <el-button
            type="primary"
            :disabled="data.text?.length == 0"
            @click="add(form)"
          >
            Сохранить
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { ElMessage } from 'element-plus'
  import { useUsefull } from '@/stores/component/usefull'
  import { messagesStore } from '@/stores/data/messages'
  const props = defineProps(['id'])
  const form = ref()
  const usefullStore = useUsefull()
  const store = messagesStore()
  const data = ref({})
  const handleClose = () => {
    data.value = {}
    usefullStore.setToggle(false)     
  }
  
  const add = async (formEl) => {
    store.sendReplyMessage({...data.value,_id:props.id})
    
    handleClose()
  }
  
  const { editToggle } = storeToRefs(usefullStore)
  
  </script>
  
  <style></style>
  