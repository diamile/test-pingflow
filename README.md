# test-pingflow
Ce test consiste à créer 3 mini-projet , 2 back (nodejs et golang) qui se communique via redis pub sub , et un front vue js qui communique avec le back nodejs via socket afin de recupére les informations que l'api go transmet au back node via redis. l'api go recupére la data  via un api externe.


# Guide de lancement du projet

Ce guide explique comment lancer le projet composé de trois parties : une API en Golang, une API en Node.js, et un front-end en Vue.js.

## API Golang

1. Allez dans le répertoire de l'API Golang :  cd /api-golang 

2. Exécutez le serveur Golang en utilisant la commande suivante : go run main.go



## API Node.js

1. Allez dans le répertoire de l'API Node.js : cd /api-node

2. Installez les dépendances en exécutant la commande : npm install

3. Démarrez le serveur Node.js avec la commande : npm run dev


## Front-end

1. Allez dans le répertoire du front-end en Vue.js : cd /front

2. Installez les dépendances en exécutant la commande : npm install


3. Lancez l'application front-end en mode de développement avec la commande : npm run dev

## NB
il peut arriver lors du lancement du projet que le back node nous renvoie
un message d'erreur comme quoi que la clé redis n'existe , c'est normal il suffit juste d'attendre
que le serveur go se lance complétement puis redemarrer le serveur node (ctrl+s)








