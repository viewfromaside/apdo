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
import com.viewfromaside.apdo.model.User;

@Service
public class UserService {
    
    private static final String COLLECTION_NAME = "users";

    public Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }

    public String createUser(User user) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = this.getFirestore()
            .collection(COLLECTION_NAME)
            .document(user.getId())
            .set(user);
        return future.get().getUpdateTime().toString();
    }

    public User getUserById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = this.getFirestore().collection(COLLECTION_NAME).document(id);
        DocumentSnapshot document = docRef.get().get();
        if (document.exists()) {
            return document.toObject(User.class);
        }
        return null;
    }

    public List<User> getUsersByField(String field, Object value) throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = this.getFirestore()
                    .collection(COLLECTION_NAME)
                    .whereEqualTo(field, value)
                    .get();
                    
        return future.get().getDocuments().stream()
                    .map(doc -> doc.toObject(User.class))
                    .collect(Collectors.toList());
    }

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        ApiFuture<QuerySnapshot> future = this.getFirestore().collection(COLLECTION_NAME).get();
        return future.get().getDocuments().stream()
                    .map(doc -> doc.toObject(User.class))
                    .collect(Collectors.toList());
    }
    
    public String updateUser(User user) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> future = this.getFirestore().collection(COLLECTION_NAME).document(user.getId()).set(user);
        return future.get().getUpdateTime().toString();
    }

    public String deleteUser(String id) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> writeResult = this.getFirestore().collection(COLLECTION_NAME).document(id).delete();
        return writeResult.get().getUpdateTime().toString();
    }

}
