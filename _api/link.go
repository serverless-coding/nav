package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/serverless-coding/frontend-nav/api/_pkg/dto"
	"github.com/serverless-coding/frontend-nav/api/_pkg/query"
	"github.com/serverless-coding/frontend-nav/api/_pkg/util"
)

func init() {
	util.Init()
}

type GetLinksRes struct {
	dto.BaseRespose
	Data []*query.CategoryWithLink `json:"data,omitempty"`
}

func Links(w http.ResponseWriter, r *http.Request) {
	cs, err := query.GetCategoryWithLink()
	if err != nil {
		fmt.Println("query category fail:", err)
	}
	res := GetLinksRes{
		BaseRespose: dto.Success(),
		Data:        cs,
	}
	jv, _ := json.Marshal(res)
	fmt.Fprint(w, string(jv))
}
