package routers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"../models"
	"go.mongodb.org/mongo-driver/bson"
)

//GetAllTasks gets all the Tasks from the tasks collection
func GetAllTasks(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var tasks []models.Tasks

	taskCursor, err := TasksColl.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	if err = taskCursor.All(ctx, &tasks); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(res).Encode(&tasks)
}

//AddTaskForProject creates a new tasks to the given project
func AddTaskForProject(res http.ResponseWriter, req *http.Request) {

	userID, err := primitive.ObjectIDFromHex(req.Header.Get("client"))
	if err != nil {
		log.Fatal(err)
	}

	projectID, err := primitive.ObjectIDFromHex(req.Header.Get("project-id"))
	if err != nil {
		log.Fatal(err)
	}

	req.ParseForm()
	priority, err := strconv.Atoi(req.FormValue("priority"))
	if err != nil {
		log.Fatal(err)
	}
	newTask := models.Tasks{
		Subject:      req.FormValue("subject"),
		Description:  req.FormValue("description"),
		Status:       "Open",
		Priority:     priority,
		Category:     req.FormValue("category"),
		DateCreated:  time.Now(),
		DateModified: time.Now(),
		StartDate:    time.Now(),
		DueDate:      time.Now(),
		AssigneeID:   userID,
		ProjectID:    projectID,
	}

	_, err = TasksColl.InsertOne(ctx, newTask)
	if err != nil {
		log.Fatal(err)
	}

}
