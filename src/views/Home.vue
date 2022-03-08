<template>
  <div class="home">
    <img v-for="i in 100" :key="i" alt="Vue logo" src="@/assets/logo.png" />
  </div>
</template>
<script lang="ts" >
import { ref, reactive, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup() {
    const a = ref(1)
    const b = reactive({});
    const routerArr = reactive(useRouter().getRoutes())
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    onMounted(() => {
      console.log(routerArr[0])
    })
    return {
      a,
      b,
      routerArr,
      handleOpen,
      handleClose
    }
  }
})
</script>
