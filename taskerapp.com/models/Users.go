package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Users Collections model
type Users struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	UserName string             `bson:"username,omitempty"`
	Email    string             `bson:"email,omitempty"`
	Password string             `bson:"password,omitempty"`
}
