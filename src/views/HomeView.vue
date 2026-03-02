<template>
  <div>
    <h1>Product list</h1>

    <div v-if="loading">
      Loading…
    </div>

    <div v-else-if="error">
      Error: {{ error }}
    </div>

    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useProducts from '@/composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})
</script>

<style>
/* ...existing styles if any... */
</style>