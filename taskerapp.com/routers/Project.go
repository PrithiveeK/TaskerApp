package routers

import (
	"encoding/json"
	"log"
	"net/http"

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

	defer projectCursor.Close(ctx)
	json.NewEncoder(res).Encode(&projects)

}
