<template>
    <el-table :data="keywords">
        <el-table-column type="index" :index="indexFunc" width="60" />
        <el-table-column label="Ключевое слово" prop="word" min-width="300"/>
        <el-table-column label="Кол-во использованных" prop="count" min-width="150"/>
        <el-table-column width="60" align="right">
            <template #default="scope">
                <div>
                    <el-button 
                        @click="change_status(scope.row._id)"
                        :type="scope.row.status == 0 ? 'danger' : 'success'">
                        <el-icon>
                            <close v-if="scope.row.status == 0"/>
                            <check v-else/>
                        </el-icon>
                    </el-button>
                </div>
            </template>
        </el-table-column>
        
        <el-table-column width="80" align="right">
            <template #default="scope">
                <el-dropdown>
                    <el-button>
                        <el-icon class="el-icon--right">
                            <more />
                        </el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="editUser(scope.row._id)">
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                                Изменить
                            </el-dropdown-item>
                            
                            <el-dropdown-item @click="remove(scope.row._id)">
                                <el-icon>
                                    <delete/>
                                </el-icon>
                                Удалить
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        v-if="keywordsCount > pageSize"
        background    
        :default-current-page="+page"
        :current-page="+page"    
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="keywordsCount">
    </el-pagination>
</template>

<script setup>
const props = defineProps([
    'search'
])
const emit = defineEmits(['edit'])
import { storeToRefs } from 'pinia';
import { keywordsStore } from '@/stores/data/keywords';
import router from '@/router'
import {ref} from 'vue'
import { useUsefull } from '@/stores/component/usefull';


const page = ref(1)
const pageSize = ref(20)

const store = keywordsStore()
const {keywords,keywordsCount} = storeToRefs(store)

const {get_all_keywords,delete_keyword,status_keyword} = store

const indexFunc = (index) => (page.value-1)*pageSize.value + index + 1

const handleCurrentChange = async (val) => {
    window.scrollTo(0, 0)
    router.push({ path: '/keyword', query: { page: val } })
    await get_all_keywords({ page: val, ...props.search })
    page.value = val;
}

const remove = (_id) => {
    if (confirm('Вы уверены?')){
        delete_keyword(_id)
    }
}


const usefullStore = useUsefull()

const editUser = (_id) => {
    emit('edit',_id)
    usefullStore.setEditToggle(true)
}

const change_status = (_id) => {
    status_keyword(_id)
}

</script>
<style lang="">
    
</style>