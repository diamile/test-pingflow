const Redis = require("ioredis");
 const redisClient = new Redis({
        host: "localhost",
        port: 6379,
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



