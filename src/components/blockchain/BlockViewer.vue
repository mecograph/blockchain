<script setup lang="ts">
import { Block } from '@/global/types';
import { convertTimestamp } from '@/global/utils';
import { computed } from 'vue';

export interface Props {
  block: Block
  isActive: boolean
  blockNumber: number
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

const emit = defineEmits<{
  (e: 'showTransactions', block: Block): void
}>()

const color = (hash: string) => `#${hash.substring(6, 12)}`

const currentColor = computed(() => color(props.block.hash))
const previousColor = computed(() => color(props.block.previousHash))
const isGenesisBlock = computed(() => props.block.previousHash === '0')
</script>

<template>
  <div :class="[ isActive ? 'active' : '', 'card']" @click="emit('showTransactions', block)">
    <h3>Block #{{ blockNumber }}</h3>

    <div class="card__item">
      <p class="current truncated">{{ block.hash }}</p>
      <p class="card__item-info">Hash</p>
    </div>

    <div class="card__item">
      <p v-if="isGenesisBlock"><i>Genesis block</i></p>
      <p v-else class="prev truncated">{{ block.previousHash }}</p>
      <p class="card__item-info">Hash of previous block</p>
    </div>

    <div class="card__item">
      <p v-if="isGenesisBlock"><i>Genesis block</i></p>
      <p v-else>{{ block.nonce }}</p>
      <p class="card__item-info">Nonce</p>
    </div>

    <div class="card__item">
      <p>{{ convertTimestamp(block.timestamp) }}</p>
      <p class="card__item-info">Timestamp</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  max-width: 250px;
  border: 1px solid $light-gray;
  padding: 1rem 1.5rem;
  transition: all 0.1s ease-out;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: $lightest-gray;
    border: 1px solid $gray;
    box-shadow: 0px 6px 20px -6px rgb(0 0 0 / 50%);
  }

  &.active {
    border: 1px solid $gray;

    &:hover {
      border: 1px solid $gray;
      box-shadow: none;
      background-color: white;
      cursor: default;
    }
  }

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  &__item {
    margin-top: 1rem;

    &-info {
      font-size: 0.75rem;
      color: $gray;
      border-top: 1px solid $light-gray;
      padding-top: 0.25rem;
      margin-top: 0.25rem;
    }
  }

  h3 {
    @include truncated;
    color: v-bind(currentColor);
    margin-bottom: 1.5rem;
  }

  .current {
    color: v-bind(currentColor);
  }

  .prev {
    color: v-bind(previousColor);
  }

  .truncated {
    @include truncated;
  }
}
</style>