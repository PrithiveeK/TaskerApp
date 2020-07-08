package routers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/mongo"

	"../models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//GetAllTasks gets all the Tasks from the tasks collection
func GetAllTasks(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	type TaskedUser struct {
		ID           primitive.ObjectID `bson:"_id"`
		Subject      string             `bson:"subject"`
		Description  string             `bson:"description"`
		Status       string             `bson:"status"`
		Priority     int                `bson:"priority"`
		Category     string             `bson:"category"`
		DateCreated  time.Time          `bson:"dateCreated"`
		DateModified time.Time          `bson:"dateModified"`
		StartDate    time.Time          `bson:"startDate"`
		DueDate      time.Time          `bson:"dueDate"`
		ProjectID    primitive.ObjectID `bson:"projectID"`
		Assignee     []struct {
			ID       primitive.ObjectID `bson:"_id"`
			Username string             `bson:"username"`
		} `bson:"assignee"`
	}

	var tasks []TaskedUser

	lookUp := bson.D{{
		Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "users"},
			{Key: "localField", Value: "assigneeID"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "assignee"},
		},
	}}

	taskCursor, err := TasksColl.Aggregate(ctx, mongo.Pipeline{lookUp})
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
	res.Header().Set("Content-Type", "application/json")
	type Respo struct {
		Ok bool
	}
	respo := Respo{
		Ok: false,
	}
	pID, _ := req.URL.Query()["pId"]

	projectID, err := primitive.ObjectIDFromHex(pID[0])
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	type UserTask struct {
		Subject     string `json:"subject"`
		Description string `json:"description"`
		Status      string `json:"status"`
		Priority    string `json:"priority"`
		Category    string `json:"category"`
		StartDate   string `json:"start_date"`
		DueDate     string `json:"due_date"`
		Assignee    string `json:"assignee"`
	}

	userTask := UserTask{}
	json.NewDecoder(req.Body).Decode(&userTask)

	priority, err := strconv.Atoi(userTask.Priority)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	startD, err := time.Parse("2006-01-02T15:04:05.000Z", userTask.StartDate)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}
	dueD, err := time.Parse("2006-01-02T15:04:05.000Z", userTask.DueDate)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}
	assigneeID, err := primitive.ObjectIDFromHex(userTask.Assignee)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	newTask := models.Tasks{
		Subject:      userTask.Subject,
		Description:  userTask.Description,
		Status:       userTask.Status,
		Priority:     priority,
		Category:     userTask.Category,
		DateCreated:  time.Now(),
		DateModified: time.Now(),
		StartDate:    startD,
		DueDate:      dueD,
		AssigneeID:   assigneeID,
		ProjectID:    projectID,
	}

	_, err = TasksColl.InsertOne(ctx, newTask)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}
	respo.Ok = true
	json.NewEncoder(res).Encode(&respo)

}

//UpdateTask updates the task
func UpdateTask(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	type Respo struct {
		Ok bool
	}
	respo := Respo{
		Ok: false,
	}
	tID, _ := req.URL.Query()["tId"]

	taskID, err := primitive.ObjectIDFromHex(tID[0])
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	type UserTask struct {
		Subject     string `json:"subject"`
		Description string `json:"description"`
		Status      string `json:"status"`
		Priority    string `json:"priority"`
		Category    string `json:"category"`
		StartDate   string `json:"start_date"`
		DueDate     string `json:"due_date"`
		Assignee    struct {
			ID       string `json:"ID"`
			Username string `json:"Username"`
		} `json:"assignee"`
	}

	userTask := UserTask{}
	json.NewDecoder(req.Body).Decode(&userTask)

	priority, err := strconv.Atoi(userTask.Priority)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	startD, err := time.Parse("2006-01-02T15:04:05.000Z", userTask.StartDate)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	dueD, err := time.Parse("2006-01-02T15:04:05.000Z", userTask.DueDate)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	assigneeID, err := primitive.ObjectIDFromHex(userTask.Assignee.ID)
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}

	_, err = TasksColl.UpdateOne(ctx, bson.M{"_id": taskID}, bson.D{{
		Key: "$set", Value: bson.D{
			{Key: "subject", Value: userTask.Subject},
			{Key: "description", Value: userTask.Description},
			{Key: "status", Value: userTask.Status},
			{Key: "priority", Value: priority},
			{Key: "category", Value: userTask.Category},
			{Key: "startDate", Value: startD},
			{Key: "dueDate", Value: dueD},
			{Key: "assigneeID", Value: assigneeID},
			{Key: "dateModified", Value: time.Now()},
		}},
	})
	if err != nil {
		json.NewEncoder(res).Encode(&respo)
		return
	}
	respo.Ok = true
	json.NewEncoder(res).Encode(&respo)

}

//GetTaskStatusCount gives the  count of all statuses count
func GetTaskStatusCount(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-type", "application/json")
	type Result struct {
		ID    string `bson:"_id"`
		Count int    `bson:"count"`
	}
	result := []Result{{"0", 0}}
	pID, _ := req.URL.Query()["pId"]

	projectID, err := primitive.ObjectIDFromHex(pID[0])
	if err != nil {
		json.NewEncoder(res).Encode(&result)
		return
	}

	matchWith := bson.D{{
		Key: "$match", Value: bson.D{
			{Key: "projectID", Value: projectID},
		},
	}}
	groupBy := bson.D{{
		Key: "$group", Value: bson.D{
			{Key: "_id", Value: "$status"},
			{Key: "count", Value: bson.D{
				{Key: "$sum", Value: 1},
			}},
		},
	}}

	resultCursor, err := TasksColl.Aggregate(ctx, mongo.Pipeline{matchWith, groupBy})
	if err != nil {
		json.NewEncoder(res).Encode(&result)
		return
	}
	if err = resultCursor.All(ctx, &result); err != nil {
		json.NewEncoder(res).Encode(&result)
		return
	}

	json.NewEncoder(res).Encode(&result)

}
