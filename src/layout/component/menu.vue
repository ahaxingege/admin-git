<template>
  <el-scrollbar wrap-class="menu-scroll">
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
      <!--  unique-opened 手风琴模式 -->
      <template v-for="(par) in routerArr" :index="par.path" :key="par.name">
        <template v-if="par.children && par.children.length > 1">
          <el-sub-menu :index="par.path" :route="par" :key="par.path">
            <template #title>
              <el-icon>
                <fold />
              </el-icon>
              <span>{{ par.name }}</span>
            </template>
            <el-menu-item
              v-for="pro in  par.children "
              :index="pro.path"
              :route="pro"
              :key="pro.path"
            >{{ pro.name }}</el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="par.path" :route="par" :key="par.path">
            <template #title>
              <el-icon>
                <avatar />
              </el-icon>
              <span>{{ par.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" >
import { ref, reactive, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup() {
    const a = ref(1)
    const b = reactive({});
    const active = ref(useRouter().currentRoute.value.fullPath);
    // console.log(useRouter().currentRoute.value.fullPath)
    let routerArr = reactive(useRouter().options.routes);
    routerArr = routerArr.filter((ele) => { return (ele.meta && !ele.meta.hidden) || !ele.meta })
    const handleOpen: any = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const evil = (str: string) => {
      var Fn = Function;
      return new Fn('return ' + str)();
    }
    const str = '[5, [[4, 3], 2, 1]]'.replaceAll('[', '(').replaceAll(']', ']').replaceAll(',', '-').replaceAll(']', ')')
    onMounted(() => {
      console.log(evil(str))
      console.log(routerArr, routerArr.filter(x => { return x.children && x.children.length > 1 }));
    })
    return {
      a,
      b,
      active,
      routerArr,
      evil,
      handleOpen,
      handleClose
    }
  }
})

</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
  display: block;
  min-height: 100vh;
  background-color: var(--el-menu-bg-color);
}
::v-deep .el-scrollbar__view {
  min-height: 100%;
}
</style>
