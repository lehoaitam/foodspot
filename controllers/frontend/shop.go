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

type MenuDetailsAjaxItem struct {
	Id              int
	MenuId          int
	FoodName        string
	FoodDescription string
	FoodImageURL    string
	FoodPrice    	int
	Left            float64
	Top             float64
	Width           float64
	Height          float64
}

type MenusAjaxItem struct {
	Id          int
	Name        string
	Image       string
	ImageURL    string
	MenuDetails []MenuDetailsAjaxItem
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
		Lat:      shop.Lat,
		Long:     shop.Long,
	}
	return shopItem
}

func getMenus(shop_id int64) []MenusAjaxItem {
	menus := new([]*models.Menus)
	num, _ := models.GetMenus().Filter("ActiveFlg", 1).Filter("Shops__id", shop_id).OrderBy("id").All(menus)

	result := []MenusAjaxItem{}

	for i := 0; i < int(num); i++ {
		menuItem := MenusAjaxItem{
			Id:       int((*menus)[i].Id),
			Name:     (*menus)[i].Name,
			Image:    (*menus)[i].Image,
			ImageURL: "/static/uploads/menus/" + strconv.Itoa(int((*menus)[i].Id)) + "?" + time.Now().String(),
		}

		menuDetails := new([]*models.MenuDetails)
		menuDetailsRows, _ := models.GetMenuDetails().Filter("DeleteFlg", 0).Filter("Menus__id", menuItem.Id).RelatedSel().All(menuDetails)
		menuItem.MenuDetails = []MenuDetailsAjaxItem{}
		for j := 0; j < int(menuDetailsRows); j++ {
			menuItem.MenuDetails = append(menuItem.MenuDetails, MenuDetailsAjaxItem{
				Id:              int((*menuDetails)[j].Id),
				MenuId:          (*menuDetails)[j].Menus.Id,
				FoodName:        (*menuDetails)[j].Food.Name,
				FoodDescription: (*menuDetails)[j].Food.Description,
				FoodImageURL:    "",
				FoodPrice:	 int((*menuDetails)[j].Food.Price),
				Left:            (*menuDetails)[j].Left,
				Top:             (*menuDetails)[j].Top,
				Width:           (*menuDetails)[j].Width,
				Height:          (*menuDetails)[j].Height,
			})
		}

		result = append(result, menuItem)
	}

	return result
}
