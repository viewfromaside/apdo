package handlers

import (
	"net/http"

	"github.com/apdo/server/models"
	"github.com/apdo/server/services"
	"github.com/apdo/server/utils"
	"github.com/gin-gonic/gin"
)

var availableVisibility = []models.NoteVisibility{models.PUBLIC, models.PRIVATE}

func GetNotes(c *gin.Context) {
	notes, _ := services.FindManyNotes()
	c.IndentedJSON(http.StatusOK, notes)
}

func PostNotes(c *gin.Context) {
	var input models.Note

	if err := c.BindJSON(&input); err != nil || input.Content == "" || input.Title == "" || input.CreatedBy == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to request, contact support"})
		return
	}

	newNote := models.NewNote()
	newNote.Title = input.Title
	newNote.Content = input.Content
	newNote.CreatedBy = input.CreatedBy

	if utils.Contains(availableVisibility, input.Visibility) {
		newNote.Visibility = input.Visibility
	}

	services.CreateNote(newNote)
	c.IndentedJSON(http.StatusCreated, newNote)
}

func GetNoteById(c *gin.Context) {
	id := c.Param("id")
	note, err := services.FindNoteByID(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, note)
}

func UpdateById(c *gin.Context) {
	id := c.Param("id")
	var input models.Note

	if err := c.BindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
		return
	}

	if input.Content == "" || input.Title == "" || input.CreatedBy == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "missing fields"})
		return
	}

	if !utils.Contains(availableVisibility, input.Visibility) {
		input.Visibility = models.PUBLIC
	}

	input.ID = id

	err := services.UpdateNote(input)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "internal server error contact support"})
		return
	}

	c.IndentedJSON(http.StatusOK, input)
}

func RemoveById(c *gin.Context) {
	id := c.Param("id")

	err := services.DeleteNote(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error": "internal server error contact support"})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{"message": "record deleted"})
}
