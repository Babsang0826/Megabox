package dev.babsang.megabox.entities.movie;

import java.util.Objects;

public class BookingEntity {
    private int index;
    private int screenInfoIndex;
    private String userId;
    private int seatIndex;
    private int payment;

    public BookingEntity(int index, int screenInfoIndex, String userId, int seatIndex, int payment) {
        this.index = index;
        this.screenInfoIndex = screenInfoIndex;
        this.userId = userId;
        this.seatIndex = seatIndex;
        this.payment = payment;
    }

    public int getIndex() {
        return index;
    }

    public BookingEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public int getScreenInfoIndex() {
        return screenInfoIndex;
    }

    public BookingEntity setScreenInfoIndex(int screenInfoIndex) {
        this.screenInfoIndex = screenInfoIndex;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public BookingEntity setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public int getSeatIndex() {
        return seatIndex;
    }

    public BookingEntity setSeatIndex(int seatIndex) {
        this.seatIndex = seatIndex;
        return this;
    }

    public int getPayment() {
        return payment;
    }

    public BookingEntity setPayment(int payment) {
        this.payment = payment;
        return this;
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
