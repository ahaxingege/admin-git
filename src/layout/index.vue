<template>
  <el-container>
    <!-- <el-header>Header</el-header> -->
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-container>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import Menu from '@/layout/component/menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu
  },
  data: function () {
    return {
      count: 0
    }
  },
  methods: {
  },
  computed: {
  }
})
</script>
<style scoped lang="scss">
.el-container {
  height: 100%;
}
</style>
