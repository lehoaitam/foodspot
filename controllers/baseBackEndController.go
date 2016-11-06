package controllers

import (
	"foodspot/models"
	"html/template"
)

type BaseBackEndController struct {
	BaseFrontEndController

	UserInfo *models.Users
	IsLogin  bool
}

type NestPreparer interface {
	NestPrepare()
}

type NestFinisher interface {
	NestFinish()
}

func (c *BaseBackEndController) NestPrepare() {

}

func (c *BaseBackEndController) LoginPath() string {
	return c.URLFor("LoginController.Login")
}

func (c *BaseBackEndController) GetLogin() *models.Users {
	u := &models.Users{Id: c.GetSession("userinfo").(int)}
	u.Read()
	return u
}

func (c *BaseBackEndController) SetLogin(users *models.Users) {
	c.SetSession("userinfo", users.Id)
}

func (c *BaseBackEndController) DelLogin() {
	c.DelSession("userinfo")
}

func (c *BaseBackEndController) GetCurrentShop() *models.Shops {
	if c.UserInfo == nil {
		return nil
	}
	if c.GetSession("currentShop") == nil {
		shops := c.GetShopsCache()
		if len(*shops) > 0 {
			c.SetSession("currentShop", (*shops)[0])
			return (*shops)[0];
		}
	}
	return c.GetSession("currentShop").(*models.Shops)
}

func (c *BaseBackEndController) SetCurrentShop(shop *models.Shops) {
	c.SetSession("currentShop", shop)
}

func (c *BaseBackEndController) GetShopsCache() *[]*models.Shops {
	if c.UserInfo == nil {
		return nil
	}
	if c.GetSession("myShops") == nil {
		shops := new([]*models.Shops)
		models.GetShops().Filter("ActiveFlg", 1).Filter("Users__id", c.UserInfo.Id).RelatedSel().All(shops)
		c.SetSession("myShops", shops)
		return shops
	}
	return c.GetSession("myShops").(*[]*models.Shops)
}

func (c *BaseBackEndController) SetShopsCache(shops []*models.Shops) {
	c.SetSession("myShops", shops)
}

func (c *BaseBackEndController) SetParams() {
	c.Data["Params"] = make(map[string]string)
	for k, v := range c.Input() {
		c.Data["Params"].(map[string]string)[k] = v[0]
	}
}

func (c *BaseBackEndController) Prepare() {
	c.IsLogin = c.GetSession("userinfo") != nil
	if c.IsLogin {
		c.UserInfo = c.GetLogin()
	}

	c.Data["IsLogin"] = c.IsLogin
	c.Data["Userinfo"] = c.UserInfo
	c.Data["myShops"] = c.GetShopsCache()
	currentShop := c.GetCurrentShop()
	if currentShop == nil {
		c.Data["currentShopName"] = ""
	} else {
		c.Data["currentShopName"] = currentShop.Name
	}
	c.Data["HeadStyles"] = []string{}
	c.Data["HeadScripts"] = []string{}

	c.Data["Lang"] = getLang(c.Ctx);

	if app, ok := c.AppController.(NestPreparer); ok {
		app.NestPrepare()
	}
}

func (c *BaseBackEndController) ActiveContent(view string) {
	c.Data["xsrfdata"] = template.HTML(c.XSRFFormHTML())

	if c.IsLogin {
		c.Layout = "baseBackEndView.html"
	} else {
		c.Layout = "loginBackEndView.html"
	}
	c.LayoutSections = make(map[string]string)
	c.TplName = view
}

func (c *BaseBackEndController) Finish() {
	if app, ok := c.AppController.(NestFinisher); ok {
		app.NestFinish()
	}
}

