package frontend_controllers

import (
	bc "foodspot/controllers"
)

type TopController struct {
	bc.BaseFrontEndController
}

func (c *TopController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "frontend/index.html"
}
