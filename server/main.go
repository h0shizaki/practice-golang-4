package main

import "net/http"

func CheckStatus(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("Hi\n"))
}

func main() {
	http.HandleFunc("/api/status", CheckStatus)
	http.ListenAndServe(":2020", nil)
}
