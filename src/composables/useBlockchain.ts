import { Block, Transaction } from '@/global/types'
import { calculateHash, getLatestBlock, signTransaction } from '@/services/blockchainService'
import { store } from '@/store'

const useBlockchain = () => {

  const createTransaction = async (from: string, to: string, amount: number): Promise<void> => {
    try {
      const tx: Transaction = {
        from,
        to,
        amount,
        signature: await signTransaction(from, to, amount),
        timestamp: new Date().getTime()
      }

      store.dispatch('addPendingTransaction', tx)

    } catch (error) {
      throw new Error('Something went wrong while trying to create a new transaction')
    }
  }

  const getBalanceFor = (address: string): number => {
    let balance = 0

    for(const block of store.state.chain.blocks) {
      for(const transaction of block.transactions) {
        if(transaction.from === address) balance -= transaction.amount
        if(transaction.to === address) balance += transaction.amount
      }
    }

    return balance
  }

  const getTransactionsFor = (address: string): Transaction[] => {
    const transactions: Transaction[] = []

    for(const block of store.state.chain.blocks) {
      for(const transaction of block.transactions) {
        if(transaction.from === address || transaction.to === address) transactions.push(transaction)
      }
    }

    return transactions
  }

  const minePendingTransactions = async (): Promise<void> => {
    const timestamp = new Date().getTime()

    const previousHash = getLatestBlock().hash
    const transactions = store.state.chain.pendingTransactions
    let nonce = 0
    let hash = await calculateHash(previousHash + timestamp + JSON.stringify(transactions) + nonce)

    const difficulty = store.state.difficulty

    while(hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      nonce++
      hash = await calculateHash(previousHash + timestamp + JSON.stringify(transactions) + nonce)
    }

    const newBlock: Block = {
      timestamp,
      transactions,
      previousHash,
      hash,
      nonce
    }

    store.dispatch('addNewBlock', newBlock)

    const rewardTx: Transaction = {
      from: null,
      to: store.state.wallet.publicKey,
      amount: store.state.rewards,
      timestamp
    }

    store.dispatch('addPendingTransaction', rewardTx)
  }

  return {
    createTransaction,
    getBalanceFor,
    getTransactionsFor,
    minePendingTransactions
  }
}

export default useBlockchain
