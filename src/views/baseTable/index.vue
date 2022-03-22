<template>
  <div class="home">
    <div class="table-wrap">
      <el-table style="width:100%;" :data="tableData.list">
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="zip" label="Zip" width="120" />
      </el-table>
    </div>
  </div>
</template>
<script lang="ts" >
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { getbasetabel } from '@/api/data'
import useGetters from '@/store/hooks/useGetters'
interface Test {
  list: Array<string>
}
export default defineComponent({
  name: 'BaseTabel',
  setup() {
    const { isCollapse } = useGetters('', ['isCollapse'])
    // const collapse = ref(isCollapse)
    const resizeTable = ref<boolean>(true)
    const tableData = reactive<Test>({ list: [] })
    // watch(() => collapse.value, (newValue, oldValue) => {
    //   tableData.list = []
    //   nextTick(() => {
    //     getbasetabel(0).then((result: any) => {
    //       tableData.list = result.data
    //     })
    //   })
    // })
    onMounted(() => {
      getbasetabel(0).then((result: any) => {
        tableData.list = result.data
      })
    })
    return {
      resizeTable,
      isCollapse,
      tableData
    }
  }
})
</script>
<style lang="scss" scoped>
.table-wrap {
  height: 100%;
}
</style>
