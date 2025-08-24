package com.viewfromaside.apdo.enums;

public enum NoteVisibility {
    PUBLIC("public"),
    PRIVATE("private");

    private final String value;

    NoteVisibility(String value) {
        this.value = value;
    }

    public static NoteVisibility fromValue(String value) {
        for (NoteVisibility v : values()) {
            if (v.value.equalsIgnoreCase(value)) {
                return v;
            }
        }
        throw new IllegalStateException("unknown NoteVisbility value: " + value);
    }

    public static NoteVisibility getDefault() {
        return PUBLIC;
    }
}
