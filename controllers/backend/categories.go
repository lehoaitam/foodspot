package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
)

type CategoriesController struct {
	bc.BaseBackEndController
}

type CategoryAjaxItem struct {
	Id int
	Name string
	ShopName string
}

func (c *CategoriesController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Categories"
}


func (c *CategoriesController) Get() {
	c.ActiveContent("backend/categories.html")
}

func (c *CategoriesController) GetCategories() {
	categories := new([]*models.Categories)
	num, _ := models.GetCategories().Filter("ActiveFlg", 1).RelatedSel().All(categories)

	var responseJson []CategoryAjaxItem

	for i := 0; i < int(num); i++ {
		categoryItem := CategoryAjaxItem {
			Id: int((*categories)[i].Id),
			Name:(*categories)[i].Name,
			ShopName:(*categories)[i].Shops.Name,
		}
		responseJson = append(responseJson, categoryItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *CategoriesController) AddCategory() {

}

func (c *CategoriesController) EditCategory() {

}

func (c *CategoriesController) DeteteCAtegory() {

}
