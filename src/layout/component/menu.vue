<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="active"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-sub-menu v-for="(item) in routerArr" :index="item.path" :key="item.name">
      <template #title>
        <el-icon :size="20">
          <location />
        </el-icon>

        <span>{{ item.name }}</span>
      </template>
      <template v-if="item.children">
        {{ item.meta }}
        <el-menu-item-group v-for="pro in  item.children " :index="item.path" :key="pro">
          <el-menu-item :index="pro.path" :route="pro">
            <el-icon>
              <edit />
            </el-icon>
            {{ pro.name }}
          </el-menu-item>
        </el-menu-item-group>
      </template>
      <template v-else>
        <el-menu-item-group :index="item.path">
          <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
        </el-menu-item-group>
      </template>
    </el-sub-menu>
  </el-menu>
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
<style scoped lang="scss">
.el-menu-vertical-demo {
  height: 100%;
}
</style>
