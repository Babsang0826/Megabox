package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class BookingEntity {
    private int index;
    private int screenInfoIndex;
    private String userId;
    private int seatIndex;
    private int payment;

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getScreenInfoIndex() {
        return screenInfoIndex;
    }

    public void setScreenInfoIndex(int screenInfoIndex) {
        this.screenInfoIndex = screenInfoIndex;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getSeatIndex() {
        return seatIndex;
    }

    public void setSeatIndex(int seatIndex) {
        this.seatIndex = seatIndex;
    }

    public int getPayment() {
        return payment;
    }

    public void setPayment(int payment) {
        this.payment = payment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookingEntity that = (BookingEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
