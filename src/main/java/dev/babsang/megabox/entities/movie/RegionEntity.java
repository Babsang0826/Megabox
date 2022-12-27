package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class RegionEntity {
    private int index;
    private String text;

    public RegionEntity(int index, String text) {
        this.index = index;
        this.text = text;
    }

    public int getIndex() {
        return index;
    }

    public RegionEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getText() {
        return text;
    }

    public RegionEntity setText(String text) {
        this.text = text;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegionEntity that = (RegionEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
