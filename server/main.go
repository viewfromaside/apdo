package main

import (
	"github.com/apdo/server/routes"
	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	routes.RegisterRoutes(router)
	router.Run("localhost:8080")
}

