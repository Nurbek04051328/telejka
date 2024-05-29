<template>
    <el-row :gutter="30">
        <el-col :span="6">
            <div class="box">
                <div class="head filial">
                    <div class="name">Filiallar</div>
                    <div class="value">{{branches}} <span>ta</span></div>
                    <div class="icon">
                        <el-icon><OfficeBuilding /></el-icon>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="box">
                <div class="head car">
                    <div class="name">Mashina turlari</div>
                    <div class="value">{{carTypes}} <span>ta</span></div>
                    <div class="icon">
                        <el-icon><van /></el-icon>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="box">
                <div class="head wash">
                    <div class="name">Moyka turlari</div>
                    <div class="value">{{washTypes}} <span>ta</span></div>
                    <div class="icon">
                        <el-icon><stamp /></el-icon>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="box mb-2">
                <div class="head order">
                    <div class="name">Barcha buyurtmalar</div>
                    <div class="value">{{orders}} <span>ta</span></div>
                    <div class="icon">
                        <el-icon><money /></el-icon>
                    </div>
                </div>
            </div>
            
        </el-col>
    </el-row>
</template>
<script setup>
defineProps(['orders','branches','washTypes','carTypes'])
</script>
<style lang="scss">

</style>