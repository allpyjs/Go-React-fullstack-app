package PSDB

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type DbAcess struct {
	Host     string
	Port     int
	User     string
	Password string
	Dbname   string
}

var DbInfo DbAcess

func init() {
	//getting env values to hide my sensitive info
	errEnv := godotenv.Load()
	if errEnv != nil {
		fmt.Println("Error loading .env file")
		return
	}
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		//error if the provided PORT in .env its not an INT  "10"
		fmt.Println("Port error, verify if its a number", err)
		os.Exit(0)
	}
	DbInfo.Host = os.Getenv("HOST")
	DbInfo.Port = port
	DbInfo.User = os.Getenv("USER")
	DbInfo.Password = os.Getenv("PASSWORD")
	DbInfo.Dbname = os.Getenv("DB_NAME")
}
