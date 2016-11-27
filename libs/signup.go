package libs

import (
	"errors"
	"foodspot/models"
	"foodspot/helpers"
)

func Signup(u *models.Users) (int, error) {
	var (
		err error
		msg string
	)

	if models.GetUsers().Filter("email", u.Email).Exist() {
		msg = u.Email + " was already registered."
		return 0, errors.New(msg)
	}

	u.Password = helpers.EncryptPassword(u.Password)
	u.ActiveFlg = 1

	err = u.Insert()
	if err != nil {
		return 0, err
	}

	return u.Id, err
}
