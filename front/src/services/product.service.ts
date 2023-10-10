import io from 'socket.io-client';
const socket = io('http://localhost:3000'); 
import axios from "axios"

export async function fetchAllProductFromService(){
    try{
       let response:any = [];
        socket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
           
        });
        
        socket.on('disconnect', () => {
            console.log('Déconnecté du serveur WebSocket');
        });

        socket.emit('ok', 'sendata')
        
    } catch(err){
        throw err;
    }
}

export function getSocket(){
    try{
       
     return socket
        
    } catch(err){
        throw err;
    }
}

export async function updateProductFromService(body){
    try{

        const response = await axios.patch(`https://fakestoreapi.com/products/${body.id}`,{title:body.title});
         return response.data
       } catch(err){
           throw err;
       }
}

export async function deletedProductFromService(body){
    try{

        const response = await axios.delete(`https://fakestoreapi.com/products/${body.id}`);
         return response.data
       } catch(err){
           throw err;
       }
}

