package backend_controllers

import (
	"github.com/astaxie/beego"
)

type CategoriesController struct {
	beego.Controller
}

func (c *CategoriesController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "backend/categories.html"
}