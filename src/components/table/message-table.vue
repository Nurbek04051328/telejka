<template>
    <el-table :data="messages">
        <el-table-column type="index" :index="indexFunc" width="60" />
        <el-table-column label="Тескт сообщение" prop="word" width="600">
            <template #default="scope">
                <div>
                    <a :href="scope.row.message" target="_blank">
                        {{scope.row.text}}
                    </a>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Группа" min-width="200">
            <template #default="scope">
                <div>
                    <a :href="scope.row.group?.link" target="_blank">
                        {{scope.row.group?.name}}
                    </a>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Пользователь" prop="group.username" min-width="200">
            <template #default="scope">
                <div>{{scope.row.username}}</div>
                <div>{{scope.row.chatId}}</div>
            </template>
        </el-table-column>
        <el-table-column label="Дата" prop="createdAt" min-width="200"/>
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
                            <el-dropdown-item @click="replyMessage(scope.row._id)">
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                                Ответить
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>

    <reply-message-dialog :id="id"/>

    <el-pagination
        v-if="messagesCount > pageSize"
        background    
        :default-current-page="+page"
        :current-page="+page"    
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="messagesCount">
    </el-pagination>
</template>

<script setup>
const props = defineProps([
    'search'
])
import replyMessageDialog from '@/components/dialog/replyMessageDialog.vue'
import { storeToRefs } from 'pinia';
import { messagesStore } from '@/stores/data/messages';
import { useUsefull } from '@/stores/component/usefull';
const usefullStore = useUsefull()
import router from '@/router'
import {ref} from 'vue'
const msg = ref('')
const toggle = ref(false)
const id = ref('')

const replyMessage = _id => {
    id.value = _id
    msg.value = ''
    usefullStore.setToggle(true)
}

const page = ref(1)
const pageSize = ref(20)

const store = messagesStore()
const {messages,messagesCount} = storeToRefs(store)

const {get_all_messages} = store

const indexFunc = (index) => (page.value-1)*pageSize.value + index + 1

const handleCurrentChange = async (val) => {
    window.scrollTo(0, 0)
    router.push({ path: '/message', query: { page: val } })
    await get_all_messages({ page: val, ...props.search })
    page.value = val;
}


</script>
<style lang="">
    
</style>