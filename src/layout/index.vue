<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" :class="{ close: isCollapse }">
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
import { defineComponent, computed } from 'vue';
import Menu from '@/layout/component/menu.vue';
import { mapGetters, useStore } from 'vuex'
export default defineComponent({
  name: 'App',
  components: {
    Menu
  },
  setup() {
    const store = useStore()
    const storeState = mapGetters(['isCollapse'])
    const isCollapse = computed(storeState.isCollapse.bind({ $store: store }))
    return {
      isCollapse
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
  // transition: width 0.2s;
  background-color: var(--el-menu-bg-color);
  &.close {
    transition: width 0.3s;
  }
}
</style>
