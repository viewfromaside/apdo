package models

import (
	"time"

	"github.com/apdo/server/utils"
)

type User struct {
	ID        string    `json:"id"`
	Active    bool      `json:"active"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at,omitempty"`
}

func NewUser() User {
	now := time.Now()
	return User{
		ID:        utils.GenerateID(7),
		Active:    true,
		Username:  "",
		Email:     "",
		Password:  "",
		CreatedAt: now,
	}
}
