package services

import (
	"context"
	"fmt"

	"github.com/apdo/server/models"
	"google.golang.org/api/iterator"
)

const USERS_COLLECTION string = "users"

func CreateUser(user models.User) {
	_, err := firestoreClient.Collection(USERS_COLLECTION).Doc(user.ID).Set(context.Background(), user)
	if err != nil {
		fmt.Printf("error occured on db-side: %s\n", err)
		return
	}
}

func UpdateUser(user models.User) error {
	_, err := firestoreClient.Collection(USERS_COLLECTION).Doc(user.ID).Set(context.Background(), user)
	if err != nil {
		return fmt.Errorf("error updating record: %w", err)
	}
	return nil
}

func DeleteUser(id string) error {
	_, err := firestoreClient.Collection(USERS_COLLECTION).Doc(id).Delete(context.Background())
	if err != nil {
		return fmt.Errorf("error updating record: %w", err)
	}
	return nil
}

func FindManyUsers() []models.User {
	iter := firestoreClient.Collection(USERS_COLLECTION).Documents(context.Background())
	var users []models.User
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var user models.User
		doc.DataTo(&user)
		users = append(users, user)
	}
	return users
}

func FindUserByField(field, value string) (*models.User, error) {
	iter := firestoreClient.Collection(USERS_COLLECTION).
		Where(field, "==", value).
		Documents(context.Background())

	doc, err := iter.Next()
	if err != nil {
		if err == iterator.Done {
			return nil, fmt.Errorf("record not found")
		}
		return nil, err
	}

	var user models.User
	if err := doc.DataTo(&user); err != nil {
		return nil, err
	}

	return &user, nil
}

func FindUserByID(id string) (*models.User, error) {
	doc, err := firestoreClient.Collection(USERS_COLLECTION).Doc(id).Get(context.Background())
	if err != nil {
		return nil, fmt.Errorf("record not found: %w", err)
	}
	var user models.User
	doc.DataTo(&user)
	return &user, nil
}

func FindManyUsersByField(field, value string) []models.User {
	iter := firestoreClient.Collection(USERS_COLLECTION).Where(field, "==", value).Documents(context.Background())
	var users []models.User
	for {
		doc, err := iter.Next()
		if err != nil {
			break
		}
		var user models.User
		doc.DataTo(&user)
		users = append(users, user)
	}
	return users
}
