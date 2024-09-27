package routes

import (
	"backend/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"time"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// Настройка CORS
	config := cors.Config{
		AllowOrigins:     []string{"http://example.com"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	r.Use(cors.New(config))

	api := r.Group("/api")
	{
		api.POST("/sign_up", handlers.SignUp(db))
		api.POST("/sign_in", handlers.SignIn(db))
	}
	return r
}
