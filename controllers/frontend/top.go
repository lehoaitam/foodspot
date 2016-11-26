package frontend_controllers

import (
	bc "foodspot/controllers"
	"foodspot/models"
	"strconv"
	"time"

	"github.com/astaxie/beego"
)

const ShopImagePath = "/static/uploads/shops/"

type TopController struct {
	bc.BaseFrontEndController
}

type ShopAjaxItem struct {
	Id       int
	Name     string
	Image    string
	ImageURL string
}

func (c *TopController) Get() {
	c.Data["page_title"] = c.Tr("top.title")
	beego.Trace(c.Data["page_title"])
	c.TplName = "frontend/index.html"
	c.Data["shops"] = getShops()
}

func getShops() []ShopAjaxItem {
	shops := new([]*models.Shops)
	num, _ := models.GetShops().Filter("ActiveFlg", 1).All(shops)
	results := []ShopAjaxItem{}
	for i := 0; i < int(num); i++ {
		shopItem := ShopAjaxItem{
			Id:       (*shops)[i].Id,
			Name:     (*shops)[i].Name,
			Image:    (*shops)[i].Image,
			ImageURL: ShopImagePath + strconv.Itoa(int((*shops)[i].Id)) + "?" + time.Now().String(),
		}
		results = append(results, shopItem)
	}
	return results
}

// Demo frontend template

func (c *TopController) Page404Demo() {
	c.TplName = "frontend/404.html"
}

func (c *TopController) AboutDemo() {
	c.TplName = "frontend/about.html"
}

func (c *TopController) BlogHome1Demo() {
	c.TplName = "frontend/blog-home-1.html"
}

func (c *TopController) BlogHome2Demo() {
	c.TplName = "frontend/blog-home-2.html"
}

func (c *TopController) BlogPostDemo() {
	c.TplName = "frontend/blog-post.html"
}

func (c *TopController) ContactDemo() {
	c.TplName = "frontend/contact.html"
}

func (c *TopController) FaqDemo() {
	c.TplName = "frontend/faq.html"
}

func (c *TopController) FullWidthDemo() {
	c.TplName = "frontend/full-width.html"
}

func (c *TopController) Portfolio1ColDemo() {
	c.TplName = "frontend/portfolio-1-col.html"
}

func (c *TopController) Portfolio2ColDemo() {
	c.TplName = "frontend/portfolio-2-col.html"
}

func (c *TopController) Portfolio3ColDemo() {
	c.TplName = "frontend/portfolio-3-col.html"
}

func (c *TopController) Portfolio4ColDemo() {
	c.TplName = "frontend/portfolio-4-col.html"
}

func (c *TopController) PortfolioItemDemo() {
	c.TplName = "frontend/portfolio-item.html"
}

func (c *TopController) PricingDemo() {
	c.TplName = "frontend/pricing.html"
}

func (c *TopController) ServicesDemo() {
	c.TplName = "frontend/services.html"
}

func (c *TopController) SideBarDemo() {
	c.TplName = "frontend/sidebar.html"
}
