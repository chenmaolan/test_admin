<template lang="pug">
h1 子级
  h2 111234654s6afsf
</template>
<script lang="ts">
  import { useRoute } from 'vue-router'
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      let route = useRoute()
      console.log(route.name, 'route-----')
    },
  })
</script>
