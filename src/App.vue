<script setup lang="ts">
import SiteHeader from '@/components/base/SiteHeader.vue'
import SiteFooter from '@/components/base/SiteFooter.vue'
import Notification from '@/components/shared/Notification.vue'
import { createGenesisBlock } from '@/services/blockchainService';
import { useStore } from '@/store'
import { computed, onBeforeMount } from 'vue'

const store = useStore()

const hasGenesisBlock = computed(() => store.state.chain.blocks.length > 0)

onBeforeMount(async () => {
  if(!hasGenesisBlock.value) {
    const genesisBlock = await createGenesisBlock()
    store.dispatch('addNewBlock', genesisBlock)
  }
})
</script>

<template>
  <SiteHeader />
  <main v-if="hasGenesisBlock">
    <div class="container">
      <router-view />
    </div>
  </main>
  <SiteFooter />
  <Notification />
</template>

<style scoped lang="scss">
main {
  margin: 0 1rem;
  flex-grow: 1;
  padding-top: 2rem;

  @include tablet {
    margin: 0 auto;
  }
}
</style>
