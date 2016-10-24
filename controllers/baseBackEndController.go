package controllers

import (
	"foodspot/models"
	"html/template"
)

type BaseBackEndController struct {
	BaseFrontEndController

	Userinfo *models.Users
	IsLogin bool
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

func (c *BaseBackEndController) SetParams() {
	c.Data["Params"] = make(map[string]string)
	for k, v := range c.Input() {
		c.Data["Params"].(map[string]string)[k] = v[0]
	}
}

func (c *BaseBackEndController) Prepare() {
	c.IsLogin = c.GetSession("userinfo") != nil
	if c.IsLogin {
		c.Userinfo = c.GetLogin()
	}

	c.Data["IsLogin"] = c.IsLogin
	c.Data["Userinfo"] = c.Userinfo
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

