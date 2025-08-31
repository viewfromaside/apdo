package handlers

import (
	"net/http"

	"github.com/apdo/server/models"
	"github.com/apdo/server/services"
	"github.com/gin-gonic/gin"
)

func PostColors(c *gin.Context) {
	var input models.Color

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to request, contact support"})
		return
	}

	if input.AccentColor == "" || input.BackgroundColor == "" || input.NeutralColor == "" || input.UserID == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "missing fields"})
		return
	}

	newColor := models.NewColor()
	newColor.AccentColor = input.AccentColor
	newColor.BackgroundColor = input.BackgroundColor
	newColor.NeutralColor = input.NeutralColor
	newColor.UserID = input.UserID

	services.CreateColor(newColor)
	c.IndentedJSON(http.StatusCreated, newColor)
}

func GetColorByUserId(c *gin.Context) {
	id := c.Param("id")
	color, err := services.FindColorByField("UserID", id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, color)
}

func UpdateColorById(c *gin.Context) {
	id := c.Param("id")
	var input models.Color

	if err := c.BindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
		return
	}

	input.ID = id

	err := services.UpdateColor(input)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "internal server error contact support"})
		return
	}

	c.IndentedJSON(http.StatusOK, input)
}
