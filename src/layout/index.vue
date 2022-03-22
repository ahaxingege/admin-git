<template>
  <el-container>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'" :class="{ close: isCollapse }">
        <layout-menu />
      </el-aside>
      <el-container class="auto-scroll">
        <el-header>
          <layout-header />
        </el-header>
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
import layoutMenu from '@/layout/component/layoutMenu.vue';
import layoutHeader from '@/layout/component/LayoutHeader.vue';
import useGetters from '@/store/hooks/useGetters'
export default defineComponent({
  name: 'Layout',
  components: {
    layoutMenu,
    layoutHeader
  },
  setup() {
    // const store = useStore();
    const { isCollapse } = useGetters('', ['isCollapse'])
    // const isCollapse = computed(() => store.getters.isCollapse);
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
:deep .el-aside {
  min-height: 100%;
  // transition: width 1.5s;
  background-color: var(--el-menu-bg-color);
  &.close {
    transition: width 0.3s;
  }
}
</style>
