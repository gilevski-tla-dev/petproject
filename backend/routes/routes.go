package routes

import (
	"backend/handlers"
	"backend/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	api := r.Group("/api")
	{
		api.POST("/sign_up", handlers.SignUp(db))
		api.POST("/sign_in", handlers.SignIn(db))
		api.POST("/refresh", handlers.RefreshToken(db))

		protected := api.Group("/protected")
		protected.Use(middleware.AuthMiddleware())
		{

		}
	}
	return r
}
