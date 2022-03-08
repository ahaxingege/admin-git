<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container class="auto-scroll">
        <el-scrollbar wrap-class="menu-scroll">
          <el-main>
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </el-main>
        </el-scrollbar>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" >
import { ref, reactive, defineComponent, onMounted } from 'vue';
import Menu from '@/layout/component/menu.vue';
import * as user from '@/api/login'
export default defineComponent({
  name: 'App',
  components: {
    Menu
  },
  setup() {
    user.login({}).then((result) => {
      console.log(result)
    })
    const a = ref(1)
    const b = reactive({});
    // console.log(useRouter().currentRoute.value.fullPath)
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
    })
    return {
      a,
      b,
      evil,
      handleOpen,
      handleClose
    }
  }
})
</script>
<style scoped lang="scss">
.el-container {
  height: 100%;
  overflow: auto;
}
::v-deep .el-aside {
  min-height: 100%;
  background-color: var(--el-menu-bg-color);
}
</style>
