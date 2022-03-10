<template>
  <div class="header-wrap">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        设置
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in options"
            :command="item.value"
            :key="item.value"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" >
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import useGetters from '@/store/hooks/useGetters'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const value = ref<string>('');
    const options = [
      {
        value: 'logout',
        label: '退出登录'
      }]
    const store = useStore()
    const { isCollapse } = useGetters('', ['isCollapse'])
    const routerInstance = useRouter()
    const handleCommand = (command: string | number | Record<string, unknown>) => {
      if (command === 'logout') {
        store.dispatch('user/logout').then(() => {
          const redirect = routerInstance.currentRoute.value.path as string;
          const params = routerInstance.currentRoute.value.query
          routerInstance.replace({
            path: '/login', query: { redirect: redirect, ...params }
          })
        })
      }
    }
    return {
      isCollapse,
      value,
      options,
      handleCommand
    }
  }
})
</script>
<style scoped lang="scss">
.header-wrap {
  width: 100;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-dropdown {
  cursor: pointer;
  justify-self: flex-end;
}
</style>
