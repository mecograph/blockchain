import { Block, Transaction } from '@/global/types'
import { store } from '@/store'

/**
 * Generates a hash from a given message
 * @param message from which the hash should be calculated
 */
export const calculateHash = async (message: string): Promise<string> => {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Create the very first block of the blockchain
 */
export const createGenesisBlock = async (): Promise<Block> => {
  const timestamp = new Date().getTime()
  const transactions: Transaction[] = []
  const previousHash = '0'
  const nonce = 0

  return {
    timestamp,
    transactions,
    previousHash,
    hash: await calculateHash(previousHash + timestamp + JSON.stringify(transactions) + nonce),
    nonce
  }
}

/**
 * Returns the last added block from the blockchain
 */
export const getLatestBlock = (): Block => {
  const { blocks } = store.state.chain
  const index = blocks.length - 1
  
  return blocks[index]
}

/**
 * TODO: To verify that this transaction is actually legit
 * the sender need to sign the transaction hash with
 * his private key to create an unique hash
 * @param sender the signer of the transaction (must be wallet owner)
 * @param receipient receipient of the transaction
 * @param amount amount of coins which should be contained in the transaction
 */
export const signTransaction = async (sender: string, receipient: string, amount: number): Promise<string> => {
  const signingKey = store.state.wallet.keyObj

  if(sender !== signingKey.getPublic('hex'))
    throw new Error('You cannot sign transactions for other wallets!')

  const hash = await calculateHash(sender + receipient + amount)
  const sig = signingKey.sign(hash, 'base64')

  return sig.toDER('hex')
}
