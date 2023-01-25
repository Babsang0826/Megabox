package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.MovieEntity;

import java.util.Date;

public class MovieVo extends MovieEntity {
    private double bookRate;
    private int totalAudience;
    private int rank;
    private int point;
    private Date bookingDate;

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    private int movieBranchIndex;

    private Date movieScreenDate;

    private String movieBranchText;

    public double getBookRate() {
        return bookRate;
    }

    public void setBookRate(double bookRate) {
        this.bookRate = bookRate;
    }

    public int getTotalAudience() {
        return totalAudience;
    }

    public void setTotalAudience(int totalAudience) {
        this.totalAudience = totalAudience;
    }

    public int getMovieBranchIndex() {
        return movieBranchIndex;
    }

    public void setMovieBranchIndex(int movieBranchIndex) {
        this.movieBranchIndex = movieBranchIndex;
    }

    public Date getMovieScreenDate() {
        return movieScreenDate;
    }

    public void setMovieScreenDate(Date movieScreenDate) {
        this.movieScreenDate = movieScreenDate;
    }

    public String getMovieBranchText() {
        return movieBranchText;
    }

    public void setMovieBranchText(String movieBranchText) {
        this.movieBranchText = movieBranchText;
    }
}
