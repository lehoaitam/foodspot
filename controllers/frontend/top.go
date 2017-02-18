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
	Lat      float64
	Long     float64
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
			Lat:      (*shops)[i].Lat,
			Long:     (*shops)[i].Long,
		}
		results = append(results, shopItem)
	}
	return results
}

func (c *TopController) MenuDetail() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}

	id, _ := c.GetInt("Id");

	if id > 0 {
		menus := new([]*models.Menus)
		num, _ := models.GetMenus().Filter("ActiveFlg", 1).Filter("Shops__id", id).OrderBy("id").All(menus)

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

		c.Data["json"] = result
		c.ServeJSON()
	} else {
		c.Data["json"] = "Error"
		c.ServeJSON()
	}
}
