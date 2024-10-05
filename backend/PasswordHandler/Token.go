package PasswordHandler

import (
	"crypto/rand"
	"errors"
	"fmt"
)

func CreateToken() (string, error) {
	b := make([]byte, 512)
	rand.Read(b)
	if len(b) < 10 {
		return "", errors.New("Fail to create Token.")
	}
	return fmt.Sprintf("%x", b), nil
}
