<template>
  <div class="header-wrap">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎， {{ userInfo.userName }}
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
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import useGetters from '@/store/hooks/useGetters'
interface optionsType {
  value: string,
  label: string
}
export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    const store = useStore()
    const routerInstance = useRouter()
    const options: Array<optionsType> = [{
      value: 'logout',
      label: '退出登录'
    }]
    const { userInfo } = useGetters('', ['isCollapse', 'userInfo'])
    const handleCommand = (command: string | number | Record<string, unknown>) => {
      if (command === 'logout') {
        ElMessageBox.confirm(
          '是否确认退出登录?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }
        )
          .then(() => {
            store.dispatch('user/logout').then(() => {
              const redirect: string = routerInstance.currentRoute.value.path;
              const params = routerInstance.currentRoute.value.query
              routerInstance.replace({
                path: '/login', query: { redirect: redirect, ...params }
              })
            })
          })
      }
    }
    return {
      userInfo,
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
