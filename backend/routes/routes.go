package routes

import (
	"backend/handlers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	api := r.Group("/api")
	{
		api.POST("/sign_up", handlers.SignUp(db))
		api.POST("/sign_in", handlers.SignIn(db))
	}
	return r
}
