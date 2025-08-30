package routes

import (
	"github.com/apdo/server/handlers"
	"github.com/apdo/server/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// ACCOUNT
	router.POST("/account/login", handlers.LoginAccount)
	router.POST("/account/register", handlers.RegisterAccount)
	router.POST("/account/activate/:id", handlers.ActivateAccount)

	// APPLYING MIDDLEWARE AND PREFIX GROUP
	protected := router.Group("/api")
	protected.Use(middlewares.JWTAuthMiddleware())

	// NOTES CRUD
	protected.GET("/notes", handlers.GetNotes)
	protected.GET("/notes/:id", handlers.GetNoteById)
	protected.DELETE("/notes/:id/remove", handlers.RemoveById)
	protected.PUT("/notes/:id/edit", handlers.UpdateById)
	protected.POST("/notes/create", handlers.PostNotes)

	// USERS CRUD
	protected.GET("/users", handlers.GetUsers)
}
