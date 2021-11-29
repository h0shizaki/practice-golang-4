package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Message struct {
	ERR   bool   `json:"error"`
	Text  string `json:"message"`
	Isrun bool   `json:"isRun"`
}

func checkStatus(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	var message Message
	message.ERR = false
	message.Isrun = true
	message.Text = "Hello GO-LANG"
	json.NewEncoder(res).Encode(message)
}

func main() {
	log.Println("Start server")

	router := mux.NewRouter()

	router.HandleFunc("/status", checkStatus).Methods("GET")

	port := ":3030"
	log.Println("Server is running on port", port)
	http.ListenAndServe(port, router)
}
