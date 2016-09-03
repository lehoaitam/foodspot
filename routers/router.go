package routers

import (
	"foodspot/controllers/frontend"
	"foodspot/controllers/backend"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &frontend_controllers.TopController{})
	beego.Router("/login", &backend_controllers.LoginController{})
}
