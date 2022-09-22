import { Wallet } from '@/global/types'
import { ec } from 'elliptic'

export const createNewWallet = (): Wallet => {
  const crypto = new ec('secp256k1')
  const keyObj = crypto.genKeyPair()

  return {
    keyObj,
    publicKey: keyObj.getPublic('hex'),
    privateKey: keyObj.getPrivate('hex')
  }
}
