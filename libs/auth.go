package libs

import (
	"errors"
	"time"
	"foodspot/models"
	"foodspot/helpers"
)

/*
 Get authenticated user and update logintime
*/
func Authenticate(email string, password string) (user *models.User, err error) {
	msg := "invalid email or password."
	user = &models.User{Email: email}

	if err := user.Read("Email"); err != nil {
		if err.Error() == "<QuerySeter> no row found" {
			err = errors.New(msg)
		}
		return user, err
	} else if user.Id < 1 {
		// No user
		return user, errors.New(msg)
	} else if user.Password != helpers.EncryptPassword(password) {
		// No matched password
		return user, errors.New(msg)
	} else {
		user.Lastlogintime = time.Now()
		user.Update("Lastlogintime")
		return user, nil
	}
}