package frontend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"strconv"
	"time"

	"fmt"

	"github.com/astaxie/beego"
	"github.com/beego/i18n"
)

const ShopImagePath = "/static/uploads/shops/"

type TopController struct {
	bc.BaseFrontEndController
}

type ShopAjaxItem struct {
	Id       int
	Name     string
	Image    string
	ImageURL string
}

func (c *TopController) Get() {
	c.Data["page_title"] = i18n.Tr(fmt.Sprint(c.Data["Lang"]), "top.title")
	beego.Trace(fmt.Sprint(c.Data["Lang"]))
	c.TplName = "frontend/index.html"
	c.Data["shops"] = getShops()
}

func getShops() []ShopAjaxItem {
	shops := new([]*models.Shops)
	num, _ := models.GetShops().Filter("ActiveFlg", 1).All(shops)
	results := []ShopAjaxItem{}
	for i := 0; i < int(num); i++ {
		shopItem := ShopAjaxItem{
			Id:       (*shops)[i].Id,
			Name:     (*shops)[i].Name,
			Image:    (*shops)[i].Image,
			ImageURL: ShopImagePath + strconv.Itoa(int((*shops)[i].Id)) + "?" + time.Now().String(),
		}
		results = append(results, shopItem)
	}
	return results
}
