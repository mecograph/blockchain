<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { Block } from '@/global/types'
import BlockViewer from '@/components/blockchain/BlockViewer.vue'
import TransactionsTable from '@/components/blockchain/TransactionsTable.vue'

const store = useStore()
const chain = computed(() => store.state.chain)
const selectedBlock = ref({} as Block)

const showTransactions = (block: Block) => {
  selectedBlock.value = block
}

onMounted(() => {
  selectedBlock.value = chain.value.blocks[0]
})
</script>

<template>
  <p>Each card represents a block on our MP blockchain. Click on the block to see the transactions stored inside.</p>

  <div class="cards">
    <BlockViewer v-for="(block, index) in chain.blocks"
                :key="block.timestamp"
                :block="block"
                :block-number="index + 1"
                :is-active="selectedBlock.hash === block.hash"
                @show-transactions="showTransactions(block)" />
  </div>

  <TransactionsTable v-if="selectedBlock"
                      :transactions="selectedBlock.transactions" />
</template>

<style scoped lang="scss">
.cards {
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  margin: 2rem 0;
  padding: 1.5rem;
}
</style>