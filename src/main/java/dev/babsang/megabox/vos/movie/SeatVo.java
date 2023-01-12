package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.SeatEntity;

public class SeatVo extends SeatEntity {
    private int numberOfColumn;

    public int getNumberOfColumn() {
        return numberOfColumn;
    }

    public void setNumberOfColumn(int numberOfColumn) {
        this.numberOfColumn = numberOfColumn;
    }
}
