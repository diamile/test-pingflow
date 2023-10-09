import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllProductFromService,getSocket} from '@/services/product.service';


export const useProductStore = defineStore('productStore',  {
  state:()=>({
     products:[]
  }),
  getters:{
    getProducts(state){
      return state.products
    },

  },
  actions:{

    /**
     * @description action qui gére la recupération de tous les data
     * @param {*}  
     * @returns  Promise
     */
    async fetchAllProducts() {
      try{
        await fetchAllProductFromService()
        const socket = await getSocket();

        socket.on('message', (data) => {
          console.log('data', (JSON.parse(data)))
           this.products= data
      });
      }catch(err){
        console.log('Error',err)
      }
    },
    
    },
})
  