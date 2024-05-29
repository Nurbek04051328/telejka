<template>
  <div>
    <h3 class="mb-2">Сегодня</h3>
    <div class="box mb-2 success">
        <div class="head success">
            <div class="name">Сообщение</div>
            <div class="value">
                {{daily?.messages}} шт.
            </div>
            <div class="icon">
                <el-icon><message /></el-icon>
            </div>
        </div>
    </div>
    <div class="box mb-2 primary">
        <div class="head success">
            <div class="name">Кол-во ключевых сообщений</div>
            <div class="value">
                {{daily?.keyWordMessages}} шт.
            </div>
            <div class="icon">
                <el-icon><message /></el-icon>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['daily'])
</script>

<style>

</style>