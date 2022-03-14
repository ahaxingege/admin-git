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
      <!-- {{ routerInfo }} -->
      <div class="toogle-collapse">
        <h3 v-if="!isCollapse" @click="toHome">不停机发布工具</h3>
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
import { ref, reactive, defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import useGetters from '@/store/hooks/useGetters'
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()
    const { isCollapse } = useGetters('', ['isCollapse'])
    const { routerInfo } = useGetters('', ['routerInfo'])
    const active = ref<string>('');
    const routerArr = routerInfo.value.filter((ele: any) => {
      return (ele.children && ele.children.length !== 0 && ele.meta && !ele.meta.hidden) || !ele.meta
    })
    console.log(routerArr)
    const handleOpen: any = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const toHome = () => {
      router.push('/');
    }
    const toogleCollapse = () => {
      console.log(isCollapse.value)
      store.dispatch('layoutSetting/toogleMenu', !isCollapse.value).then((result) => {
        result.message && ElMessage({
          message: result.message,
          type: 'success'
        })
      })
    }
    onMounted(() => {
      console.log(router.currentRoute.value.fullPath)
      active.value = router.currentRoute.value.fullPath
    })
    return {
      isCollapse,
      routerInfo,
      active,
      routerArr,
      handleOpen,
      handleClose,
      toogleCollapse,
      toHome
    }
  }
})

</script>
<style scoped lang="scss">
.toogle-collapse {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 15px 15px;
  h3 {
    color: #fff;
    overflow: hidden;
    flex: 1;
    text-align: left;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
  }
  .el-button {
    background: none;
    padding: 0;
    align-self: center;
    border: none;
  }
}
.el-menu-vertical-demo {
  display: block;
  min-height: 100vh;
  background-color: var(--el-menu-bg-color);
}
:deep .el-scrollbar__view {
  min-height: 100%;
}
</style>
