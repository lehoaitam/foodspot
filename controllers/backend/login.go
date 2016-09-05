package backend_controllers

import (
	"github.com/astaxie/beego"

	"foodspot/controllers"
	"foodspot/models"
	"foodspot/libs"
	"foodspot/helpers"
)

type LoginController struct {
	controllers.BaseBackEndController
}

func (c *LoginController) Login() {
	c.DelLogin()
	c.ActiveContent("backend/login.html")
}

func (c *LoginController) Logout() {
	c.DelLogin()
	flash := beego.NewFlash()
	flash.Success("Success logged out")
	flash.Store(&c.Controller)

	c.Ctx.Redirect(302, c.URLFor("LoginController.Login"))
}

func (c *LoginController) Signup() {
	c.ActiveContent("backend/signup.html")

	if !c.Ctx.Input.IsPost() {
		return
	}

	var err error
	flash := beego.NewFlash()

	u := &models.User{}
	if err = c.ParseForm(u); err != nil {
		flash.Error("Signup invalid!")
		flash.Store(&c.Controller)
		return
	}
	if err = helpers.IsModelValid(u); err != nil {
		flash.Error(err.Error())
		flash.Store(&c.Controller)
		return
	}

	id, err := libs.Signup(u)
	if err != nil || id < 1 {
		flash.Warning(err.Error())
		flash.Store(&c.Controller)
		return
	}

	flash.Success("Register user")
	flash.Store(&c.Controller)

	c.SetLogin(u)

	c.Redirect(c.URLFor("UsersController.Index"), 303)
}