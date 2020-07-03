package main

import (
	"./config"
	"./routers"
)

func main() {
	config.DBConnection()
	routers.CreateServer()
}
