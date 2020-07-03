package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Teams Collections model containes which user is under which user
type Teams struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	LeaderID primitive.ObjectID `bson:"leaderID,omitempty"`
	MemberID primitive.ObjectID `bson:"memberID,omitempty"`
}
