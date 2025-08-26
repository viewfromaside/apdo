package com.viewfromaside.apdo.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.viewfromaside.apdo.model.Note;
import com.viewfromaside.apdo.service.NoteService;

@RestController
@RequestMapping("/notes")
public class NoteController {
    
    @Autowired
    private NoteService noteService;

    @PostMapping("/create")
    public String create(@RequestBody Note note) throws ExecutionException, InterruptedException {
        return this.noteService.createNote(note);
    }

    @GetMapping("/{id}")
    public Note get(@PathVariable String id) throws ExecutionException, InterruptedException {
        return this.noteService.getNoteById(id);
    }

    @GetMapping("/")
    public List<Note> getAll() throws ExecutionException, InterruptedException {
        return this.noteService.getAllNotes();
    }

    @PutMapping("/{id}")
    public String update(@PathVariable String id, @RequestBody Note note) throws ExecutionException, InterruptedException {
        note.setId(id);
        return this.noteService.updateNote(note);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) throws ExecutionException, InterruptedException {
        return this.noteService.deleteNote(id);
    }
}
