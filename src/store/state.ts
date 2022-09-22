import { Block, Transaction } from '@/global/types'
import { createNewWallet } from '@/services/walletService'

const state = {
  wallet: createNewWallet(),
  chain: {
    blocks: [] as Block[],
    pendingTransactions: [] as Transaction[]
  },
  difficulty: 3,
  rewards: 10
}

export default state
