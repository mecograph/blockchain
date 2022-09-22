<script setup lang="ts">
import SiteNavigation from '@/components/base/SiteNavigation.vue'
</script>

<template>
  <header>
    <div class="container">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <SiteNavigation />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  border-bottom: 1px solid $gray;
  padding: 1rem;
  background-color: white;
  width: 100%;
  position: relative;
  z-index: 3;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
