const Redis = require("ioredis");
const config = require('dotenv').config().parsed
 const redisClient = new Redis({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
});


function publishConfData(data){
    redisClient.publish(data.channel, JSON.stringify(data), (error, count) => {
        if (error) {
            console.error('Erreur lors de la publication du message :', error);
         } else {
            console.log(`Message publié avec succès ! Nombre d'abonnés : ${count}`);
        }
    })
}

exports.publishConfData = publishConfData;



