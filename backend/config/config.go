package config

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
)

func DBConnect() *gorm.DB {
	dsn := "host=localhost user=postgres password=admin dbname=backend port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	return db
}
