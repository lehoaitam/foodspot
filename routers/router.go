package routers

import (
	"foodspot/controllers/frontend"
	"foodspot/controllers/backend"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &frontend_controllers.TopController{})
	beego.Router("/login", &backend_controllers.LoginController{}, "get,post:Login")
	beego.Router("/logout", &backend_controllers.LoginController{}, "get:Logout")
	beego.Router("/signup", &backend_controllers.LoginController{}, "get,post:Signup")
	beego.Router("/backoffice/categories", &backend_controllers.CategoriesController{})
}
