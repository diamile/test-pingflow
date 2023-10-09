package main

import (
	"fmt"
	"net/http"
)

func main() {
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
