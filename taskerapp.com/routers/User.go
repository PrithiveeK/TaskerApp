package routers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"

	"../models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(pwd string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)
	if err != nil {
		log.Fatal(err)
	}
	return string(hash)
}

func checkPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

//CreateUserAccount create a user account
func CreateUserAccount(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	type Response struct {
		ID, Message string
	}
	response := Response{
		ID:      "",
		Message: "Account already Exists!",
	}
	type UserInfo struct {
		Username string `json:"username"`
		Email    string `json:"useremail"`
		Password string `json:"password"`
	}
	var userInfo UserInfo
	json.NewDecoder(req.Body).Decode(&userInfo)

	newUser := models.Users{
		UserName: userInfo.Username,
		Email:    userInfo.Email,
		Password: hashPassword(userInfo.Password),
	}

	user, err := UsersColl.InsertOne(ctx, newUser)
	if err != nil {
		json.NewEncoder(res).Encode(&response)
		return
	}
	if oid, ok := user.InsertedID.(primitive.ObjectID); ok {
		json.NewEncoder(res).Encode(map[string]interface{}{
			"ID": oid.Hex(),
		})
	} else {
		json.NewEncoder(res).Encode(&response)
	}
}

//LogIntoUser logs into tasker app
func LogIntoUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	type Response struct {
		ID, Message string
	}
	response := Response{
		ID:      "",
		Message: "Invalid Email OR Password",
	}
	type UserInfo struct {
		Email    string `json:"useremail"`
		Password string `json:"password"`
	}
	userInfo := UserInfo{}

	json.NewDecoder(req.Body).Decode(&userInfo)

	var user models.Users

	if err := UsersColl.FindOne(ctx, &models.Users{Email: userInfo.Email}).Decode(&user); err != nil {
		json.NewEncoder(res).Encode(&response)
		return
	}

	result := checkPasswordHash(userInfo.Password, user.Password)

	if result {
		json.NewEncoder(res).Encode(map[string]interface{}{
			"ID": user.ID.Hex(),
		})
	} else {
		json.NewEncoder(res).Encode(&response)
	}
}

//GetTeamMembers gets the team members for the user
func GetTeamMembers(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	clientID, _ := req.URL.Query()["cId"]
	userID, err := primitive.ObjectIDFromHex(clientID[0])
	if err != nil {
		log.Fatal(err)
	}
	type TeamMem struct {
		MemberData []struct {
			ID       primitive.ObjectID `bson:"_id"`
			Username string             `bson:"username"`
		} `bson:"memberData"`
	}
	var teamMembers []TeamMem
	matchWith := bson.D{{Key: "$match", Value: bson.D{{Key: "leaderID", Value: userID}}}}
	groupBy := bson.D{{
		Key: "$group", Value: bson.D{
			{Key: "_id", Value: "$leaderID"},
			{Key: "members", Value: bson.D{
				{Key: "$push", Value: "$memberID"},
			}},
		},
	}}

	lookUp := bson.D{{
		Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "users"},
			{Key: "localField", Value: "members"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "memberData"},
		},
	}}

	teamMemberCursor, err := TeamsColl.Aggregate(ctx, mongo.Pipeline{matchWith, groupBy, lookUp})
	if err != nil {
		fmt.Println("1")
		fmt.Println(err)
		return
	}

	if err = teamMemberCursor.All(ctx, &teamMembers); err != nil {
		fmt.Println("2")
		fmt.Println(err)
		return
	}

	defer teamMemberCursor.Close(ctx)
	json.NewEncoder(res).Encode(teamMembers)

}

//GetAllUsers gets all the users from the Users collection
func GetAllUsers(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	var users []models.Users

	userCursor, err := UsersColl.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	if err = userCursor.All(ctx, &users); err != nil {
		log.Fatal(err)
	}

	defer userCursor.Close(ctx)
	json.NewEncoder(res).Encode(users)

}
