package com.viewfromaside.apdo.service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.viewfromaside.apdo.model.Note;

@Service
public class NoteService {
    
    private static final String COLLECTION_NAME = "notes";

    public Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }

    public String createNote(Note note) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = this.getFirestore()
            .collection(COLLECTION_NAME)
            .document(note.getId())
            .set(note);
        return future.get().getUpdateTime().toString();
    }

    public Note getNoteById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = this.getFirestore().collection(COLLECTION_NAME).document(id);
        DocumentSnapshot document = docRef.get().get();
        if (document.exists()) {
            return document.toObject(Note.class);
        }
        return null;
    }

    public List<Note> getAllNotes() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = this.getFirestore().collection(COLLECTION_NAME).get();
        return future.get().getDocuments().stream()
                    .map(doc -> doc.toObject(Note.class))
                    .collect(Collectors.toList());
    }
    
    public String updateNote(Note note) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = this.getFirestore().collection(COLLECTION_NAME).document(note.getId()).set(note);
        return future.get().getUpdateTime().toString();
    }

    public String deleteNote(String id) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> writeResult = this.getFirestore().collection(COLLECTION_NAME).document(id).delete();
        return writeResult.get().getUpdateTime().toString();
    }
}
