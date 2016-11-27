package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

type Shops struct {
	Id            int
	Name          string    `orm:"size(128)" form:"Name" valid:"Required"`
	Users         *Users    `orm:"rel(fk)"`
	Image         string    `orm:"size(256)" form:"Image" valid:"Required"`
	Lat           float32   `orm:"size(9)" form:"Lat" valid:"Required"`
	Long          float32   `orm:"size(9)" form:"Long" valid:"Required"`
	ActiveFlg     byte	`orm:"default(1)"`
	DeleteFlg     byte	`orm:"default(0)"`
	Created       time.Time `orm:"auto_now_add;type(datetime)"`
	Updated       time.Time `orm:"auto_now;type(datetime)"`
}

func (m *Shops) Valid(v *validation.Validation) {

}

func (u *Shops) TableUnique() [][]string {
	return [][]string{
		[]string{"Name", "Users"},
	}
}

func (m *Shops) Insert() (int64, error) {
	return orm.NewOrm().Insert(m)
}

func (m *Shops) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Shops) ReadOrCreate(field string, fields ...string) (bool, int64, error) {
	return orm.NewOrm().ReadOrCreate(m, field, fields...)
}

func (m *Shops) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Shops) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetShops() orm.QuerySeter {
	var table Shops
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(Shops))
}