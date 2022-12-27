package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class BranchEntity {
    private int index;
    private String text;
    private int regionIndex;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRegionIndex() {
        return regionIndex;
    }

    public void setRegionIndex(int regionIndex) {
        this.regionIndex = regionIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BranchEntity that = (BranchEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
