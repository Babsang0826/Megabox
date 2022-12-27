package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class AuditoriumEntity {
    private int index;
    private int branchIndex;
    private String text;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getBranchIndex() {
        return branchIndex;
    }

    public void setBranchIndex(int branchIndex) {
        this.branchIndex = branchIndex;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuditoriumEntity that = (AuditoriumEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
