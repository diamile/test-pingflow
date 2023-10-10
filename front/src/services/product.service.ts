import io from 'socket.io-client';
const socket = io('http://localhost:3000'); 
import axios from "axios"

/**
 * @description service qui gére la recupération des produits
 */
export async function fetchAllProductFromService(){
    try{
        socket.on('connect', () => { console.log('Connecté au serveur WebSocket')});
        socket.on('disconnect', () => { console.log('Déconnecté du serveur WebSocket') });
        socket.emit('ok', 'sendata')
        
    } catch(err){
        throw err;
    }
}

/**
 * @description service qui gére la recupération de l'objet socket
 */
export function getSocket(){
    try{
       
     return socket
        
    } catch(err){
        throw err;
    }
}

/**
 * @description service qui gére la modification d'un produit via le titre
 */
export async function updateProductFromService(body){
    try{
        const response = await axios.patch(`https://fakestoreapi.com/products/${body.id}`,{title:body.title});
         return response.data
       } catch(err){
           throw err;
       }
}

/**
 * @description service qui gére la suppression d'un produit
 */
export async function deletedProductFromService(body){
    try{
        const response = await axios.delete(`https://fakestoreapi.com/products/${body.id}`);
         return response.data
       } catch(err){
           throw err;
       }
}

