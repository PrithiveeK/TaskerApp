package routers

import (
	"encoding/json"
	"log"
	"net/http"

	"../models"
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

	req.ParseForm()

	newUser := models.Users{
		UserName: req.FormValue("username"),
		Email:    req.FormValue("useremail"),
		Password: hashPassword(req.FormValue("password")),
	}

	user, err := UsersColl.InsertOne(ctx, newUser)
	if err != nil {
		log.Fatal(err)
	}
	if oid, ok := user.InsertedID.(primitive.ObjectID); ok {
		json.NewEncoder(res).Encode(map[string]interface{}{
			"id": oid.Hex(),
		})
	}
}

//LogIntoUser logs into tasker app
func LogIntoUser(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/text")

	req.ParseForm()

	var user models.Users

	if err := UsersColl.FindOne(ctx, &models.Users{Email: req.FormValue("useremail")}).Decode(&user); err != nil {
		log.Fatal(err)
	}

	result := checkPasswordHash(req.FormValue("password"), user.Password)

	if result {
		json.NewEncoder(res).Encode(map[string]interface{}{
			"id": user.ID.Hex(),
		})
	}
}

//GetTeamMembers gets the team members for the user
func GetTeamMembers(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")

	userID, err := primitive.ObjectIDFromHex(req.Header.Get("client"))
	if err != nil {
		log.Fatal(err)
	}

	var teamMembers []models.Teams

	teamMemberCursor, err := TeamsColl.Find(ctx, &models.Users{ID: userID})
	if err != nil {
		log.Fatal(err)
	}

	if err = teamMemberCursor.All(ctx, &teamMembers); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(res).Encode(teamMembers)

}
