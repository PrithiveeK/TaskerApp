package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Projects Collections model
type Projects struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty"`
	DateCreated time.Time          `bson:"dateCreated,omitempty"`
}
