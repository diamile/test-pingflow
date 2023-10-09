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
	http.HandleFunc("/", home)

	startserver()

}

func startserver() {

	port := 8080
	fmt.Printf("Le serveur écoute sur le port %d...\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		fmt.Println(err)
	}

}

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Bienvenue sur go")
}

func StartRedisServer() {

	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// Créez un pubsub et abonnez-vous au canal
	pubsub := client.Subscribe("dsarr_channel")

	type Message struct {
		URL     string `json:"url"`
		Channel string `json:"channel"`
	}

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

		key := "dataKeys"
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
