package handlers

import (
	"net/http"
	"time"

	"github.com/apdo/server/models"
	"github.com/apdo/server/utils"
	"github.com/gin-gonic/gin"
)

var notes = []models.Note{}
var availableVisibility = []models.NoteVisibility{models.PUBLIC, models.PRIVATE}

func GetNotes(c *gin.Context) {
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

	notes = append(notes, newNote)
	c.IndentedJSON(http.StatusCreated, newNote)
}

func GetNoteById(c *gin.Context) {
	id := c.Param("id")

	for _, a := range notes {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "not found"})
}

func UpdateById(c *gin.Context) {
	id := c.Param("id")
	var input models.Note

	if err := c.BindJSON(&input); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "internal server error contact support"})
	}

	for i := 0; i < len(notes); i++ {
		if notes[i].ID == id {
			notes[i].Title = input.Title
			notes[i].Content = input.Content
			if utils.Contains(availableVisibility, input.Visibility) {
				notes[i].Visibility = input.Visibility
			}
			notes[i].UpdatedAt = time.Now()
			c.IndentedJSON(http.StatusOK, notes[i])
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "not found"})
}

func RemoveById(c *gin.Context) {
	id := c.Param("id")

	for i := 0; i < len(notes); i++ {
		if notes[i].ID == id {
			removed := notes[i]
			notes = append(notes[:i], notes[i+1:]...)
			c.IndentedJSON(http.StatusOK, removed)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"error": "not found"})
}
