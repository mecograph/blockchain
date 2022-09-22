<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer>
    <p>&copy; {{ year }} MP Blockchain</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  width: 100%;
  max-width: $max-width;
  padding: 2rem 0;
  border-top: 1px solid $gray;
  margin: 2rem auto 0;
  font-size: 0.75rem;
  color: $gray;
  background: white;
  z-index: 3;
  text-align: center;

  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;

    a {
      color: $gray;
      text-decoration: none;

      &:hover {
        color: white;
      }
    }
  }
}
</style>
