<script setup lang="ts">
import { Notification } from '@/global/enums';
import { useStore } from '@/store'
import { inject, ref } from 'vue'

const store = useStore()
const bus = inject('eventBus') as any

const difficulty = ref(store.state.difficulty)
const rewards = ref(store.state.rewards)

const saveSettings = () => {
  bus.emit(Notification.INFO, 'Updated settings for difficulty/rewards.')
  store.dispatch('updateDifficulty', difficulty.value)
  store.dispatch('updateRewards', rewards.value)
}
</script>

<template>
  <h1>Settings</h1>

  <div class="form">
    <p>Control how the blockchain behaves when new transactions or blocks are created.</p>
    <div class="form__group">
      <input type="number"
             class="form__group-input"
             id="difficulty"
             :data-has-value="true"
             v-model="difficulty">
      <label for="difficulty">Difficulty</label>
    </div>
    <small>Difficulty controls how much computational power the mining process will need.</small>

    <div class="form__group">
      <input type="number"
             class="form__group-input"
             id="rewards"
             :data-has-value="true"
             v-model="rewards">
      <label for="rewards">Mining rewards</label>
    </div>
    <small>How much coins a miner receives for mining a new block.</small>

    <button @click="saveSettings()">
      Save settings
    </button>
  </div>
</template>

<style scoped lang="scss">
.form {
  @include form;

  &__group {
    margin-bottom: 0;
  }

  small {
    margin: 0.5rem 0 2rem;
    display: block;
    font-size: 0.8rem;
    color: $gray;
  }
}
</style>