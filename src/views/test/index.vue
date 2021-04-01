<template lang="pug">
div
  h1 父级
  keep-alive
    TestCom
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import TestCom from './components/test-com.vue'
  export default defineComponent({
    components: {
      TestCom,
    },
    setup() {},
  })
</script>
