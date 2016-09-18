package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

type Categories struct {
	Id          int64
	Name        string    	`orm:"size(128)" form:"Name" valid:"Required"`
	Shops      	*Shops    	`orm:"rel(fk)"`
	ActiveFlg     byte		`orm:"default(1)"`
	DeleteFlg     byte		`orm:"default(0)"`
	Created     time.Time 	`orm:"auto_now_add;type(datetime)"`
	Updated     time.Time 	`orm:"auto_now;type(datetime)"`
}

func (u *Categories) Valid(v *validation.Validation) {

}

func (m *Categories) Insert() error {
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Categories) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Categories) ReadOrCreate(field string, fields ...string) (bool, int64, error) {
	return orm.NewOrm().ReadOrCreate(m, field, fields...)
}

func (m *Categories) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Categories) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetCategories() orm.QuerySeter {
	var table Categories
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(Categories))
}