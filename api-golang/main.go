package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/go-redis/redis"
)

func main() {
	go StartRedisServer()

	go listenCrontab()

	http.HandleFunc("/", home)

	startserver()

}

// création de mon serveur golang
func startserver() {

	port := 8080
	fmt.Printf("Le serveur écoute sur le port %d...\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Println(err)
	}

}

// controller qui intercepte et recupére la data dans la requéte
func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenue sur go")
}

// fonction qui initialise le serveur redis
func StartRedisServer() {

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// Créez un pubsub et abonnement au canal
	pubsub := client.Subscribe("dsarr_channel")

	type Message struct {
		URL     string `json:"url"`
		Channel string `json:"channel"`
	}

	// boucle infinie qui permet d'écouter tous les messages entrantes dans la canal
	for msg := range pubsub.Channel() {
		fmt.Printf("Message reçu sur le canal %s: %s\n", msg.Channel, msg.Payload)
		var message Message
		err := json.Unmarshal([]byte(msg.Payload), &message)

		if err != nil {
			fmt.Println("Erreur de décodage JSON:", err)
			continue
		}

		url := message.URL

		response, err := http.Get(url)
		if err != nil {
			log.Fatal(err)
			return
		}
		defer response.Body.Close()

		// Lire la réponse JSON
		body, err := ioutil.ReadAll(response.Body)
		if err != nil {
			log.Fatal(err)
			return
		}

		// Afficher la réponse JSON dans la console (log)

		key := "dataKey"
		err = client.Set(key, string(body), time.Minute).Err()
		if err != nil {
			fmt.Println("Erreur de décodage JSON")
			log.Fatal(err)
		}

		keys, err := client.Keys("*").Result()
		if err != nil {
			fmt.Println("Erreur lors de la récupération des clés:", err)
			return
		}

		// Parcourez et affichez les clés
		for _, key := range keys {
			fmt.Println("Clé Redis:", key)
		}

	}

}

// fonction qui gére l'ecoute et les instructions du crontab
func listenCrontab() {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	pubsub := client.Subscribe("crontab_channel")

	type Data struct {
		service string
		status  string
	}

	for msg := range pubsub.Channel() {
		fmt.Printf("Message reçu sur le canal %s: %s\n", msg.Channel, msg.Payload)
		var info Data
		err := json.Unmarshal([]byte(msg.Payload), &info)

		if err != nil {
			fmt.Println("Erreur de décodage JSON:", err)
			continue
		}

		pong, err := client.Ping().Result()
		if err != nil {
			fmt.Println("Erreur de connexion à Redis:", err)
			return
		}
		fmt.Println("Connexion à Redis réussie:", pong)

		//verification de l'état du serveur redis
		if pong == "PONG" {
			if err := client.Publish("new_crontab_channel", "ok").Err(); err != nil {
				client.Publish("new_crontab_channel", "ko").Err()
				log.Println("Erreur lors de la republication du message:", err)
			} else {
				fmt.Printf("Message republié sur le canal '%s'\n", "new_crontab_channel")
			}
		}
	}

}
