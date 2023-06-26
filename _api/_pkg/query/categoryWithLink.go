package query

import (
	"github.com/serverless-coding/frontend-nav/api/_pkg/db"
	"github.com/serverless-coding/frontend-nav/api/_pkg/model"
	"gorm.io/gorm"
)

type CategoryWithLink struct {
	model.Category
	Links []*model.Link `gorm:"foreignKey:Cid" json:"links"`
}

func GetCategoryWithLink(dbs ...*gorm.DB) (res []*CategoryWithLink, err error) {
	d := db.GetDB(dbs...)
	err = d.Preload("Links", "public=true").Order("rank").Find(&res).Error
	if err != nil {
		return nil, err
	}
	return
}
