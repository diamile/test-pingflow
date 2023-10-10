
/**
* @description fonction qui gére l'affichage de la couleur de la category
 * @param {*}  
* @returns  Promise
*/

export function getColorFromCategory(category:string){
    switch(category){
      case "men's clothing": 
         return {color:'primary',value:"men's clothing"};
      case "electronics": 
         return  {color:'warning',value:"electronics"};
      case "women's clothing": 
         return  {color:'success',value:"women's clothing"};
      
      default:
        return {color:'secondary',value:category}
    }
  }