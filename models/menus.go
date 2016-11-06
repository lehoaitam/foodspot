package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

type Menus struct {
	Id            int
	Name          string    `orm:"size(128)" form:"Name" valid:"Required"`
	Shops         *Shops    `orm:"rel(fk)"`
	Image         string    `orm:"size(256)" form:"Image" valid:"Required"`
	ActiveFlg     byte	`orm:"default(1)"`
	DeleteFlg     byte	`orm:"default(0)"`
	Created       time.Time `orm:"auto_now_add;type(datetime)"`
	Updated       time.Time `orm:"auto_now;type(datetime)"`
}

func (m *Menus) Valid(v *validation.Validation) {

}

func (u *Menus) TableUnique() [][]string {
	return [][]string{
		[]string{"Name", "Shops"},
	}
}

func (m *Menus) Insert() (int64, error) {
	return orm.NewOrm().Insert(m);
}

func (m *Menus) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Menus) ReadOrCreate(field string, fields ...string) (bool, int64, error) {
	return orm.NewOrm().ReadOrCreate(m, field, fields...)
}

func (m *Menus) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Menus) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetMenus() orm.QuerySeter {
	var table Menus
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(Menus))
}