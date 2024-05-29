<template>
    <h3 class="mb-2">Группы</h3>
    <el-table :data="groups">
        <el-table-column type="index" :index="indexFunc" width="60"/>
        <el-table-column label="Название группы" min-width="300">
            <template #default="scope">
                <div>
                    <a :href="scope.row.link" target="_blank">
                        {{scope.row.groupName}}
                    </a>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="msgCount" label="Кол-во сообщений" width="170"/>
        <el-table-column prop="keyWordMsg" label="Кол-во ключевых сообщений" width="230"/>
    </el-table>    
</template>

<script setup>
defineProps(['groups'])

const indexFunc = (index) => index + 1

</script>

<style>

</style>