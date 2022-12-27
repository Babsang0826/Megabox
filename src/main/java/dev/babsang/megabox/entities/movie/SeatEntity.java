package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class SeatEntity {
    private int index;
    private String column;
    private int row;
    private int auditoriumIndex;


    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public void setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SeatEntity that = (SeatEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
