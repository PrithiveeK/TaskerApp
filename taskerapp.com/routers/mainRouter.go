package routers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/handlers"

	"../config"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client
var ctx context.Context

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

	defer client.Disconnect(ctx)

	ProjectsColl = taskerDB.Collection("projects")
	TasksColl = taskerDB.Collection("tasks")
	TeamsColl = taskerDB.Collection("teams")
	UsersColl = taskerDB.Collection("users")

	router := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"Content-Type"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})
	methods := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	router.HandleFunc("/api", func(res http.ResponseWriter, req *http.Request) {
		if _, err := TasksColl.UpdateMany(ctx, bson.M{"status": "Open", "startDate": bson.M{"$lte": time.Now()}}, bson.D{{
			Key: "$set", Value: bson.D{
				{Key: "status", Value: "In Progress"},
			},
		}}); err != nil {
			return
		}
		if _, err := TasksColl.UpdateMany(ctx, bson.M{"status": "In Progress", "dueDate": bson.M{"$lte": time.Now()}}, bson.D{{
			Key: "$set", Value: bson.D{
				{Key: "status", Value: "Closed"},
			},
		}}); err != nil {
			return
		}
		res.Write([]byte("HI"))
	})
	router.HandleFunc("/api/project/all", GetAllProjects).Methods("GET")
	router.HandleFunc("/api/task/all", GetAllTasks).Methods("GET")
	router.HandleFunc("/api/task/add", AddTaskForProject).Methods("POST")
	router.HandleFunc("/api/task/status", GetTaskStatusCount).Methods("GET")
	router.HandleFunc("/api/user/all", GetAllUsers).Methods("GET")
	router.HandleFunc("/api/task/update", UpdateTask).Methods("PUT")
	router.HandleFunc("/api/user/signup", CreateUserAccount).Methods("POST")
	router.HandleFunc("/api/user/login", LogIntoUser).Methods("POST")
	router.HandleFunc("/api/team", GetTeamMembers).Methods("GET")

	log.Fatal(http.ListenAndServe(":5000", handlers.CORS(headers, origins, methods)(router)))
}
