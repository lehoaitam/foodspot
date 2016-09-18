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
func Authenticate(email string, password string) (user *models.Users, err error) {
	msg := "Invalid email or password."
	user = &models.Users{Email: email}

	pass := ""
	pass= helpers.EncryptPassword(password)

	if err := user.Read("Email"); err != nil {
		if err.Error() == "<QuerySeter> no row found" {
			err = errors.New(msg)
		}
		return user, err
	} else if user.Id < 1 {
		// No user
		return user, errors.New(msg)
	} else if user.Password != pass[0:len(user.Password)] {
		// No matched password
		return user, errors.New(msg)
	} else {
		user.Lastlogintime = time.Now()
		user.Update("Lastlogintime")
		return user, nil
	}
}