package main

import (
	"github.com/apdo/server/routes"
	"github.com/apdo/server/services"
	"github.com/gin-gonic/gin"
)

func main() {

	services.InitFirestore()
	router := gin.Default()
	routes.RegisterRoutes(router)
	router.Run(":8080")
}
