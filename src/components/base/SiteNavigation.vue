<script setup lang="ts">
import { computed } from 'vue'
import router from '@/router'

const routes = router.getRoutes()
const visibleRoutes = computed(() => routes.filter(route => !route.meta.hidden))
</script>

<template>
  <nav>
    <router-link v-for="(route, index) in visibleRoutes" 
                 :key="index" 
                 :to="{ name: route.name }"
                 :class="{ button: route.meta.button }">
      {{ route.name }}
    </router-link>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &.button {
      border: 1px solid $gray;
      padding: 0.5rem 1rem;
      border-radius: 4px;

      &:hover {
        background: $light-gray;
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>
