package routes

import (
	"time"

	"github.com/apdo/server/handlers"
	"github.com/apdo/server/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://apdo.vercel.app", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ACCOUNT
	router.POST("/account/login", handlers.LoginAccount)
	router.POST("/account/register", handlers.RegisterAccount)
	router.POST("/account/activate/:id", handlers.ActivateAccount)
	router.GET("/notes/:id", handlers.GetNoteById)

	// APPLYING MIDDLEWARE AND PREFIX GROUP
	protected := router.Group("/api")
	protected.Use(middlewares.JWTAuthMiddleware())

	// NOTES CRUD = (CREATE READ UPDATE DELETE)
	protected.GET("/notes/public", handlers.GetPublicNotes)
	protected.GET("/notes/user/:id", handlers.GetNotesByUser)
	protected.DELETE("/notes/:id/remove", handlers.RemoveById)
	protected.PUT("/notes/:id/edit", handlers.UpdateNoteById)
	protected.POST("/notes/create", handlers.PostNotes)

	// COLORS CRUD
	protected.GET("/colors/:id", handlers.GetColorByUserId)
	protected.PUT("/colors/:id/edit", handlers.UpdateColorById)
	protected.POST("/colors/create", handlers.PostColors)
}
