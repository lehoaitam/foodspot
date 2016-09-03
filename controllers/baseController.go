package controllers
import (
	"github.com/astaxie/beego"
	"github.com/beego/i18n"
	"strings"
)
var langTypes []string // Languages that are supported.
// baseController represents base router for all other app routers.
// It implemented some methods for the same implementation;
// thus, it will be embedded into other routers.
type BaseController struct {
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

// Prepare implemented Prepare() method for baseController.
// It's used for language option check and setting.
func (this *BaseController) Prepare() {
	// Reset language option.
	this.Lang = "" // This field is from i18n.Locale.
	beego.Trace("running prepare")
	// 1. Get language information from 'Accept-Language'.
	al := this.Ctx.Request.Header.Get("Accept-Language")
	if len(al) > 4 {
		al = al[:5] // Only compare first 5 letters.
		if i18n.IsExist(al) {
			this.Lang = al
		}
	}

	beego.Trace("Accept-Language is " + al)
	// 2. Default language is English.
	if len(this.Lang) == 0 {
		this.Lang = "en-US"
	}

	// Set template level language option.
	this.Data["Lang"] = this.Lang
}