package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"encoding/json"
	"github.com/astaxie/beego/orm"
	"strconv"
)

type MenuDetailsController struct {
	bc.BaseBackEndController
}

type MenuDetailsAjaxItem struct {
	Id int
	MenuId int
	FoodId int
	Name string
	Left int
	Top int
	Width int
	Height int
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

	id, _ := strconv.ParseInt(c.Ctx.Input.Param(":id"), 10, 32)

	menuDetails := new([]*models.MenuDetails)
	num, _ := models.GetMenuDetails().Filter("DeleteFlg", 0).Filter("Menus__id", id).Filter("Menus__Shops__Users__id", c.UserInfo.Id).RelatedSel().All(menuDetails)

	var responseJson []MenuDetailsAjaxItem

	for i := 0; i < int(num); i++ {
		menuDetailItem := MenuDetailsAjaxItem {
			Id: int((*menuDetails)[i].Id),
			MenuId: int(id),
			FoodId: int((*menuDetails)[i].Food.Id),
			Name:(*menuDetails)[i].Food.Name,
			Left:(*menuDetails)[i].Left,
			Top:(*menuDetails)[i].Top,
			Width:(*menuDetails)[i].Width,
			Height:(*menuDetails)[i].Height,
			//ImageURL:"/static/uploads/food/" + strconv.Itoa(int((*menuDetails)[i].Id)) + "?" + time.Now().String(),
		}
		responseJson = append(responseJson, menuDetailItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *MenuDetailsController) EditMenuDetail() {
	ob:= []MenuDetailsAjaxItem{}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &ob)
	if err == nil && len(ob) > 0 {
		//TODO: need check id permission here
		orm.NewOrm().QueryTable("menu_details").Filter("menus_id", ob[0].MenuId).Delete()
		orm.NewOrm().Begin()
		for _,item := range ob {
			u := &models.MenuDetails{}
			u.Left = item.Left
			u.Top = item.Top
			u.Width = item.Width
			u.Height = item.Height
			u.Menus = &models.Menus{}
			u.Menus.Id = item.MenuId
			u.Food = &models.Food{}
			u.Food.Id = int64(item.FoodId)

			_, err := u.Insert()
			if (err != nil) {
				orm.NewOrm().Rollback()

				c.Data["json"] = err.Error()
				c.ServeJSON()
				return
			}
			c.Data["json"] = "OK"
			c.ServeJSON()
		}
		orm.NewOrm().Commit()

		c.Data["json"] = "OK"
		c.ServeJSON()
	} else {
		c.Data["json"] = "Error"
		c.ServeJSON()
	}
}

func (c *MenuDetailsController) DeleteMenuDetail() {

}