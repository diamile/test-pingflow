<script setup lang="ts">
import Product from '../components/Product.vue'
import {onMounted} from "vue"
import {useProductStore} from "@/stores/product.store"
const store = useProductStore();
import {getSocket}  from "../services/product.service"

onMounted(()=>{
  store.fetchAllProducts()
  const socket = getSocket();
  socket.on('redis-status', (data) => {
    store.getRedisServerStatus(data)
          
  });
})
</script>

<template>
  <main>
    <Product />
  </main>
</template>
