package com.viewfromaside.apdo.dto;

import com.viewfromaside.apdo.enums.NoteVisibility;
import com.viewfromaside.apdo.model.Note;
import com.viewfromaside.apdo.utils.IDGenerator;

public class NoteDTO {
    private String title;
    private String content;
    private NoteVisibility visibility;

    public Note toModel() {
        return new Note(IDGenerator.random(7), this.title, this.content, this.visibility);
    }
}
