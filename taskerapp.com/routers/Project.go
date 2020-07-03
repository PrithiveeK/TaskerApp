package routers

import (
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/gorilla/mux"

	"../models"
	"go.mongodb.org/mongo-driver/bson"
)

//GetAllProjects gets all the projects from the project collections
func GetAllProjects(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var projects []models.Projects

	projectCursor, err := ProjectsColl.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = projectCursor.All(ctx, &projects); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(res).Encode(&projects)

}

//GetProject gets info about the project from the project collections
func GetProject(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var project models.Projects

	params := mux.Vars(req)
	productID, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		log.Fatal(err)
	}
	if err = ProjectsColl.FindOne(ctx, &models.Projects{ID: productID}).Decode(&project); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(res).Encode(&project)

}
