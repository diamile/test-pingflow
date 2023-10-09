<script setup lang="ts">
import Product from '../components/Product.vue'
import {onMounted} from "vue"
import {useProductStore} from "@/stores/product.store"
const store = useProductStore();

onMounted(()=>{
  store.fetchAllProducts()
})
</script>

<template>
  <main>
    <Product />
  </main>
</template>
