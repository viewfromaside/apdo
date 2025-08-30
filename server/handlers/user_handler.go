package handlers

import (
	"net/http"
	"time"

	"github.com/apdo/server/models"
	"github.com/apdo/server/models/dto"
	"github.com/apdo/server/utils"
	"github.com/apdo/server/utils/crypto"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("some_secret_right_here")

var users = []models.User{
	{ID: utils.GenerateID(7), Username: "side", Password: "123", Email: "alex@gmail.com", CreatedAt: time.Now()},
}

func GetUsers(c *gin.Context) {
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

	users = append(users, newUser)

	c.IndentedJSON(http.StatusCreated, newUser)
}

func LoginAccount(c *gin.Context) {
	var input dto.Account

	if err := c.BindJSON(&input); err != nil || input.Username == "" || input.Password == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "is missing password or username"})
		return
	}

	for _, user := range users {
		if user.Username == input.Username {
			if crypto.VerifyPassword(input.Password, user.Password) {
				claims := jwt.MapClaims{
					"username": input.Username,
					"exp":      time.Now().Add(time.Hour * 24 * 7).Unix(),
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
				tokenString, _ := token.SignedString(jwtSecret)
				c.IndentedJSON(http.StatusOK, gin.H{"data": user, "jwt": tokenString})
				return
			}
			c.IndentedJSON(http.StatusUnauthorized, gin.H{"error": "wrong password"})
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "account not found"})
}
