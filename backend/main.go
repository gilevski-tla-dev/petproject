package main

import (
	"backend/config"
	"backend/routes"
)

func main() {
	db := config.DBConnect()
	r := routes.SetupRoutes(db)

	r.Run(":3001")
}
