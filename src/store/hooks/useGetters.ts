import {
  mapGetters,
  createNamespacedHelpers
} from 'vuex'
import useMapper from './useMapper'

export default function (name: any, getters: any) {
  let mapFn = mapGetters
  if (typeof name === 'string' && name.length > 0) {
    mapFn = createNamespacedHelpers(name).mapGetters
  }
  return useMapper(getters, mapFn)
}
