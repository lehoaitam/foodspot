package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"encoding/json"
)

type CategoriesController struct {
	bc.BaseBackEndController
}

type CategoryAjaxItem struct {
	Id int
	Name string
	ShopId int
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
	num, _ := models.GetCategories().Filter("ActiveFlg", 1).Filter("Shops__Users__id", c.UserInfo.Id).RelatedSel().All(categories)

	responseJson := []CategoryAjaxItem{}

	for i := 0; i < int(num); i++ {
		categoryItem := CategoryAjaxItem {
			Id: int((*categories)[i].Id),
			Name:(*categories)[i].Name,
			ShopId: (*categories)[i].Shops.Id,
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
		u.Shops.Id = ob.ShopId

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
}

func (c *CategoriesController) EditCategory() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var ob CategoryAjaxItem
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &ob)

	if err == nil {
		u := &models.Categories{}
		models.GetCategories().Filter("Id", ob.Id).RelatedSel().One(u)
		u.Name = ob.Name
		u.Shops.Id = ob.ShopId

		err := u.Update()
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
}

func (c *CategoriesController) DeleteCategories() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	ob:= []int{}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &ob)

	if err == nil {
		for _,id := range ob {
			u := &models.Categories{}
			u.Id = id
			err := u.Delete()
			if (err != nil) {
				c.Data["json"] = err.Error()
				c.ServeJSON()
				return
			}
		}

		c.Data["json"] = "OK"
		c.ServeJSON()
	} else {
		c.Data["json"] = "Error"
		c.ServeJSON()
	}
}