package com.viewfromaside.apdo.model;

import com.viewfromaside.apdo.enums.NoteVisibility;

public class Note extends BaseModel {
    private String title;
    private String content;
    private NoteVisibility visibility;

    public Note() {

    }

    public Note(String id, String title, String content, NoteVisibility visibility) {
        super();
        this.id = id;
        this.title = title;
        this.content = content;
        this.visibility = visibility;
    }

    public String getTitle() {
        return this.title;
    }
    
    public String getContent() {
        return this.content;
    }

    public NoteVisibility getVisibility() {
        return this.visibility;
    }
}
