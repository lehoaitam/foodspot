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
	c.ActiveContent("backend/login.html")

	if c.Ctx.Input.IsPost() {
		flash := beego.NewFlash()
		email := c.GetString("email")
		password := c.GetString("password")

		users, err := libs.Authenticate(email, password)
		if err != nil || users.Id < 1 {
			flash.Warning(err.Error())
			flash.Store(&c.Controller)

			return
		}

		flash.Success("Success logged in")
		flash.Store(&c.Controller)

		c.SetLogin(users)

		c.Redirect(c.URLFor("CategoriesController.Get"), 303)
	}  else {
		c.DelLogin()
	}
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

	u := &models.Users{}
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

	//insert default shop
	shopName := c.GetString("ShopName")
	shop := &models.Shops{}
	shop.Name = shopName
	shop.ActiveFlg = 1
	shop.Users = &models.Users{}
	shop.Users.Id = id

	shopId, err1 := shop.Insert()
	if (err1 != nil) {
		c.Logout()
		return
	}
	shop.Id = int(shopId)

	flash.Success("Register user")
	flash.Store(&c.Controller)

	c.SetLogin(u)
	c.SetCurrentShop(shop)

	c.Redirect(c.URLFor("CategoriesController.Get"), 303)
}