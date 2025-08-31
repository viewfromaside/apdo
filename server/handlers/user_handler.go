package handlers

import (
	"net/http"
	"time"

	"github.com/apdo/server/models"
	"github.com/apdo/server/models/dto"
	"github.com/apdo/server/services"
	"github.com/apdo/server/utils/crypto"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("some_secret_right_here")

func GetUsers(c *gin.Context) {
	users := services.FindManyUsers()
	c.IndentedJSON(http.StatusOK, users)
}

func RegisterAccount(c *gin.Context) {
	var input models.User

	if err := c.BindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
		return
	}

	hashedPassword, err := crypto.HashPassword(input.Password)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "the password can not be hashed"})
		return
	}

	newUser := models.NewUser()
	newUser.Username = input.Username
	newUser.Email = input.Email
	newUser.Password = hashedPassword

	userFound, _ := services.FindUserByField("Username", input.Username)
	if userFound != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "user already exists with this username"})
		return
	}

	services.CreateUser(newUser)
	newUser.Password = "secret"

	newColor := models.NewColor()
	newColor.UserID = newUser.Username
	services.CreateColor(newColor)

	c.IndentedJSON(http.StatusCreated, newUser)
}

func LoginAccount(c *gin.Context) {
	var input dto.Account

	if err := c.BindJSON(&input); err != nil || input.Username == "" || input.Password == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "is missing password or username"})
		return
	}

	user, err := services.FindUserByField("Username", input.Username)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "account not found"})
		return
	}

	if crypto.VerifyPassword(input.Password, user.Password) {
		claims := jwt.MapClaims{
			"username": input.Username,
			"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(),
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, _ := token.SignedString(jwtSecret)
		user.Password = "secret"
		c.IndentedJSON(http.StatusOK, gin.H{"data": user, "jwt": tokenString})
		return
	}

	c.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "wrong password"})
}

func ActivateAccount(c *gin.Context) {
	id := c.Param("id")
	user, err := services.FindUserByID(id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
		return
	}
	user.Active = true
	services.UpdateUser(*user)
	user.Password = "secret"

	c.IndentedJSON(http.StatusOK, user)
}
