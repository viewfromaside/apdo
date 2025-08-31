package models

import "github.com/apdo/server/utils"

type Color struct {
	ID              string `json:"id"`
	NeutralColor    string `json:"neutral_color"`
	BackgroundColor string `json:"background_color"`
	AccentColor     string `json:"accent_color"`
	UserID          string `json:"user_id"`
}

func NewColor() Color {
	return Color{
		ID:              utils.GenerateID(7),
		NeutralColor:    "#eaeaea",
		BackgroundColor: "#1e1e1e",
		AccentColor:     "#ffb86c",
		UserID:          "",
	}
}
