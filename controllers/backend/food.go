package backend_controllers

import (
	"encoding/json"
	bc "foodspot/controllers"
	"foodspot/models"
	"os"
	"strconv"
	"time"
)

const ImagePath = "/static/uploads/food/"

type FoodController struct {
	bc.BaseBackEndController
}

type FoodAjaxItem struct {
	Id           int64
	Name         string
	Description  string
	Price        float64
	Image        string
	ImageURL     string
	ActiveFlg    bool
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
	num, _ := models.GetFoods().Filter("DeleteFlg", 0).RelatedSel().OrderBy("Name").All(foods)

	responseJson := []FoodAjaxItem{}

	for i := 0; i < int(num); i++ {
		foodItem := FoodAjaxItem{
			Id:           int64((*foods)[i].Id),
			Name:         (*foods)[i].Name,
			Description:  (*foods)[i].Description,
			Price:        (*foods)[i].Price,
			Image:        (*foods)[i].Image,
			ImageURL:     ImagePath + strconv.FormatInt((*foods)[i].Id, 10) + "?" + time.Now().String(),
			ActiveFlg:    (*foods)[i].ActiveFlg,
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
	food := &models.Food{}
	food.Name = c.GetString("Name")

	if food.Name != "" {
		food.Description = c.GetString("Description")
		food.Price, _ = c.GetFloat("Price")
		food.ActiveFlg, _ = c.GetBool("ActiveFlg")
		food.Categories = &models.Categories{}
		food.Categories.Id, _ = c.GetInt("CategoryId")

		file, header, err := c.GetFile("Image")
		if file != nil {
			food.Image = header.Filename
		} else {
			c.Data["json"] = "Error"
			c.ServeJSON()
		}

		id, err := food.Insert()
		if err != nil {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}

		pwd, _ := os.Getwd()
		err = c.SaveToFile("Image", pwd+ImagePath+strconv.FormatInt(id, 10))
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
		c.Data["json"] = "Error1"
		c.ServeJSON()
		return
	}
	var obj FoodAjaxItem
	obj.Id, _ = c.GetInt64("Id")
	obj.Name = c.GetString("Name")

	if obj.Id > 0 && obj.Name != "" {
		food := &models.Food{}
		models.GetFoods().Filter("Id", obj.Id).RelatedSel().One(food)
		food.Name = obj.Name
		food.Description = c.GetString("Description")
		food.Price, _ = c.GetFloat("Price")
		food.ActiveFlg, _ = c.GetBool("ActiveFlg")
		food.Categories.Id, _ = c.GetInt("CategoryId")

		file, header, err := c.GetFile("Image")
		if file != nil {
			food.Image = header.Filename
			pwd, _ := os.Getwd()
			err = c.SaveToFile("Image", pwd+ImagePath+strconv.FormatInt(food.Id, 10))
			if err != nil {
				c.Data["json"] = err.Error()
				c.ServeJSON()
				return
			}
		}

		err = food.Update()
		if err != nil {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}
		c.Data["json"] = "OK"
		c.ServeJSON()
	} else {
		c.Data["json"] = "Error2"
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
		pwd, _ := os.Getwd()
		for _, id := range obj {

			os.Remove(pwd + ImagePath + strconv.FormatInt(id, 10))

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
