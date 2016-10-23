package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"encoding/json"
	"strconv"
)

type CategoriesController struct {
	bc.BaseBackEndController
}

type CategoryAjaxItem struct {
	Id int
	Name string
	ShopId string
	ShopName string
}

func (c *CategoriesController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Categories"

	c.Data["HeadScripts"] = []string{
		"/static/js/categories/main.js",
	}
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
			ShopId: string((*categories)[i].Shops.Id),
			ShopName:(*categories)[i].Shops.Name,
		}
		responseJson = append(responseJson, categoryItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *CategoriesController) AddCategory() {
	if !c.Ctx.Input.IsPut() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var ob CategoryAjaxItem
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &ob)

	if err == nil {
		u := &models.Categories{}
		u.Name = ob.Name
		u.ActiveFlg = 1
		u.Shops = &models.Shops{}
		u.Shops.Id, _ = strconv.ParseInt(ob.ShopId, 10, 64)

		err := u.Insert()
		if (err != nil) {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}
		c.Data["json"] = "OK"
		c.ServeJSON()
	} else {
		c.Data["json"] = "Error"
		c.ServeJSON()
	}

	//u := &models.Categories{}


	/*err := u.Insert()
	if err != nil {
		c.Data["json"] = "Fail"
		c.ServeJSON()
		return
	}
	c.Data["json"] = "OK"
	c.ServeJSON()
	*/
}

func (c *CategoriesController) EditCategory() {

}

func (c *CategoriesController) DeleteCategory() {

}
