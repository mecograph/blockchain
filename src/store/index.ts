import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { State } from '@/global/types'
import state from '@/store/state'
import actions from '@/store/actions'
import mutations from '@/store/mutations'

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  actions,
  mutations
})

export function useStore() {
  return baseUseStore(key)
}