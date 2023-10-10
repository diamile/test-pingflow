const cron = require('node-cron');


 function initCronTab(redisClient,client){
  // Tâche à exécuter toutes les 30 secondes
  const data= {
    service:'crontab',
    status:'ok'
  }
    cron.schedule('*/30 * * * * *', () => {
        console.log('Cette tâche s\'exécute toutes les 30 secondes.');

        redisClient.publish("crontab_channel", JSON.stringify(data), (error, count) => {
            if (error) {
                console.error('Erreur lors de la publication du message :', error);
             } else {
                console.log(`Message publié avec succès ! Nombre d'abonnés : ${count}`);
                client.subscribe('new_crontab_channel'); 

                // Événement lorsque des données sont reçues sur le canal
                client.on('message', (channel, message) => {
                console.log(`Message reçuess du canal '${channel}': ${message}`)
                });

            }
        })
        
    });
}

exports.initCronTab=initCronTab

