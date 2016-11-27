package frontend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"strconv"
	"time"
)

type ShopController struct {
	bc.BaseFrontEndController
}

type MenusAjaxItem struct {
	Id       int
	Name     string
	Image    string
	ImageURL string
}

func (this *ShopController) Get() {
	this.TplName = "frontend/shop.html"

	id, _ := strconv.ParseInt(this.Ctx.Input.Param(":id"), 10, 0)
	shopItem := getShop(id)
	this.Data["shop"] = shopItem
	this.Data["menus"] = getMenus(id)
	this.Data["page_title"] = shopItem.Name
}

func getShop(id int64) ShopAjaxItem {
	shop := &models.Shops{}
	models.GetShops().Filter("id", id).One(shop)
	shopItem := ShopAjaxItem{
		Id:       shop.Id,
		Name:     shop.Name,
		Image:    shop.Image,
		ImageURL: ShopImagePath + strconv.Itoa(shop.Id) + "?" + time.Now().String(),
	}
	return shopItem
}

func getMenus(shop_id int64) []MenusAjaxItem {
	menus := new([]*models.Menus)
	num, _ := models.GetMenus().Filter("ActiveFlg", 1).Filter("Shops__id", shop_id).All(menus)

	result := []MenusAjaxItem{}

	for i := 0; i < int(num); i++ {
		menuItem := MenusAjaxItem{
			Id:       int((*menus)[i].Id),
			Name:     (*menus)[i].Name,
			Image:    (*menus)[i].Image,
			ImageURL: "/static/uploads/menus/" + strconv.Itoa(int((*menus)[i].Id)) + "?" + time.Now().String(),
		}
		result = append(result, menuItem)
	}

	return result
}
