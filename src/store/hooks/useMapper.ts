import {
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
// 组合mapState和mapGetters
export default function (data: any, mapFn: any) {
  const store = useStore()
  const storeGettersFns = mapFn(data)
  const storeGetters: any = {}
  Object.keys(storeGettersFns).forEach(fnkey => {
    const fn = storeGettersFns[fnkey].bind({
      $store: store
    })
    storeGetters[fnkey] = computed(fn)
  })
  return storeGetters
}
