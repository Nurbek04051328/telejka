<template>
    <el-dialog
      v-model="usefullStore.toggle"
      :title="`Yangi ${title.toLowerCase()}`"
      width="500px"
      :before-close="handleClose"
    >
      <el-form
        :model="keyword"
        :rules="rulesList"
        name="form"
        ref="form"
        label-position="top"
        @submit.prevent
      >
        
        <el-form-item :label="`Ключевое слова ${editToggle? '' : '(нажмите ENTER)'}`" >
          <el-input v-model="keyword.word" @keypress.enter="pushToList"/>
        </el-form-item>
        
        <div class="border-bottom df align-item-center justify-content-between" v-for="item,index of list" :key="index">
          <span>{{item}}</span>
          <el-button @click="removeWord(index)"><el-icon><close/></el-icon></el-button>
        </div>
        

      </el-form>
  
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Отменить</el-button>
          <el-button
            type="primary"
            :disabled="check"
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
  import { keywordsStore } from '@/stores/data/keywords'
  const props = defineProps(['title', 'id'])
  const check = ref(false)
  const form = ref()
  const rules = ref({
    word: [{ required: true, message: 'Заполните поля!', trigger: 'blur' }],    
  })
  const keyword = ref({})
  const list = ref([])
  const usefullStore = useUsefull()
  const store = keywordsStore()
  
  const handleClose = () => {
    keyword.value = {}
    usefullStore.setToggle(false)
    usefullStore.setEditToggle(false)    
  }

  const removeWord = index => {
    let start = list.value.slice(0,index)
    let end = list.value.slice(index+1)
    list.value = [...start,...end]
  }

  const pushToList = () => {
    if (keyword?.value.word?.length > 0 && !editToggle.value){
      list.value = [keyword.value.word,...list.value]
      keyword.value.word = ''
    }
  }
  
  const add = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        if (editToggle.value) {
          store.update_keyword(keyword.value)
        } else {          
          store.add_new_keyword({words:list.value})
        }
        handleClose()
      } else {
        ElMessage.warning('Заполните полей!!')
          console.clear()
      }
    })
  }
  
  const { editToggle } = storeToRefs(usefullStore)
  watch(editToggle, async () => {
    if (editToggle.value){
      // console.log(props.id);
      let res = await store.get_keyword(props.id)     
        keyword.value = { ...res.data }
        usefullStore.setToggle(true)
      
    }
  })
  
  const rulesList = computed(() => {
    let r = {...rules.value}
    if (editToggle.value){
      delete r.password
    }
    return {...r}
  })
  
  </script>
  
  <style></style>
  