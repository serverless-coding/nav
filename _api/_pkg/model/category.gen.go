// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

import (
	"time"
)

const TableNameCategory = "category"

// Category mapped from table <category>
type Category struct {
	ID          string    `gorm:"column:id;primaryKey" json:"id"`
	Icon        string    `gorm:"column:icon;not null" json:"icon"`
	Title       string    `gorm:"column:title;not null" json:"title"`
	Description string    `gorm:"column:description;not null" json:"description"`
	Rank        int32     `gorm:"column:rank" json:"rank"`
	CreatedAt   time.Time `gorm:"column:created_at;not null;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at;not null;default:CURRENT_TIMESTAMP" json:"updated_at"`
}

// TableName Category's table name
func (*Category) TableName() string {
	return TableNameCategory
}