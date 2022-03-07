<template>
  <div class="hello">
    <h1>{{ a }}</h1>
    <el-icon>
      <edit />
    </el-icon>
    <el-icon :size="20">
      <location />
    </el-icon>
  </div>
</template>

<script lang="ts" >
import { ref, reactive, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import { Location, Edit } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'App',
  components: { Location, Edit },
  setup() {
    const a = ref(1)
    const b = reactive({});
    const active = ref(useRouter().currentRoute.value.fullPath);
    console.log(useRouter().currentRoute.value.fullPath)
    let routerArr = reactive(useRouter().options.routes);
    routerArr = routerArr.filter((ele) => { return (ele.meta && !ele.meta.hidden) || !ele.meta })
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    onMounted(() => {
      console.log(routerArr);
    })
    return {
      a,
      b,
      active,
      routerArr,
      handleOpen,
      handleClose
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
