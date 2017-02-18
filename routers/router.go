package routers

import (
	"foodspot/controllers/backend"
	"foodspot/controllers/frontend"

	"github.com/astaxie/beego"
)

func init() {
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
	beego.Router("/backoffice/menu-details/:id([0-9]+)", &backend_controllers.MenuDetailsController{})
	beego.Router("/backoffice/menu-details/data/:id([0-9]+)", &backend_controllers.MenuDetailsController{}, "get:GetMenuDetails;post:EditMenuDetail")
	beego.Router("/backoffice/menu-details/delete", &backend_controllers.MenuDetailsController{}, "post:DeleteMenuDetail")

	// frontend template
	beego.Router("/", &frontend_controllers.TopController{})
	beego.Router("/index", &frontend_controllers.TopController{})
	beego.Router("/index/menu", &frontend_controllers.TopController{}, "post:MenuDetail")
	//beego.Router("/shop/:id([0-9]+)", &frontend_controllers.ShopController{})

}
