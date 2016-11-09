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
	beego.Router("/backoffice/shops", &backend_controllers.ShopsController{})
	beego.Router("/backoffice/shops/data", &backend_controllers.ShopsController{}, "get:GetShops;put:AddShop;post:EditShop")
	beego.Router("/backoffice/shops/delete", &backend_controllers.ShopsController{}, "post:DeleteShops")
	beego.Router("/backoffice/categories", &backend_controllers.CategoriesController{})
	beego.Router("/backoffice/categories/data", &backend_controllers.CategoriesController{}, "get:GetCategories;put:AddCategory;post:EditCategory")
	beego.Router("/backoffice/categories/delete", &backend_controllers.CategoriesController{}, "post:DeleteCategories")
	beego.Router("/backoffice/menus", &backend_controllers.MenusController{})
	beego.Router("/backoffice/menus/data", &backend_controllers.MenusController{}, "get:GetMenus;put:AddMenus;post:EditMenus")
	beego.Router("/backoffice/menus/delete", &backend_controllers.MenusController{}, "post:DeleteMenus")
	beego.Router("/backoffice/foods", &backend_controllers.FoodController{})
	beego.Router("/backoffice/foods/data", &backend_controllers.FoodController{}, "get:GetFoods;put:AddFood;post:EditFood")
	beego.Router("/backoffice/foods/delete", &backend_controllers.FoodController{}, "post:DeleteFoods")

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
