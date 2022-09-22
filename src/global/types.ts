import { ec } from 'elliptic'

export interface Wallet {
  keyObj: ec.KeyPair
  publicKey: string
  privateKey: string
}

export interface Transaction {
  from: string | null
  to: string
  amount: number
  signature?: string
  timestamp: number
}

export interface Block {
  timestamp: number
  transactions: Transaction[]
  previousHash: string
  hash: string
  nonce: number
}

export interface Blockchain {
  blocks: Block[]
  // difficulty: number
  pendingTransactions: Transaction[]
  // miningRewards: number
}

export interface State {
  wallet: Wallet
  chain: Blockchain
  difficulty: number
  rewards: number
}
