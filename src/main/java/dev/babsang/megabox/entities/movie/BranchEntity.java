package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class BranchEntity {
    private int index;
    private String text;
    private int regionIndex;

    public BranchEntity(int index, String text, int regionIndex) {
        this.index = index;
        this.text = text;
        this.regionIndex = regionIndex;
    }

    public int getIndex() {
        return index;
    }

    public BranchEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getText() {
        return text;
    }

    public BranchEntity setText(String text) {
        this.text = text;
        return this;
    }

    public int getRegionIndex() {
        return regionIndex;
    }

    public BranchEntity setRegionIndex(int regionIndex) {
        this.regionIndex = regionIndex;
        return this;
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
