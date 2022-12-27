package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class SeatEntity {
    private int index;
    private String column;
    private int row;
    private int auditoriumIndex;

    public SeatEntity(int index, String column, int row, int auditoriumIndex) {
        this.index = index;
        this.column = column;
        this.row = row;
        this.auditoriumIndex = auditoriumIndex;
    }

    public int getIndex() {
        return index;
    }

    public SeatEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getColumn() {
        return column;
    }

    public SeatEntity setColumn(String column) {
        this.column = column;
        return this;
    }

    public int getRow() {
        return row;
    }

    public SeatEntity setRow(int row) {
        this.row = row;
        return this;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public SeatEntity setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
        return this;
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
