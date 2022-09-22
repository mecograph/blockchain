import { Block, Transaction } from '@/global/types'
import { ActionContext } from 'vuex'

const actions = {
  addNewBlock({ commit, state }: ActionContext<any, any>, block: Block) {
    const blocks = state.chain.blocks

    commit('updateBlocks', [ ...blocks, block ])
    commit('updatePendingTransactions', [])
  },
  addPendingTransaction({ commit, state }: ActionContext<any, any>, tx: Transaction) {
    const pendingTransactions = state.chain.pendingTransactions

    commit('updatePendingTransactions', [ ...pendingTransactions, tx ])
  },
  updateDifficulty({ commit, state }: ActionContext<any, any>, difficulty: number) {
    commit('setDifficulty', difficulty)
  },
  updateRewards({ commit, state }: ActionContext<any, any>, rewards: number) {
    commit('setRewards', rewards)
  }
}

export default actions
