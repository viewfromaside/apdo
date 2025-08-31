package services

import (
	"context"
	"fmt"

	"github.com/apdo/server/models"
	"google.golang.org/api/iterator"
)

const COLORS_COLLECTION string = "colors"

func CreateColor(color models.Color) {
	_, err := firestoreClient.Collection(COLORS_COLLECTION).Doc(color.ID).Set(context.Background(), color)
	if err != nil {
		fmt.Printf("error occured on db-side: %s\n", err)
		return
	}
}

func UpdateColor(color models.Color) error {
	_, err := firestoreClient.Collection(COLORS_COLLECTION).Doc(color.ID).Set(context.Background(), color)
	if err != nil {
		return fmt.Errorf("error updating record: %w", err)
	}
	return nil
}

func FindColorByField(field, value string) (*models.Color, error) {
	iter := firestoreClient.Collection(COLORS_COLLECTION).
		Where(field, "==", value).
		Documents(context.Background())

	doc, err := iter.Next()
	if err != nil {
		if err == iterator.Done {
			return nil, fmt.Errorf("record not found")
		}
		return nil, err
	}

	var color models.Color
	if err := doc.DataTo(&color); err != nil {
		return nil, err
	}

	return &color, nil
}
