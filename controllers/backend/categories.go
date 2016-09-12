package backend_controllers

import (
	bc "foodspot/controllers"
)

type CategoriesController struct {
	bc.BaseBackEndController
}

func (c *CategoriesController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
}


func (c *CategoriesController) Get() {
	c.ActiveContent("backend/categories.html")
}