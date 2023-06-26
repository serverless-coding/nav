package query

import (
	"os"
	"testing"

	"github.com/serverless-coding/frontend-nav/api/_pkg/util"
	"gopkg.in/ini.v1"
	"gopkg.in/yaml.v3"
)

func init() {
	yf, err := os.ReadFile("../../../.env")
	if err != nil {
		panic(err)
	}
	var config interface{}
	_ = yaml.Unmarshal(yf, &config)

	cfg, err := ini.Load("../../../.env")
	if err != nil {
		panic(err)
	}

	os.Setenv("DATABASE_URL", cfg.Section("").Key("DATABASE_URL").String())

	util.Init()
}

func TestMain(m *testing.M) {
	m.Run()
}
