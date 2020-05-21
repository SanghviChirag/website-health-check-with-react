package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func helloWorld(w http.ResponseWriter, r *http.Request) {
	resJSON := map[string]string{
		"status": "Success",
	}
	jsonBytes, err := json.Marshal(resJSON)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", helloWorld).Methods("GET", "OPTIONS")
	myRouter.HandleFunc("/register", registerWebsite).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/websites", getAllWebsiteInfo).Methods("GET", "OPTIONS")
	myRouter.HandleFunc("/website/{id}", getWebsite).Methods("GET", "OPTIONS")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(myRouter)

	log.Fatal(http.ListenAndServe(":8080", handler))
	// log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main() {
	InitialMigration()
	handleRequests()
}
