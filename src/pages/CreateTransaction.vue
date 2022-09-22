<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { Notification } from '@/global/enums'
import useBlockchain from '@/composables/useBlockchain'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'

const { createTransaction } = useBlockchain()
const store = useStore()
const bus = inject('eventBus') as any

const sender = computed(() => store.state.wallet.publicKey)
const disabled = computed(() => to.value === '' || amount.value === '' || creating.value)
const to = ref('')
const amount = ref('')
const receipient = ref(null as HTMLInputElement | null)
const creating = ref(false)

const create = () => {
  creating.value = true
  createTransaction(sender.value, to.value, parseInt(amount.value))

  window.setTimeout(() => {
    bus.emit(Notification.SUCCESS, 'Successfully created transaction. Check out pending transactions to mine!')
    creating.value = false
    to.value = ''
    amount.value = ''
  }, 1500)
}

onMounted(() => {
  receipient.value?.focus()
})
</script>

<template>
  <h1>Create transaction</h1>

  <div class="form">
    <p>Transfer some coins to someone!</p>

    <!-- FROM -->
    <div class="form__group">
      <input type="text"
             id="from"
             :value="sender"
             :data-has-value="true"
             disabled>
      <label for="from">From address</label>
    </div>

    <!-- TO -->
    <div class="form__group">
      <input type="text"
             id="to"
             ref="receipient"
             :data-has-value="to !== ''"
             v-model="to">
      <label for="to">Receipient</label>
    </div>

    <!-- AMOUNT -->
    <div class="form__group">
      <input type="number"
             id="amount"
             :data-has-value="amount !== ''"
             v-model.string="amount">
      <label for="amount">Amount</label>
    </div>

    <button v-if="!creating" @click="create()" :disabled="disabled">
      Sign & create transaction
    </button>
    <LoadingSpinner v-else class="spinner" />
    
  </div>
</template>

<style scoped lang="scss">
.form {
  @include form;
}
</style>