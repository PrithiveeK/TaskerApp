package routers

import (
	"context"
	"log"
	"net/http"

	"github.com/rs/cors"

	"../config"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client
var ctx context.Context
var taskerApp *mongo.Database

//ProjectsColl in not  exported and contains projects collection
var ProjectsColl *mongo.Collection

//TasksColl in not  exported and contains tasks collection
var TasksColl *mongo.Collection

//TeamsColl in not  exported and contains teams collection
var TeamsColl *mongo.Collection

//UsersColl in not  exported and contains users collection
var UsersColl *mongo.Collection

//CreateServer creates a port that listens to the web requests
func CreateServer() {
	client = config.Client
	ctx = config.Ctx

	taskerDB := client.Database("taskerapp")

	ProjectsColl = taskerDB.Collection("projects")
	TasksColl = taskerDB.Collection("tasks")
	TeamsColl = taskerDB.Collection("teams")
	UsersColl = taskerDB.Collection("users")

	router := mux.NewRouter()
	routerCors := cors.Default().Handler(router)

	router.HandleFunc("/api", func(res http.ResponseWriter, req *http.Request) {
		res.Write([]byte("hi"))
	})
	router.HandleFunc("/api/project/all", GetAllProjects).Methods("GET")
	router.HandleFunc("/api/project/{id}", GetProject).Methods("GET")
	router.HandleFunc("/api/task/all", GetAllTasks).Methods("GET")
	router.HandleFunc("/api/task/add", AddTaskForProject).Methods("POST")
	router.HandleFunc("/api/user/all", GetAllUsers).Methods("GET")
	router.HandleFunc("/api/user/signup", CreateUserAccount).Methods("POST")
	router.HandleFunc("/api/user/login", LogIntoUser).Methods("POST")
	router.HandleFunc("/api/team", GetTeamMembers).Methods("GET")

	log.Fatal(http.ListenAndServe(":5000", routerCors))
}
