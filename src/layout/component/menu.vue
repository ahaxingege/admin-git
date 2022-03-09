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
      :collapse="isCollapse"
      router
    >
      <div class="toogle-collapse">
        <el-button @click="toogleCollapse">
          <el-icon v-if="!isCollapse" color="#fff" size="30px">
            <fold />
          </el-icon>
          <el-icon v-else color="#fff" size="30px">
            <expand />
          </el-icon>
        </el-button>
      </div>
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
            <el-icon>
              <avatar />
            </el-icon>
            <template #title>
              <span>{{ par.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" >
import { ref, reactive, defineComponent, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { mapGetters, useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  setup() {
    const a = ref(1)
    const store = useStore()
    const storeState = mapGetters(['isCollapse'])
    const isCollapse = computed(storeState.isCollapse.bind({ $store: store }))
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
    const toogleCollapse = () => {
      store.dispatch('layoutSetting/login', !isCollapse.value).then((result) => {
        console.log(result)
      })
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
      isCollapse,
      active,
      routerArr,
      evil,
      handleOpen,
      handleClose,
      toogleCollapse
    }
  }
})

</script>
<style scoped lang="scss">
.toogle-collapse {
  height: 30px;
  position: relative;
  .el-button {
    position: absolute;
    width: 60px;
    right: 0;
    background: none;
    border: none;
  }
}
.el-menu-vertical-demo {
  display: block;
  min-height: 100vh;
  background-color: var(--el-menu-bg-color);
}
::v-deep .el-scrollbar__view {
  min-height: 100%;
}
</style>
