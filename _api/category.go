package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/serverless-coding/frontend-nav/api/_pkg/db"
	"github.com/serverless-coding/frontend-nav/api/_pkg/dto"
	"github.com/serverless-coding/frontend-nav/api/_pkg/model"
)

func GetCategorys() ([]*model.Category, error) {
	category := db.Use(db.GetDB()).ReadDB().Category
	categorys, err := category.WithContext(context.Background()).
		Order(category.Rank).
		Find()
	if err != nil {
		return nil, err
	}

	return categorys, nil
}

type GetCategorysRes struct {
	dto.BaseRespose
	Data []*model.Category `json:"data,omitempty"`
}

func Categorys(w http.ResponseWriter, r *http.Request) {
	ls, _ := GetCategorys()
	res := GetCategorysRes{
		BaseRespose: dto.Success(),
		Data:        ls,
	}
	jv, _ := json.Marshal(res)
	fmt.Fprint(w, string(jv))
}
