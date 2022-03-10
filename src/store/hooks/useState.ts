import {
  mapState,
  createNamespacedHelpers
} from 'vuex'
import useMapper from './useMapper'

export default function (name: any, states: any) {
  let mapFn = mapState
  if (typeof name === 'string' && name.length > 0) {
    mapFn = createNamespacedHelpers(name).mapState
  }
  return useMapper(states, mapFn)
}
