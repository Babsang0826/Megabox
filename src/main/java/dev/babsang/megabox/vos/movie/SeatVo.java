package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.SeatEntity;

public class SeatVo extends SeatEntity {
    private int numberOfColumn;

    private int countSeatAll;

    public int getNumberOfColumn() {
        return numberOfColumn;
    }

    public void setNumberOfColumn(int numberOfColumn) {
        this.numberOfColumn = numberOfColumn;
    }

    public int getCountSeatAll() {
        return countSeatAll;
    }

    public void setCountSeatAll(int countSeatAll) {
        this.countSeatAll = countSeatAll;
    }
}
