<template>
  <div class="mt-[200px]">
    {{ VITE_APP_TITLE }}

    <button class="rounded bg-blue-500 px-4 py-2 text-base text-white">children</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Home' })
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE
// const children = ref('Click Me')
</script>

<style scoped lang="less"></style>
