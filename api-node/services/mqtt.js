const mqtt = require('mqtt');

function initMqttServer(){
  

    // URL du broker MQTT
    const brokerUrl = 'mqtt://broker.hivemq.com';
    
    // Identifiant du client
    const clientId = 'mon_client_mqtt'; // Changez ceci en fonction de votre besoin
    
    // Créer un client MQTT
    const client = mqtt.connect(brokerUrl, {
      clientId: clientId,
      clean: true, // Cette option permet de nettoyer la session à la déconnexion
    });
    
    // Gérer la connexion
    client.on('connect', () => {
      console.log('Connecté au broker MQTT');
      
      // Abonnez-vous à un sujet
      const topic = 'sujet/test'; // Remplacez ceci par le sujet auquel vous voulez vous abonner
      // client.subscribe(topic, (err) => {
      //   if (!err) {
      //     console.log(`Abonné au sujet ${topic}`);
      //   } else {
      //     console.error('Erreur lors de l\'abonnement au sujet', err);
      //   }
      // });
    });
    
    // Gérer les messages reçus
    client.on('message', (topic, message) => {
      console.log(`Message reçu sur le sujet ${topic}: ${message.toString()}`);
    });
    
    // Gérer les erreurs
    client.on('error', (error) => {
      console.error('Erreur de connexion au broker MQTT', error);
    });
    
    // Gérer la déconnexion
    client.on('close', () => {
      console.log('Déconnecté du broker MQTT');
    });
    
    // Exemple de publication de message
    const message = 'Hello, MQTT!'; // Le message que vous voulez publier
    const publishTopic = 'sujet/test'; // Le sujet sur lequel vous voulez publier
    
    client.publish(publishTopic, message, (err) => {
      if (!err) {
        console.log(`Message publié sur le sujet ${publishTopic}: ${message}`);
      } else {
        console.error('Erreur lors de la publication du message', err);
      }
    });
    
    // Pour vous déconnecter proprement lorsque vous avez terminé
    // client.end();
    
}

exports.initMqttServer=initMqttServer

