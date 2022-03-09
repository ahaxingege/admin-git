<template>
  <div class="home">
    <img v-for="i in 100" :key="i" alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>
<script lang="ts" >
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    onMounted(() => {
      console.log('home')
    })
    return {

    }
  }
})
</script>
