package main

import (
	_ "foodspot/routers"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"time"
	"fmt"
)

func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL)

	orm.RegisterDataBase("default", "mysql", beego.AppConfig.String("mysqluser") + ":" + beego.AppConfig.String("mysqluser") + "@/" + beego.AppConfig.String("mysqldb") + "?charset=utf8")
	orm.SetMaxIdleConns("default", 30)
	orm.DefaultTimeLoc = time.UTC

	//orm.RegisterModelWithPrefix(beego.AppConfig.String("dbprefix"), new(models.Users), new(models.Shops))

	err := orm.RunSyncdb("default", false, true)
	if err != nil {
		fmt.Println(err)
	}
}

func main() {
	beego.Run()
}

