package routes

import (
	"github.com/apdo/server/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// NOTES CRUD
	router.GET("/notes", handlers.GetNotes)
	router.GET("/notes/:id", handlers.GetNoteById)
	router.DELETE("/notes/:id/remove", handlers.RemoveById)
	router.PUT("/notes/:id/edit", handlers.UpdateById)
	router.POST("/notes/create", handlers.PostNotes)
}
