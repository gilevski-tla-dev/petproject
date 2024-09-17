package main

import (
	"backend"
	"backend/pkg/handler"
	"backend/pkg/repository"
	"backend/pkg/service"
	"log"
)

func main() {

	repos := repository.NewRepository()
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)

	srv := new(backend.Server)

	err := srv.Run(
		"8080",
		handlers.InitRoutes(),
	)
	if err != nil {
		log.Fatalf("error starting server: %s", err.Error())
	}
}
