package backend_controllers

import (
	bc "foodspot/controllers"
)

type CategoriesController struct {
	bc.BaseBackEndController
}

func (c *CategoriesController) NestPrepare() {
	//TODO: Debug only
	/*if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}*/
}


func (c *CategoriesController) Get() {
	c.ActiveContent("backend/categories.html")
}