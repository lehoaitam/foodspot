package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

type MenuDetails struct {
	Id            int
	Menus         *Menus    `orm:"rel(fk)"`
	Food          *Food     `orm:"rel(fk)"`
	Left	      int       `orm:"size(9)" form:"Left" valid:"Required"`
	Top	      int       `orm:"size(9)" form:"Top" valid:"Required"`
	Width 	      int       `orm:"size(9)" form:"Width" valid:"Required"`
	Height	      int       `orm:"size(9)" form:"Height" valid:"Required"`
	DeleteFlg     byte	`orm:"default(0)"`
	Created       time.Time `orm:"auto_now_add;type(datetime)"`
	Updated       time.Time `orm:"auto_now;type(datetime)"`
}

func (m *MenuDetails) Valid(v *validation.Validation) {

}

func (m *MenuDetails) Insert() (int64, error) {
	return orm.NewOrm().Insert(m);
}

func (m *MenuDetails) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *MenuDetails) ReadOrCreate(field string, fields ...string) (bool, int64, error) {
	return orm.NewOrm().ReadOrCreate(m, field, fields...)
}

func (m *MenuDetails) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *MenuDetails) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetMenuDetails() orm.QuerySeter {
	var table Menus
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(MenuDetails))
}