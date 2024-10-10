package main

import (
	"backend/config"
	"backend/database/models"
	"backend/routes"
	"log"
)

func main() {
	db := config.DBConnect()

	// Выполнение миграции
	err := db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	r := routes.SetupRoutes(db)
	r.Run(":3001")
}
