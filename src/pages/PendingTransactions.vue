<script setup lang="ts">
  import { computed, inject, ref } from 'vue'
import { useStore } from '@/store'
import { Notification } from '@/global/enums'
import useBlockchain from '@/composables/useBlockchain'
import TransactionsTable from '@/components/blockchain/TransactionsTable.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const store = useStore()
const bus = inject('eventBus') as any
const { minePendingTransactions } = useBlockchain()

const pendingTransactions = computed(() => store.state.chain.pendingTransactions)
const disabled = computed(() => pendingTransactions.value.length === 0 || mining.value)
const mining = ref(false)

const mine = async() =>{
  try {
    mining.value = true
    bus.emit(Notification.INFO, 'Started mining, depending on the difficulty this might take some time...')
    await minePendingTransactions()

    window.setTimeout(() => {
      bus.emit(Notification.SUCCESS, 'Successfully mined all pending transactions. Check out the new block!')
      mining.value = false
    }, 3000)
  } catch (error) {
    bus.emit(Notification.ERROR, 'Something went wrong while mining :(')
    mining.value = false
  }
} 
</script>

<template>
  <h1>Pending transactions</h1>

  <div v-if="pendingTransactions">
    <p v-if="!pendingTransactions.length && !mining">
      This block has no transactions
    </p>
    <p v-else-if="mining">
      Pending transactions are being processed to be included in the next block...
    </p>
    <p v-else>
      These transactions are waiting to be included in the next block. Next block is created when you start the mining process.
    </p>

    <TransactionsTable v-if="pendingTransactions"
                       :transactions="pendingTransactions" />

    <button v-if="!mining" @click="mine()" :disabled="disabled">
      Start mining
    </button>
    <LoadingSpinner v-else class="spinner" />
  </div>
</template>

<style scoped lang="scss">
button {
  @include button;
  margin-top: 2rem;
}

.spinner {
  margin-top: 2rem;
}
</style>