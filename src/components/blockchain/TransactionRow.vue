<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
import { Transaction } from '@/global/types'
import { convertTimestamp } from '@/global/utils';
import { calculateHash } from '@/services/blockchainService';
import { useStore } from '@/store';
import { ec } from 'elliptic';

const props = defineProps<{
  index: number
  transaction: Transaction
}>()

const store = useStore()

const sender = computed(() => props.transaction.from)
const receipient = computed(() => props.transaction.to)
const wallet = computed(() => store.state.wallet.publicKey)
const isValid = ref(false)

onMounted(async () => {
  const { from, to, amount, signature } = props.transaction
  
  if(from === null) {
    isValid.value = true
    return
  }

  if(!signature) throw new Error('Signature is missing')

  const crypto = new ec('secp256k1')
  const publicKey = crypto.keyFromPublic(from, 'hex')
  const hash = await calculateHash(from + to + amount)

  isValid.value = publicKey.verify(hash, signature)
})
</script>

<template>
  <tr>
    <td class="centered">{{ index + 1 }}</td>
    <td class="truncated">
      <router-link v-if="sender" :to="{ name: 'Wallet', params: { id: sender }}">{{ sender }}</router-link>
      <span v-else>System</span>
    </td>
    <td class="truncated">
      <router-link v-if="receipient !== wallet" :to="{ name: 'Wallet', params: { id: receipient }}">{{ receipient }}</router-link>
      <span v-else>Miner (reward)</span>
    </td>
    <td class="right">{{ transaction.amount.toLocaleString() }}</td>
    <td class="centered">{{ convertTimestamp(transaction.timestamp) }}</td>
    <td class="centered">
      <span v-if="isValid">✅</span>
      <span v-else>❌</span>
    </td>
  </tr>
</template>

<style scoped lang="scss">
td {
  padding: 0.25rem;

  &.centered {
    text-align: center;
  }

  &.right {
    text-align: right
  }

  &.truncated {
    @include truncated;
    max-width: 200px;
  }
}
</style>