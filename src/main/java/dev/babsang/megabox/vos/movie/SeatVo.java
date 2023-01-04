package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.SeatEntity;

public class SeatVo extends SeatEntity {
    private int numberOfColumn;
    private String seatCode;

    public String getSeatCode() {
        return seatCode;
    }

    public void setSeatCode(String seatCode) {
        this.seatCode = seatCode;
    }

    public int getNumberOfColumn() {
        return numberOfColumn;
    }

    public void setNumberOfColumn(int numberOfColumn) {
        this.numberOfColumn = numberOfColumn;
    }
}
