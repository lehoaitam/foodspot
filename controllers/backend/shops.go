package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
)

type ShopsController struct {
	bc.BaseBackEndController
}

type ShopAjaxItem struct {
	Id int
	Name string
}

func (c *ShopsController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Shops"
}


func (c *ShopsController) Get() {
	c.ActiveContent("backend/shops.html")
}

func (c *ShopsController) GetShops() {
	shops := new([]*models.Shops)
	num, _ := models.GetShops().Filter("ActiveFlg", 1).RelatedSel().All(shops)

	var responseJson []ShopAjaxItem

	for i := 0; i < int(num); i++ {
		categoryItem := ShopAjaxItem {
			Id: int((*shops)[i].Id),
			Name:(*shops)[i].Name,
		}
		responseJson = append(responseJson, categoryItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *ShopsController) AddShop() {

}

func (c *ShopsController) EditShop() {

}

func (c *ShopsController) DeleteShops() {

}
