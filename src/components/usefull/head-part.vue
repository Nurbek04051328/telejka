<template>
  <div class="head mb-2">
    <div class="df align-item-center">
      <el-button 
        v-if="back"
        class="mr-1"
        @click="$router.push(back)">
        <el-icon>
          <back/>
        </el-icon>
      </el-button>
      <h1>{{ title }}</h1>
    </div>
    
    <div class="df align-item-center">
      <slot v-if="search" name="search_form"/>
      <el-button type="success" v-if="excel" @click="getExcel">
        <el-icon class="mr-1"><document/></el-icon>
        Excel
      </el-button>
      <el-button 
        v-if="btn"
        type="primary"
        @click="setToggle(true)"
        class="add__btn"
      >
      <el-icon class="mr-1">
        <plus/>
      </el-icon>
      <span class="add__title">Добавить</span>
    </el-button>
  </div>
</div>
<slot v-if="!search" name="search_form"/>
</template>

<script setup>
import axios from 'axios'
import cookies from 'vue-cookies'
import { useUsefull } from '../../stores/component/usefull';

const usefullStore = useUsefull()
const {setToggle} = usefullStore
const props = defineProps({
  title: String,
  btn: {
    type:Boolean,
    default:true
  },
  back: String,
  search: {
    type: Boolean,
    default: true
  },
  excel: String,
  params: {
    type: Object,
    default: null
  }
})

// const getExcel = () => {
//   axios.get(`${api.url}/${props.excel}`,{    
//     params: props.params,
//     headers: {
//       "authorization" : `Bearer ${cookies.get('stat-token')}`
//     }
//   })
//   .then(res => {
//     axios({
//         url: `${api.url}/${res.data}`,
//         method: 'GET',
//         responseType: 'blob',
//     }).then((response) => {
//         var fileURL = window.URL.createObjectURL(new Blob([response.data]));
//         var fileLink = document.createElement('a');
//         fileLink.href = fileURL;
//         fileLink.setAttribute('download', `${res.data}`);
//         document.body.appendChild(fileLink);
    
//         fileLink.click();
//     })
//   })
// }

</script>

<style>

</style>