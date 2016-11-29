package backend_controllers

import (
	"encoding/json"
	bc "foodspot/controllers"
	"foodspot/models"
	"os"
	"strconv"
	"time"
)

const ShopImagePath = "/static/uploads/shops/"

type ShopsController struct {
	bc.BaseBackEndController
}

type ShopAjaxItem struct {
	Id        int
	Name      string
	Image     string
	ImageURL  string
	Lat       float64
	Long      float64
	ActiveFlg bool
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
	num, _ := models.GetShops().Filter("DeleteFlg", false).Filter("Users__id", c.UserInfo.Id).RelatedSel().All(shops)

	var responseJson []ShopAjaxItem

	for i := 0; i < int(num); i++ {
		shopItem := ShopAjaxItem{
			Id:        int((*shops)[i].Id),
			Name:      (*shops)[i].Name,
			Image:     (*shops)[i].Image,
			ImageURL:  ShopImagePath + strconv.Itoa(int((*shops)[i].Id)) + "?" + time.Now().String(),
			Lat:       (*shops)[i].Lat,
			Long:      (*shops)[i].Long,
			ActiveFlg: (*shops)[i].ActiveFlg,
		}
		responseJson = append(responseJson, shopItem)
	}
	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *ShopsController) AddShop() {
	if !c.Ctx.Input.IsPut() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	shop := &models.Shops{}
	shop.Name = c.GetString("Name")

	if shop.Name != "" {
		shop.Lat, _ = c.GetFloat("Lat")
		shop.Long, _ = c.GetFloat("Long")
		shop.ActiveFlg, _ = c.GetBool("ActiveFlg")
		shop.Users = c.GetLogin()

		file, header, err := c.GetFile("Image")
		if file != nil {
			shop.Image = header.Filename
		} else {
			c.Data["json"] = "Error"
			c.ServeJSON()
		}

		id, err := shop.Insert()
		if err != nil {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}

		pwd, _ := os.Getwd()
		err = c.SaveToFile("Image", pwd+ShopImagePath+strconv.Itoa(int(id)))
		//TODO: xoa mau tin khi save file that bai
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

func (c *ShopsController) EditShop() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var obj ShopAjaxItem
	obj.Id, _ = c.GetInt("Id")
	obj.Name = c.GetString("Name")
	if obj.Id > 0 && obj.Name != "" {
		shop := &models.Shops{}
		models.GetShops().Filter("Id", obj.Id).One(shop)
		shop.Name = obj.Name
		shop.Lat, _ = c.GetFloat("Lat")
		shop.Long, _ = c.GetFloat("Long")
		shop.ActiveFlg, _ = c.GetBool("ActiveFlg")

		file, header, err := c.GetFile("Image")
		if file != nil {
			shop.Image = header.Filename
			pwd, _ := os.Getwd()
			err = c.SaveToFile("Image", pwd+ShopImagePath+strconv.Itoa(obj.Id))
			if err != nil {
				c.Data["json"] = err.Error()
				c.ServeJSON()
				return
			}
		}

		err = shop.Update()
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

func (c *ShopsController) DeleteShops() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	obj := []int{}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &obj)

	if err == nil {
		pwd, _ := os.Getwd()
		for _, id := range obj {

			os.Remove(pwd + ShopImagePath + strconv.Itoa(id))

			shop := &models.Shops{}
			shop.Id = id
			err := shop.Delete()
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
