# test-pingflow
Ce test consiste à créer 3 mini-projet , 2 back (nodejs et golang) qui se communique via redis pub sub , et un front vue js qui communique avec le back nodejs via socket afin de recupére les informations que l'api go transmet au back node via redis. l'api go recupére la data  via un api externe.


# Guide de lancement du fonctionnement du projet

 1. Le front vuejs envoi un evenement socket à l'api nodejs.
 2. L'api nodejs reçoit le message , et envoie la conf de l'api externe à l'api go via un canal redis.
 3. L'api golang à son tour souscrit à se canal , reçoit la conf puis exécute une requéte GET via un api externe.
 4. L'api golang reçoit la data , le stringify puis stock la data dans un clé redis.
 5. L'api node reçoit la data via ce méme clé redis.
 6. L'api node envoie la au front via socket .
 7. Le front reçoit la data, le stock dans le store de pinia , puis le dispatcher dans differents composants.


 # Bonus1
 1. Création d'un crontab dans mon api-node ,ce crontab se déclenche toutes les 30 secondes.
 2. Ce crontab contacte l'api go via un canal redis afin de recupérer le ping du server redis.
 3. L'api golang recupére le ping du srveur redis , puis le renvoie à l'api-node via un canal  redis.
 4. L'api-node reçoit la data, puis le renvoyer au front via socket.
 5. de ce fait chaque 30 secondes vous verrez un message en haut (un alert) affichant l'etat du serveur redis.

 # Bonus2
 1. Filtrage des produits.
 2. affichage des données en fonction de la catégorie.
 3. édition de la donnée via une formulaire integrée dans un modale.
 4. suppression de la donnée.

