// routes/routes.go
package routes

import (
	"backend/handlers"
	"backend/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"time"
)

func SetupRoutes(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// Configure CORS with Authorization header support.
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}

	r.Use(cors.New(corsConfig))

	api := r.Group("/api")
	{
		api.POST("/sign_up", handlers.SignUp(db))
		api.POST("/sign_in", handlers.SignIn(db))
		api.POST("/refresh", handlers.RefreshToken(db))
		api.GET("/get_profile", middleware.AuthMiddleware(), handlers.GetProfile(db))
		api.PUT("/edit_profile", middleware.AuthMiddleware(), handlers.EditProfile(db))
	}

	return r
}
