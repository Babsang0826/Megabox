package dev.babsang.megabox.entities.movie;

import java.util.Date;
import java.util.Objects;

public class ReservationEntity {
    private int index;
    private int movieIndex;
    private String userId;
    private String regionCode;
    private int branchIndex;
    private Date date;
    private int seatIndex;
    private int auditoriumIndex;
    private int adultPrice;
    private int childPrice;
    private int etcPrice;

    public ReservationEntity(int index, int movieIndex, String userId, String regionCode, int branchIndex, Date date, int seatIndex, int auditoriumIndex, int adultPrice, int childPrice, int etcPrice) {
        this.index = index;
        this.movieIndex = movieIndex;
        this.userId = userId;
        this.regionCode = regionCode;
        this.branchIndex = branchIndex;
        this.date = date;
        this.seatIndex = seatIndex;
        this.auditoriumIndex = auditoriumIndex;
        this.adultPrice = adultPrice;
        this.childPrice = childPrice;
        this.etcPrice = etcPrice;
    }

    public int getIndex() {
        return index;
    }

    public ReservationEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public int getMovieIndex() {
        return movieIndex;
    }

    public ReservationEntity setMovieIndex(int movieIndex) {
        this.movieIndex = movieIndex;
        return this;
    }

    public String getUserId() {
        return userId;
    }

    public ReservationEntity setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public String getRegionCode() {
        return regionCode;
    }

    public ReservationEntity setRegionCode(String regionCode) {
        this.regionCode = regionCode;
        return this;
    }

    public int getBranchIndex() {
        return branchIndex;
    }

    public ReservationEntity setBranchIndex(int branchIndex) {
        this.branchIndex = branchIndex;
        return this;
    }

    public Date getDate() {
        return date;
    }

    public ReservationEntity setDate(Date date) {
        this.date = date;
        return this;
    }

    public int getSeatIndex() {
        return seatIndex;
    }

    public ReservationEntity setSeatIndex(int seatIndex) {
        this.seatIndex = seatIndex;
        return this;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public ReservationEntity setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
        return this;
    }

    public int getAdultPrice() {
        return adultPrice;
    }

    public ReservationEntity setAdultPrice(int adultPrice) {
        this.adultPrice = adultPrice;
        return this;
    }

    public int getChildPrice() {
        return childPrice;
    }

    public ReservationEntity setChildPrice(int childPrice) {
        this.childPrice = childPrice;
        return this;
    }

    public int getEtcPrice() {
        return etcPrice;
    }

    public ReservationEntity setEtcPrice(int etcPrice) {
        this.etcPrice = etcPrice;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationEntity that = (ReservationEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
