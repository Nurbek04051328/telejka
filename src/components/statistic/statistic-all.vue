<template>
    <el-row :gutter="30">
        <el-col :span="6" :xs="12">
            <div class="box link filial">
                <div class="head ">
                    <div class="icon">
                        <el-icon><OfficeBuilding /></el-icon>
                    </div>
                    <div class="name">Группы</div>
                    <div class="value">{{stat.groupsCount}}</div>
                </div>
            </div>
        </el-col>
        <el-col :span="6" :xs="12">
            <div class="box car link">
                <div class="head ">
                    <div class="icon">
                        <el-icon><van /></el-icon>
                    </div>
                    <div class="name">Ключевые слова</div>
                    <div class="value">{{stat.keyWords}}</div>
                </div>
            </div>
        </el-col>
        <el-col :span="6" :xs="12">
            <div class="box wash link">
                <div class="head ">
                    <div class="icon">
                        <el-icon><message/></el-icon>
                    </div>
                    <div class="name">Сообщение</div>
                    <div class="value">{{stat.messages}} </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6" :xs="12">
            <div class="box mb-2 order">
                <div class="head ">
                    <div class="icon">
                        <el-icon><money /></el-icon>
                    </div>
                    <div class="name">Кол-во исп. слова</div>
                    <div class="value">{{stat.keyWordMessages}}</div>
                </div>
            </div>
            
        </el-col>
    </el-row>
</template>
<script setup>
defineProps(['stat'])
</script>
<style lang="scss">
@import '@/style/component/statistic.scss';
</style>