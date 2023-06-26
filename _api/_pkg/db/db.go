package db

import (
	"fmt"

	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	_db   *gorm.DB
	_once sync.Once
)

type Stdout struct {
}

func (Stdout) Printf(s string, args ...interface{}) {
	fmt.Printf("%s\n[info] "+s, args...)
}

func Init(url string, _ ...*gorm.Option) {
	_once.Do(func() {
		var err error
		_db, err = gorm.Open(postgres.Open(url), &gorm.Config{
			Logger: logger.New(Stdout{}, logger.Config{LogLevel: logger.Info}),
		})
		if err != nil {
			panic(fmt.Errorf("open db %q fail: %w", url, err))
		}
	})
}

func GetDB(dbs ...*gorm.DB) *gorm.DB {
	if len(dbs) == 0 {
		return _db
	}
	return dbs[0]
}
