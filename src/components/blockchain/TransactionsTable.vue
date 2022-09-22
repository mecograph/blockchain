<script setup lang="ts">
import TransactionRow from './TransactionRow.vue'
import { Transaction } from '@/global/types'

const props = defineProps<{
  transactions?: Transaction[]
}>()

const columns = [ '#', 'From', 'To', 'Amount', 'Timestamp', 'Valid?' ]
</script>

<template>
  <div v-if="transactions && transactions.length">
    <h2>Transactions</h2>

    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in columns"
              :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <TransactionRow v-for="(tx, index) in transactions"
                        :key="index"
                        :index="index"
                        :transaction="tx" />
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
h2 {
  margin-top: 2rem;
}

table {
  margin: 1rem 0;
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8rem;

  th {
    background-color: $light-gray;
    padding: 0.5rem;
  }
}

.note {
  margin: 1rem 0;
}
</style>