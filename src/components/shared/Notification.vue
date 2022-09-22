<script setup lang="ts">
import { Notification } from '@/global/enums';
import { inject, onMounted, ref } from 'vue';

const bus = inject('eventBus') as any

const message = ref('')
const type = ref(null as Notification | null)
const visible = ref(false)

const showNotification = (text: string, style: Notification) => {
  message.value = text
  type.value = style
  visible.value = true

  window.setTimeout(() => {
    visible.value = false
    
    window.setTimeout(() => {
      message.value = ''
      type.value = null
    }, 300)
  }, 3000)
}

onMounted(() => {
  bus.on(Notification.SUCCESS, (message: string) => showNotification(message, Notification.SUCCESS))
  bus.on(Notification.ERROR, (message: string) => showNotification(message, Notification.ERROR))
  bus.on(Notification.INFO, (message: string) => showNotification(message, Notification.INFO))
})
</script>

<template>
  <div :class="[ visible ? 'visible' : '', type, 'notification']">{{ message }}</div>
</template>

<style scoped lang="scss">
.notification {
  position: fixed;
  top: -5rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
  max-width: 250px;
  transition: top 0.2s ease-in;
  z-index: 2;

  &.visible {
    top: 6rem;
    transition: top 0.3s ease-out;
  }
  
  &.success {
    background-color: #d4ffd4;
    border: 1px solid green;
    color: green;
  }

  &.error {
    background-color: #ffd0d0;
    border: 1px solid red;
    color: red;
  }

  &.info {
    background-color: #e3e3ff;
    border: 1px solid blue;
    color: blue;
  }
}
</style>