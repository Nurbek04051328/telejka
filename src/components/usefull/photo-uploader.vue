<template>
  
</template>

<script setup>

import { ref, watch } from 'vue'


const props = defineProps(['model', 'title', 'filelist', 'type'])
const emits = defineEmits(['upload'])



watch(
  () => props,
  (to) => {
    if (props.type) {
      list.value = [...props.filelist]
    }
  }
)
</script>

<style></style>
