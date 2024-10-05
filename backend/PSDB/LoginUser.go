package PSDB

import (
	"database/sql"
	"errors"
	"fmt"
	sanitizer "server/react/PasswordHandler"
	"time"
)

func LoginUser(email string, password string, hashToken string) error {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		DbInfo.Host, DbInfo.Port, DbInfo.User, DbInfo.Password, DbInfo.Dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		panic(err)
	}

	currentTime := time.Now()
	future := currentTime.AddDate(0, 0, 30)
	expireDate := fmt.Sprintf(`%d-%d-%d`, future.Year(), future.Month(), future.Day())

	sqlStatement := `SELECT id,password FROM users WHERE email = $1`
	row := db.QueryRow(sqlStatement, email)
	var dbId string
	var dbPass string
	err = row.Scan(&dbId, &dbPass)

	switch err {
	case sql.ErrNoRows:
		return errors.New("Email or Password invalid")
	case nil:
		err := sanitizer.CheckHash(password, dbPass)
		if err != nil {
			return err
		}
		sqlStatement := `SELECT id FROM login_token WHERE email = $1`
		var e string
		row = db.QueryRow(sqlStatement, email)
		err = row.Scan(&e)
		switch err {
		case sql.ErrNoRows:

			sqlStatement = `
					INSERT INTO login_token (id, email, token, expire_date)
					VALUES ($1, $2, $3, $4)`

			_, err = db.Exec(sqlStatement, dbId, email, hashToken, expireDate)
			if err != nil {
				return errors.New("Error to register token.")
				//panic(err)
			}
		case nil:
			sqlStatement := `
					DELETE FROM login_token
					WHERE email = $1;`
			_, err = db.Exec(sqlStatement, email)
			if err != nil {
				return errors.New("Error to delete old token.")
			}
			sqlStatement = `
					INSERT INTO login_token (id, email, token, expire_date)
					VALUES ($1, $2, $3, $4)`

			_, err = db.Exec(sqlStatement, dbId, email, hashToken, expireDate)
			if err != nil {
				return errors.New("Error to register token.")
				//panic(err)
			}
		default:
			panic(err)
		}

		return nil
	default:
		panic(err)
	}
}
