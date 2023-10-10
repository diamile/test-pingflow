const Redis = require("ioredis");
const config = require('dotenv').config().parsed

 const redisClient = new Redis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
});

//publication de la conf de l'api externe via un channel redis
function publishConfData(data){
    redisClient.publish(data.channel, JSON.stringify(data), (error, count) => {
        if (error) {
            console.error('Erreur lors de la publication du message :', error);
         } else {
            console.log(`Message publié avec succès ! Nombre d'abonnés : ${count}`);
        }
    })
}

//fonction qui gére la recupération des produits via un clé redis
function receiveRedisDataFromKey(io){
    redisClient.get(config.REDIS_KEY)
    .then(res => {
        if (res) {
        const response = JSON.parse(res);
        console.log('response',response);
        io.on('connection', (socket) => {
            console.log('Un client s\'est connecté');
        
            socket.on('ok', (data) => {
            console.log('Message reçu du client :', data);
            
            const response =JSON.stringify(res)
            socket.emit('message', response);
            
            })
        
        });
    } else {
    console.log(`La clé "${config.REDIS_KEY}" n'existe pas dans Redis.`);
    }
})
.catch(error => {
    console.error('Erreur lors de la récupération des données depuis Redis:', error);
})
}

exports.publishConfData = publishConfData;
exports.receiveRedisDataFromKey=receiveRedisDataFromKey



