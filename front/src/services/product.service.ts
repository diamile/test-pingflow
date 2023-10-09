import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // Remplacez par l'URL de votre serveur Node.js

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