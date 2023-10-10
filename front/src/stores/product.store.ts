import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllProductFromService,getSocket,updateProductFromService,deletedProductFromService} from '@/services/product.service';


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
          const response = (JSON.parse(data))
           this.products= JSON.parse(response)
      });
      }catch(err){
        console.log('Error',err)
      }
    },

    async updateProduct(body){
      try{
        const response = await updateProductFromService(body);
       
        const productUpdate = this.products.map((item)=>{
           if(item.id == body.id){
              item.title = body.title
           }

           return item
        });
        this.products = productUpdate

        return  true

      }catch(err){
        console.log(err)
      }
    },

    async deletedProduct(body){
      try{
        const response = await deletedProductFromService(body);
        const productDeleted = this.products.filter((item)=>item.id != body.id)
        this.products = productDeleted
        
      }catch(err){
        console.log(err)
      }
    }
    
    },
})
  