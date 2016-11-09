package backend_controllers

import (
	"encoding/json"
	bc "foodspot/controllers"
	"foodspot/models"
)

type FoodController struct {
	bc.BaseBackEndController
}

type FoodAjaxItem struct {
	Id           int64
	Name         string
	CategoryId   int
	CategoryName string
}

func (c *FoodController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Foods"
}

func (c *FoodController) Get() {
	c.ActiveContent("backend/food.html")
}

func (c *FoodController) GetFoods() {
	foods := new([]*models.Food)
	num, _ := models.GetFoods().Filter("ActiveFlg", 1).RelatedSel().All(foods)

	var responseJson []FoodAjaxItem

	for i := 0; i < int(num); i++ {
		foodItem := FoodAjaxItem{
			Id:           int64((*foods)[i].Id),
			Name:         (*foods)[i].Name,
			CategoryId:   (*foods)[i].Categories.Id,
			CategoryName: (*foods)[i].Categories.Name,
		}
		responseJson = append(responseJson, foodItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *FoodController) AddFood() {
	if !c.Ctx.Input.IsPut() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var obj FoodAjaxItem
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &obj)

	if err == nil {
		food := &models.Food{}
		food.Name = obj.Name
		food.ActiveFlg = 1
		food.Categories = &models.Categories{}
		food.Categories.Id = obj.CategoryId

		err := food.Insert()
		if err != nil {
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

func (c *FoodController) EditFood() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var obj FoodAjaxItem
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &obj)

	if err == nil {
		food := &models.Food{}
		models.GetFoods().Filter("Id", obj.Id).RelatedSel().One(food)
		food.Name = obj.Name
		food.Categories.Id = obj.CategoryId

		err := food.Update()
		if err != nil {
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

func (c *FoodController) DeleteFoods() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	obj := []int64{}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &obj)

	if err == nil {
		for _, id := range obj {
			food := &models.Food{}
			food.Id = id
			err := food.Delete()
			if err != nil {
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
