import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
      
      }catch(err){
        console.log('Error',err)
      }
    },
    
    },
})
  