package models

import (
	"time"

	"github.com/apdo/server/utils"
)

type NoteVisibility string

const (
	PUBLIC  NoteVisibility = "public"
	PRIVATE NoteVisibility = "private"
)

type Note struct {
	BaseModel
	Title      string         `json:"title"`
	Content    string         `json:"content"`
	Visibility NoteVisibility `json:"visibility"`
}

func NewNote() Note {
	now := time.Now()
	return Note{
		BaseModel: BaseModel{
			ID:        utils.GenerateID(7),
			CreatedAt: now,
			UpdatedAt: now,
			CreatedBy: "system",
		},
		Title:      "Default Title",
		Content:    "Default Content",
		Visibility: PUBLIC,
	}
}
