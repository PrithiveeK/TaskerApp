package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//Client contains the db connection
var Client *mongo.Client

//Ctx contains timeout configuration
var Ctx context.Context

var err error

//DBConnection function connects to the database and returns the client
func DBConnection() {
	Ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	Client, err = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	if err = Client.Connect(Ctx); err != nil {
		log.Fatal(err)
	}
}
