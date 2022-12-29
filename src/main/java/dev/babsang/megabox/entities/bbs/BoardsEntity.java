package dev.babsang.megabox.entities.bbs;

import java.util.Objects;

public class BoardsEntity {

    private String id;
    private String text;


    public String getId() {
        return id;
    }

    public BoardsEntity setId(String id) {
        this.id = id;
        return this;
    }

    public String getText() {
        return text;
    }

    public BoardsEntity setText(String text) {
        this.text = text;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BoardsEntity that = (BoardsEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
