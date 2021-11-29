package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

type Player struct {
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name  string             `json:"name,omitempty" bson:"name,omitempty"`
	Level int                `json:"level,omitempty" bson:"level,omitempty"`
	Rank  string             `json:"rank,omitempty" bson:"rank,omitempty"`
}

func checkStatus(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	res.Write([]byte(` {"message": "Hello GO" , "error": false , "isRunning":true } `))

}

func addPlayer(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	var player Player

	_ = json.NewDecoder(req.Body).Decode(&player)

	collection := client.Database("mydb").Collection("player")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, err := collection.InsertOne(ctx, player)

	if err != nil {
		log.Print("ERROR")
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message" : "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(res).Encode(result)

}

func getAllPlayer(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	var playerList []Player

	collection := client.Database("mydb").Collection("player")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		log.Print("ERROR")
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message" : "` + err.Error() + `"}`))
		return
	}

	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var player Player
		cursor.Decode(&player)
		playerList = append(playerList, player)
	}

	if err := cursor.Err(); err != nil {
		log.Print("ERROR")
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte(`{"message" : "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(res).Encode(playerList)

}

func main() {
	log.Println("Start server")

	router := mux.NewRouter()

	//conecct to database
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))

	//route
	router.HandleFunc("/status", checkStatus).Methods("GET")
	router.HandleFunc("/player", getAllPlayer).Methods("GET")
	router.HandleFunc("/player/add", addPlayer).Methods("POST")

	port := ":3030"
	log.Println("Server is running on port", port)
	http.ListenAndServe(port, router)
}
