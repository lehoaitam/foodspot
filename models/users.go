package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
)

type Users struct {
	Id            int
	Email         string    `orm:"size(128);unique" form:"Email" valid:"Required;Email"`
	Password      string    `orm:"size(64)" form:"Password" valid:"Required;MinSize(6)"`
	Repassword    string    `orm:"-" form:"Repassword" valid:"Required"`
	Lastlogintime time.Time `orm:"type(datetime);null" form:"-"`
	ActiveFlg     byte		`orm:"default(1)"`
	DeleteFlg     byte		`orm:"default(0)"`
	Created       time.Time `orm:"auto_now_add;type(datetime)"`
	Updated       time.Time `orm:"auto_now;type(datetime)"`
}

func (u *Users) Valid(v *validation.Validation) {
	if u.Password != u.Repassword {
		v.SetError("Repassword", "Does not matched password, repassword")
	}
}

func (m *Users) Insert() error {
	if _, err := orm.NewOrm().Insert(m); err != nil {
		return err
	}
	return nil
}

func (m *Users) Read(fields ...string) error {
	if err := orm.NewOrm().Read(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Users) ReadOrCreate(field string, fields ...string) (bool, int64, error) {
	return orm.NewOrm().ReadOrCreate(m, field, fields...)
}

func (m *Users) Update(fields ...string) error {
	if _, err := orm.NewOrm().Update(m, fields...); err != nil {
		return err
	}
	return nil
}

func (m *Users) Delete() error {
	if _, err := orm.NewOrm().Delete(m); err != nil {
		return err
	}
	return nil
}

func GetUsers() orm.QuerySeter {
	var table Users
	return orm.NewOrm().QueryTable(table).OrderBy("-Id")
}

func init() {
	orm.RegisterModelWithPrefix(
		beego.AppConfig.String("dbprefix"),
		new(Users))
}