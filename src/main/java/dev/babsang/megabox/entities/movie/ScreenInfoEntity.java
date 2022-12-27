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


    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public int getMovieIndex() {
        return movieIndex;
    }

    public void setMovieIndex(int movieIndex) {
        this.movieIndex = movieIndex;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public void setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
    }

    public Date getScreenDate() {
        return screenDate;
    }

    public void setScreenDate(Date screenDate) {
        this.screenDate = screenDate;
    }

    public Date getMvStartTime() {
        return mvStartTime;
    }

    public void setMvStartTime(Date mvStartTime) {
        this.mvStartTime = mvStartTime;
    }

    public Date getMvEndTime() {
        return mvEndTime;
    }

    public void setMvEndTime(Date mvEndTime) {
        this.mvEndTime = mvEndTime;
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
