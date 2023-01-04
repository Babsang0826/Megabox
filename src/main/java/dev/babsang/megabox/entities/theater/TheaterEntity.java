package dev.babsang.megabox.entities.theater;

import java.util.Objects;

public class TheaterEntity {
    private int index;
    private String text;
    private String title;

    private String secondTitle;
    private String floor;

    private String floorSecond;
    private String floorThird;
    private String address;
    private double latitude;
    private double longitude;
    private String parkingInformation;
    private String parkingConfirmation;
    private String parkingFee;
    private String transport;

    public int getIndex() {
        return index;
    }

    public TheaterEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getText() {
        return text;
    }

    public TheaterEntity setText(String text) {
        this.text = text;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public TheaterEntity setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getSecondTitle() {
        return secondTitle;
    }

    public TheaterEntity setSecondTitle(String secondTitle) {
        this.secondTitle = secondTitle;
        return this;
    }

    public String getFloor() {
        return floor;
    }

    public TheaterEntity setFloor(String floor) {
        this.floor = floor;
        return this;
    }

    public String getFloorSecond() {
        return floorSecond;
    }

    public TheaterEntity setFloorSecond(String floorSecond) {
        this.floorSecond = floorSecond;
        return this;
    }

    public String getFloorThird() {
        return floorThird;
    }

    public TheaterEntity setFloorThird(String floorThird) {
        this.floorThird = floorThird;
        return this;
    }


    public String getAddress() {
        return address;
    }

    public TheaterEntity setAddress(String address) {
        this.address = address;
        return this;
    }
    public double getLatitude() {
        return latitude;
    }

    public TheaterEntity setLatitude(double latitude) {
        this.latitude = latitude;
        return this;
    }

    public double getLongitude() {
        return longitude;
    }

    public TheaterEntity setLongitude(double longitude) {
        this.longitude = longitude;
        return this;
    }


    public String getParkingInformation() {
        return parkingInformation;
    }

    public TheaterEntity setParkingInformation(String parkingInformation) {
        this.parkingInformation = parkingInformation;
        return this;
    }

    public String getParkingConfirmation() {
        return parkingConfirmation;
    }

    public TheaterEntity setParkingConfirmation(String parkingConfirmation) {
        this.parkingConfirmation = parkingConfirmation;
        return this;
    }

    public String getParkingFee() {
        return parkingFee;
    }

    public TheaterEntity setParkingFee(String parkingFee) {
        this.parkingFee = parkingFee;
        return this;
    }

    public String getTransport() {
        return transport;
    }

    public TheaterEntity setTransport(String transport) {
        this.transport = transport;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TheaterEntity that = (TheaterEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
