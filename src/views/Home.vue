<template>
  <div class="home">
    <img v-for="i in 100" :key="i" alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    return {
      ...router.options.routes
    }
  }
})
</script>
