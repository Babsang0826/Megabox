package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.BookingEntity;

import java.util.Date;

public class BookingVo extends BookingEntity {
    private int movieIndex;
    private Date screenDate;
    private Date mvStartTime;

    private Date mvEndTime;
    private int auditoriumIndex;
    private String columnText;
    private int screenInfoIndex;
    private int row;
    private String title;
    private String screenType;
    private String moviePoster;
    private String auditoriumText;
    private int branchIndex;
    private String branchText;
    private int bookedCnt;
    private String dayOfWeek;

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public int getBookedCnt() {
        return bookedCnt;
    }

    public void setBookedCnt(int bookedCnt) {
        this.bookedCnt = bookedCnt;
    }

    @Override
    public int getScreenInfoIndex() {
        return screenInfoIndex;
    }

    @Override
    public void setScreenInfoIndex(int screenInfoIndex) {
        this.screenInfoIndex = screenInfoIndex;
    }

    public int getMovieIndex() {
        return movieIndex;
    }

    public void setMovieIndex(int movieIndex) {
        this.movieIndex = movieIndex;
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

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public void setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
    }

    public String getColumnText() {
        return columnText;
    }

    public void setColumnText(String columnText) {
        this.columnText = columnText;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getScreenType() {
        return screenType;
    }

    public void setScreenType(String screenType) {
        this.screenType = screenType;
    }

    public String getMoviePoster() {
        return moviePoster;
    }

    public void setMoviePoster(String moviePoster) {
        this.moviePoster = moviePoster;
    }

    public String getAuditoriumText() {
        return auditoriumText;
    }

    public void setAuditoriumText(String auditoriumText) {
        this.auditoriumText = auditoriumText;
    }

    public int getBranchIndex() {
        return branchIndex;
    }

    public void setBranchIndex(int branchIndex) {
        this.branchIndex = branchIndex;
    }

    public String getBranchText() {
        return branchText;
    }

    public void setBranchText(String branchText) {
        this.branchText = branchText;
    }

    public Date getMvEndTime() {
        return mvEndTime;
    }

    public void setMvEndTime(Date mvEndTime) {
        this.mvEndTime = mvEndTime;
    }
}
