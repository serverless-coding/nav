package handler

import (
	"context"
	"fmt"
	"os"
	"testing"

	"github.com/serverless-coding/frontend-nav/api/_pkg/db"
	"github.com/serverless-coding/frontend-nav/api/_pkg/model"
	"github.com/serverless-coding/frontend-nav/api/_pkg/query"
	"github.com/serverless-coding/frontend-nav/api/_pkg/util"
	"gopkg.in/ini.v1"
	"gopkg.in/yaml.v3"
)

func init() {
	yf, err := os.ReadFile("../.env")
	if err != nil {
		panic(err)
	}
	var config interface{}
	_ = yaml.Unmarshal(yf, &config)

	cfg, err := ini.Load("../.env")
	if err != nil {
		panic(err)
	}

	os.Setenv("DATABASE_URL", cfg.Section("").Key("DATABASE_URL").String())

	util.Init()
}

func GetLinks() ([]*model.Link, error) {
	link := db.Use(db.GetDB()).ReadDB().Link
	links, err := link.WithContext(context.Background()).
		Where(link.Public.Is(true), link.Status.Eq(1)).Order(link.Rank).Find()
	if err != nil {
		return nil, err
	}

	return links, nil
}

func TestLink(t *testing.T) {
	ls, err := GetLinks()
	if err != nil {
		t.Errorf("err:%+v", err)
	}

	fmt.Println(ls)
}

func TestQueryCatego(t *testing.T) {
	cs, err := query.GetCategoryWithLink()
	if err != nil {
		t.Error(err)
	}
	fmt.Println(cs)
}
