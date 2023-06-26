package query

import (
	"fmt"
	"testing"
)

func TestQueryCategory(t *testing.T) {
	cs, err := GetCategoryWithLink()
	if err != nil {
		t.Error(err)
	}
	fmt.Println(cs)
}
