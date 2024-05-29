<template>
  <div class="box chart">
    <el-row :gutter="20">
        <el-col :span="type ? 24 : 12" :xs="24" :class="{
            'mb-2': type
        }">
            <h4>{{labels.messages}}</h4>
            <Bar
            id="my-chart-id"
            :data="{
                labels: labels.list,
                datasets: [ { 
                        data: data.messages,
                        label:'',
                        backgroundColor: color.messages
                    } ]
                }"/>
        </el-col>
        <el-col :span="type ? 24 : 12" :xs="24">
            <h4>{{labels.keyword}}</h4>
            <Bar
                id="my-chart-id"
                :data="{
                    labels: labels.list,
                    datasets: [ { 
                        data: data.keyWordMessages,
                        label:'',
                        backgroundColor: color.keyword
                    } ]
                }"
            />
        </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

defineProps(['data','labels','type','color'])





</script>

<style>

</style>