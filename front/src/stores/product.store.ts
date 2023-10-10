import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {fetchAllProductFromService,getSocket,updateProductFromService,deletedProductFromService} from '@/services/product.service';


export const useProductStore = defineStore('productStore',  {
    state:()=>({
      products:[],
      redisInfo:{}
    }),
    getters:{
      getProducts(state){
        return state.products
      },

    },
  actions:{

  /**
   * @description action qui gére la recupération de tous les data via le socket de l'api-node
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

    /**
     * @description action qui gére la modification du produit via le titre
     * @param {*}  
     * @returns  Promise
     */

    async updateProduct(body){
      try{
        await updateProductFromService(body);
       
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

    /**
     * @description action qui gére la suppression d'une produit via son identifiant
     * @param {*}  
     * @returns  Promise
     */
    async deletedProduct(body){
      try{
        await deletedProductFromService(body);
        const productDeleted = this.products.filter((item)=>item.id != body.id)
        this.products = productDeleted
        
      }catch(err){
        console.log(err)
      }
    },

    /**
     * @description action qui recupére le status du  serveur redis via socket
     * @param {*}  
     * @returns  Promise
     */
    async getRedisServerStatus(info:any){
      try{
        const data = {
          server:'redis',
          status:info,
          display:true
        }
        this.redisInfo = data

        setTimeout(()=>{
         this.redisInfo.display=false
         this.redisInfo = this.redisInfo
        },5000)
      }catch(err){
        console.log('err',err)
      }
    }
   
    },
})
  