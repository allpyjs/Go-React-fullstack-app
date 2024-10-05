package PSDB

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	_ "github.com/lib/pq"
)

func UserRegister(email string, name string, password string) error {
	//storing the info to access the DB
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		DbInfo.Host, DbInfo.Port, DbInfo.User, DbInfo.Password, DbInfo.Dbname)

	//starting db
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	//don't forget to close it
	defer db.Close()
	//ping to check if its working
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	sqlStatement := `SELECT email FROM users WHERE email = $1`
	row := db.QueryRow(sqlStatement, email)
	var eml string
	err = row.Scan(&eml)

	switch err {
	case sql.ErrNoRows:
		//i tried to use .Format for this but to no avail, something was going really wrong
		currentTime := time.Now()
		future := currentTime.AddDate(0, 0, 30)
		today := fmt.Sprintf(`%d-%d-%d`, currentTime.Year(), currentTime.Month(), currentTime.Day())
		expireDate := fmt.Sprintf(`%d-%d-%d`, future.Year(), future.Month(), future.Day())

		sqlStatement := `
		INSERT INTO users (email, name, password, date, verify )
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id`
		id := 0
		err := db.QueryRow(sqlStatement, email, name, password, today, false).Scan(&id)
		if err != nil {
			return errors.New("Error to register user.")
			//panic(err)
		}

		sqlStatement = `
		INSERT INTO users_info (id, credits, user_info, last_update)
		VALUES ($1, $2, $3, $4)`

		_, err = db.Exec(sqlStatement, id, 0, "Empty", today)

		if err != nil {
			return errors.New("Error to register user information. ")
			//panic(err)
		}

		sqlStatement = `
		INSERT INTO email_verify (email, verify_link, expire_date)
		VALUES ($1, $2, $3)`

		_, err = db.Exec(sqlStatement, email, "x", expireDate)
		if err != nil {
			return errors.New("Error to register user verify link.")
			//panic(err)
		}
		return nil

	case nil:
		return errors.New("Email already exist.")

	default:
		panic(err)
	}
}
