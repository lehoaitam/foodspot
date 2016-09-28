package frontend_controllers

import (
	bc "foodspot/controllers"
)

type TopController struct {
	bc.BaseFrontEndController
}

func (c *TopController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "frontend/index.html"
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
