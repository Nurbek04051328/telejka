<template>
    <el-row :gutter="30" class="mb-2">
        <el-col :span="8" v-if="user.role == 'admin'">
            <div  class="box boss">
                <div class="head ">
                    <div class="icon">
                        <el-icon><Trophy /></el-icon>
                        
                    </div>
                    <div class="name">Bosslar</div>
                    <div class="value">{{workers?.find(worker => worker.role == 'boss')?.count || 0}} <span>ta</span></div>
                </div>
            </div>
        </el-col>
        <el-col :span="user.role == 'admin'?8:12">
            <div  class="box manager ">
                <div class="head ">
                    <div class="icon">
                        <el-icon><Suitcase /></el-icon>
                    </div>
                    <div class="name">Boshqaruvchilar</div>
                    <div class="value">{{workers?.find(worker => worker.role == 'manager')?.count || 0}} <span>ta</span></div>
                </div>
            </div>
        </el-col>
        <el-col :span="user.role == 'admin'?8:12">
            <div  class="box worker ">
                <div class="head ">
                    <div class="icon">
                        <el-icon><UserFilled /></el-icon>
                    </div>
                    <div class="name">Xodimlar</div>
                    <div class="value">{{workers?.find(worker => worker.role == 'worker')?.count || 0}} <span>ta</span></div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
defineProps(['workers'])
import {useUserStore} from '@/stores/main/user'
const user = useUserStore()
</script>
<style lang="scss">

</style>