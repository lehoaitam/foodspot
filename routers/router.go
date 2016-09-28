package routers

import (
	"foodspot/controllers/backend"
	"foodspot/controllers/frontend"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &frontend_controllers.TopController{})
	beego.Router("/login", &backend_controllers.LoginController{}, "get,post:Login")
	beego.Router("/logout", &backend_controllers.LoginController{}, "get:Logout")
	beego.Router("/signup", &backend_controllers.LoginController{}, "get,post:Signup")
	beego.Router("/backoffice/categories", &backend_controllers.CategoriesController{})

	// demo frontend template
	beego.Router("/index", &frontend_controllers.TopController{})
	beego.Router("/404", &frontend_controllers.TopController{}, "get:Page404Demo")
	beego.Router("/about", &frontend_controllers.TopController{}, "get:AboutDemo")
	beego.Router("/about", &frontend_controllers.TopController{}, "get:AboutDemo")
	beego.Router("/blog-home-1", &frontend_controllers.TopController{}, "get:BlogHome1Demo")
	beego.Router("/blog-home-2", &frontend_controllers.TopController{}, "get:BlogHome2Demo")
	beego.Router("/blog-post", &frontend_controllers.TopController{}, "get:BlogPostDemo")
	beego.Router("/contact", &frontend_controllers.TopController{}, "get:ContactDemo")
	beego.Router("/faq", &frontend_controllers.TopController{}, "get:FaqDemo")
	beego.Router("/full-width", &frontend_controllers.TopController{}, "get:FullWidthDemo")
	beego.Router("/portfolio-1-col", &frontend_controllers.TopController{}, "get:Portfolio1ColDemo")
	beego.Router("/portfolio-2-col", &frontend_controllers.TopController{}, "get:Portfolio2ColDemo")
	beego.Router("/portfolio-3-col", &frontend_controllers.TopController{}, "get:Portfolio3ColDemo")
	beego.Router("/portfolio-4-col", &frontend_controllers.TopController{}, "get:Portfolio4ColDemo")
	beego.Router("/portfolio-item", &frontend_controllers.TopController{}, "get:PortfolioItemDemo")
	beego.Router("/pricing", &frontend_controllers.TopController{}, "get:PricingDemo")
	beego.Router("/services", &frontend_controllers.TopController{}, "get:ServicesDemo")
	beego.Router("/sidebar", &frontend_controllers.TopController{}, "get:SideBarDemo")
}
