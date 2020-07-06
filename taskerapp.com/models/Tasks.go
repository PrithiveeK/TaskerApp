package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Tasks Collections model
type Tasks struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Subject     string             `bson:"subject,omitempty"`
	Description string             `bson:"description"`
	Status      string             `bson:"status,omitempty"`
	Priority    int                `bson:"priority"`
	Category    string             `bson:"category"`
	DateCreated time.Time          `bson:"dateCreated"`
	DateModified time.Time          `bson:"dateModified"`
	StartDate   time.Time          `bson:"startDate"`
	DueDate     time.Time          `bson:"dueDate"`
	AssigneeID  primitive.ObjectID `bson:"assigneeID"`
	ProjectID   primitive.ObjectID `bson:"projectID"`
}
