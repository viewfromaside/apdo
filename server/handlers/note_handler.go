package handlers

import (
	"net/http"
	"strings"

	"github.com/apdo/server/models"
	"github.com/apdo/server/services"
	"github.com/apdo/server/utils"
	"github.com/gin-gonic/gin"
)

var availableVisibility = []models.NoteVisibility{models.PUBLIC, models.PRIVATE}

func GetNotesByUser(c *gin.Context) {
	id := c.Param("id")
	notes, err := services.FindManyNotesByField("CreatedBy", id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.IndentedJSON(http.StatusOK, notes)
}

func GetPublicNotes(c *gin.Context) {
	notes, err := services.FindManyNotesByField("Visibility", "public")
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.IndentedJSON(http.StatusOK, notes)
}

func PostNotes(c *gin.Context) {
	var input models.Note

	if err := c.BindJSON(&input); err != nil || input.Title == "" || input.CreatedBy == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to request, contact support"})
		return
	}

	newNote := models.NewNote()
	newNote.Title = strings.TrimSpace(strings.ReplaceAll(input.Title, " ", "_"))
	newNote.Content = input.Content
	newNote.CreatedBy = input.CreatedBy
	if input.Content == "" {
		newNote.Content = "Start editing this text"
	}

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

func UpdateNoteById(c *gin.Context) {
	id := c.Param("id")
	var input models.Note

	if err := c.BindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
		return
	}

	if input.Title == "" || input.CreatedBy == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "missing fields"})
		return
	}

	if !utils.Contains(availableVisibility, input.Visibility) {
		input.Visibility = models.PUBLIC
	}

	input.Title = strings.TrimSpace(strings.ReplaceAll(input.Title, " ", "_"))
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
