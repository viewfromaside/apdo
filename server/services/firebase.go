package services

import (
	"context"
	"log"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/option"
)

var firestoreClient *firestore.Client

func InitFirestore() {
	ctx := context.Background()
	sa := option.WithCredentialsFile("firebaseServiceAccount.json")
	client, err := firestore.NewClient(ctx, "apdo-e2fc7", sa)
	if err != nil {
		log.Fatalf("erro on initialize firestore: %v", err)
	}
	firestoreClient = client
}
