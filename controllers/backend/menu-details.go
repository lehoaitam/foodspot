package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"strconv"
	"time"
)

type MenuDetailsController struct {
	bc.BaseBackEndController
}

type MenuDetailsAjaxItem struct {
	Id int
	Name string
	Left int
	Top int
	Width int
	Height int
	ImageURL string
}

func (c *MenuDetailsController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Menu Detail"
}


func (c *MenuDetailsController) Get() {
	if (c.Ctx.Input.Param(":id") == "") {
		c.Ctx.Redirect(302, c.URLFor("MenusController.Get"));
		return;
	}

	c.ActiveContent("backend/menu-details.html")
}

func (c *MenuDetailsController) GetMenuDetails() {

	menuDetails := new([]*models.MenuDetails)
	num, _ := models.GetMenuDetails().Filter("DeleteFlg", 0).Filter("Menus__id", c.Ctx.Input.Param(":id")).Filter("Menus__Shops__Users__id", c.UserInfo.Id).RelatedSel().All(menuDetails)

	var responseJson []MenuDetailsAjaxItem

	for i := 0; i < int(num); i++ {
		menuDetailItem := MenuDetailsAjaxItem {
			Id: int((*menuDetails)[i].Id),
			Name:(*menuDetails)[i].Food.Name,
			Left:(*menuDetails)[i].Left,
			Top:(*menuDetails)[i].Top,
			Width:(*menuDetails)[i].Width,
			Height:(*menuDetails)[i].Height,
			ImageURL:"/static/uploads/foods/" + strconv.Itoa(int((*menuDetails)[i].Id)) + "?" + time.Now().String(),
		}
		responseJson = append(responseJson, menuDetailItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *MenuDetailsController) EditMenuDetail() {

}

func (c *MenuDetailsController) DeleteMenuDetail() {

}