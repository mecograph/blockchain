<script setup lang="ts">
import useBlockchain from '@/composables/useBlockchain'
import TransactionsTable from '@/components/blockchain/TransactionsTable.vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity';

const route = useRoute()
const wallet = computed(() => route.params.id.toString())
const truncated = computed(() => wallet.value.length > 25 ? `${wallet.value.slice(0, 25)}...` : wallet.value)

const { 
  getBalanceFor,
  getTransactionsFor
} = useBlockchain()

const balance = computed(() => getBalanceFor(wallet.value))
const transactions = computed(() => getTransactionsFor(wallet.value))
</script>

<template>
  <h1>Wallet</h1>
  <p>{{ truncated }} has a balance of <span :class="[ balance < 0 ? 'negative': '', 'highlight']">{{ balance }}</span> coins.</p>
  <TransactionsTable :transactions="transactions" />
</template>

<style scoped lang="scss">
.highlight {
  font-family: monospace;
  font-size: 1rem;
  background-color: $lightest-gray;
  padding: 0.25rem 0.5rem;
  border: 1px solid green;
  color: green;

  &.negative {
    border: 1px solid red;
    color: red;
  }
}
</style>