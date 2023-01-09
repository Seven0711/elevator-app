<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ account }}
    <button @click="handleClick">点击</button>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
</script>

<script lang="ts" setup>
const account = ref<number>(0)
const handleClick = () => {
  account.value++
}
onMounted(() => {
  account.value = 10
})
</script>
