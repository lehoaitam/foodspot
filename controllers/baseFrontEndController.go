package controllers

import (
	"strings"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/beego/i18n"
)

var langTypes []string // Languages that are supported.
// baseController represents base router for all other app routers.
// It implemented some methods for the same implementation;
// thus, it will be embedded into other routers.
type BaseFrontEndController struct {
	beego.Controller // Embed struct that has stub implementation of the                     interface.
	i18n.Locale      // For i18n usage when process data and render template.
}

func init() {
	beego.AddFuncMap("i18n", i18n.Tr)

	// Initialize language type list.
	langTypes = strings.Split(beego.AppConfig.String("lang_types"), "|")

	// Load locale files according to language types.
	for _, lang := range langTypes {
		beego.Trace("Loading language: " + lang)
		if err := i18n.SetMessage(lang, "conf/"+"locale_"+lang+".ini"); err != nil {
			beego.Error("Fail to set message file:", err)
			return
		}
	}
}

func getLang(ctx *context.Context) string {
	// Reset language option.
	lang := ""
	//beego.Trace("running prepare")
	// Get language information from 'Accept-Language'.
	al := ctx.Request.Header.Get("Accept-Language")
	if len(al) > 4 {
		al = al[:5] // Only compare first 5 letters.
		if i18n.IsExist(al) {
			lang = al
		}
	}

	//beego.Trace("Accept-Language is " + al)
	if len(lang) == 0 {
		lang = "en-US"
	}

	return lang
}

// Prepare implemented Prepare() method for baseController.
// It's used for language option check and setting.
func (this *BaseFrontEndController) Prepare() {
	this.Data["Lang"] = getLang(this.Ctx)
	this.Data["IsLogin"] = this.GetSession("userinfo") != nil
	this.Layout = "baseFrontEndView.html"
}