package backend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"encoding/json"
	"strconv"
	"os"
	"time"
)

type MenusController struct {
	bc.BaseBackEndController
}

type MenusAjaxItem struct {
	Id int
	Name string
	Image string
	ImageURL string
}

func (c *MenusController) NestPrepare() {
	if !c.IsLogin {
		c.Ctx.Redirect(302, c.LoginPath())
		return
	}
	c.Data["page_title"] = "Menus"
}


func (c *MenusController) Get() {
	c.ActiveContent("backend/menus.html")
}

func (c *MenusController) GetMenus() {
	menus := new([]*models.Menus)
	num, _ := models.GetMenus().Filter("ActiveFlg", 1).Filter("Shops__Users__id", c.UserInfo.Id).RelatedSel().OrderBy("id").All(menus)

	responseJson := []MenusAjaxItem{}

	for i := 0; i < int(num); i++ {
		menuItem := MenusAjaxItem {
			Id: int((*menus)[i].Id),
			Name:(*menus)[i].Name,
			Image:(*menus)[i].Image,
			ImageURL: "/static/uploads/menus/" + strconv.Itoa(int((*menus)[i].Id)) + "?" + time.Now().String(),
		}
		responseJson = append(responseJson, menuItem)
	}

	c.Data["json"] = responseJson
	c.ServeJSON()
}

func (c *MenusController) AddMenus() {
	if !c.Ctx.Input.IsPut() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var ob MenusAjaxItem
	ob.Name = c.GetString("Name");

	if ob.Name != "" {
		u := &models.Menus{}
		u.Name = ob.Name
		u.ActiveFlg = 1
		u.Shops = &models.Shops{}
		u.Shops.Id = c.GetCurrentShop().Id

		file, header, err := c.GetFile("Image")
		if file != nil {
			u.Image = header.Filename
		} else {
			c.Data["json"] = "Error"
			c.ServeJSON()
		}

		id, err := u.Insert()
		if (err != nil) {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}

		pwd, _ := os.Getwd()
		err = c.SaveToFile("Image", pwd + "/static/uploads/menus/" + strconv.FormatInt(id, 10))

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

func (c *MenusController) EditMenus() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	var ob MenusAjaxItem
	ob.Id, _ = c.GetInt("Id");
	ob.Name = c.GetString("Name");

	if ob.Id > 0 && ob.Name != "" {
		u := &models.Menus{}
		models.GetMenus().Filter("Id", ob.Id).RelatedSel().One(u)
		u.Name = ob.Name

		file, header, err := c.GetFile("Image")
		if file != nil {
			u.Image = header.Filename
		} else {
			c.Data["json"] = "Error"
			c.ServeJSON()
		}

		pwd, _ := os.Getwd()
		err = c.SaveToFile("Image", pwd + "/static/uploads/menus/" + strconv.Itoa(ob.Id))
		if (err != nil) {
			c.Data["json"] = err.Error()
			c.ServeJSON()
			return
		}

		err = u.Update()
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

func (c *MenusController) DeleteMenus() {
	if !c.Ctx.Input.IsPost() {
		c.Data["json"] = "Error"
		c.ServeJSON()
		return
	}
	ob:= []int{}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &ob)

	if err == nil {
		pwd, _ := os.Getwd()
		for _,id := range ob {

			err = os.Remove(pwd + "/static/uploads/menus/" + strconv.Itoa(id))
			if (err != nil) {
				c.Data["json"] = err.Error()
				c.ServeJSON()
				return
			}

			u := &models.Menus{}
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
