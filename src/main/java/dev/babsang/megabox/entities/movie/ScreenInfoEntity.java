package dev.babsang.megabox.entities.movie;

import java.util.Date;
import java.util.Objects;

public class ScreenInfoEntity {
    private int index;
    private int movieIndex;
    private int auditoriumIndex;
    private Date screenDate;
    private Date mvStartTime;
    private Date mvEndTime;

    public ScreenInfoEntity(int index, int movieIndex, int auditoriumIndex, Date screenDate, Date mvStartTime, Date mvEndTime) {
        this.index = index;
        this.movieIndex = movieIndex;
        this.auditoriumIndex = auditoriumIndex;
        this.screenDate = screenDate;
        this.mvStartTime = mvStartTime;
        this.mvEndTime = mvEndTime;
    }

    public int getIndex() {
        return index;
    }

    public ScreenInfoEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public int getMovieIndex() {
        return movieIndex;
    }

    public ScreenInfoEntity setMovieIndex(int movieIndex) {
        this.movieIndex = movieIndex;
        return this;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public ScreenInfoEntity setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
        return this;
    }

    public Date getScreenDate() {
        return screenDate;
    }

    public ScreenInfoEntity setScreenDate(Date screenDate) {
        this.screenDate = screenDate;
        return this;
    }

    public Date getMvStartTime() {
        return mvStartTime;
    }

    public ScreenInfoEntity setMvStartTime(Date mvStartTime) {
        this.mvStartTime = mvStartTime;
        return this;
    }

    public Date getMvEndTime() {
        return mvEndTime;
    }

    public ScreenInfoEntity setMvEndTime(Date mvEndTime) {
        this.mvEndTime = mvEndTime;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ScreenInfoEntity that = (ScreenInfoEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
