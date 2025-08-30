package services

import (
	"context"
	"fmt"
	"time"

	"github.com/apdo/server/models"
	"google.golang.org/api/iterator"
)

const NOTES_COLLECTION string = "notes"

func CreateNote(note models.Note) {
	_, err := firestoreClient.Collection(NOTES_COLLECTION).Doc(note.ID).Set(context.Background(), note)
	if err != nil {
		fmt.Printf("error occured on db-side: %s\n", err)
		return
	}
}

func UpdateNote(note models.Note) error {
	note.UpdatedAt = time.Now()
	_, err := firestoreClient.Collection(NOTES_COLLECTION).Doc(note.ID).Set(context.Background(), note)
	if err != nil {
		return fmt.Errorf("error updating record: %w", err)
	}
	return nil
}

func DeleteNote(id string) error {
	_, err := firestoreClient.Collection(NOTES_COLLECTION).Doc(id).Delete(context.Background())
	if err != nil {
		return fmt.Errorf("error updating record: %w", err)
	}
	return nil
}

func FindManyNotes() ([]models.Note, error) {
	iter := firestoreClient.Collection(NOTES_COLLECTION).Documents(context.Background())
	var notes []models.Note
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var note models.Note
		if err := doc.DataTo(&note); err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}
	return notes, nil
}

func FindNoteByID(id string) (*models.Note, error) {
	doc, err := firestoreClient.Collection(NOTES_COLLECTION).Doc(id).Get(context.Background())
	if err != nil {
		return nil, fmt.Errorf("record not found: %w", err)
	}
	var note models.Note
	doc.DataTo(&note)
	return &note, nil
}

func FindManyNotesByField(field, value string) ([]models.Note, error) {
	iter := firestoreClient.Collection(NOTES_COLLECTION).Where(field, "==", value).Documents(context.Background())
	var notes []models.Note
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var note models.Note
		if err := doc.DataTo(&note); err != nil {
			return nil, err
		}
		notes = append(notes, note)
	}
	return notes, nil
}
