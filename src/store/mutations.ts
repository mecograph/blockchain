import { Block, State, Transaction } from '@/global/types'

const mutations = {
  setDifficulty(state: State, difficulty: number) {
    state.difficulty = difficulty
  },
  setRewards(state: State, rewards: number) {
    state.rewards = rewards
  },
  updateBlocks(state: State, blocks: Block[]) {
    state.chain.blocks = blocks
  },
  updatePendingTransactions(state: State, transactions: Transaction[]) {
    state.chain.pendingTransactions = transactions
  }
}

export default mutations
