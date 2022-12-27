package dev.babsang.megabox.entities.movie;

import java.util.Date;
import java.util.Objects;

public class MovieEntity {
    private int index;
    private String title;
    private String titleEn;
    private Date releaseDate;
    private Date endDate;
    private String summary;
    private String ageLimit;
    private String movieState;
    private String genre;
    private String director;
    private String actor;
    private int runningTime;
    private String screenType;
    private String moviePoster;
    private String backgroundImage;
    private int adultPrice;
    private int teenagerPrice;
    private int etcPrice;
    private double scoreAvg;

    public double getScoreAvg() {
        return scoreAvg;
    }

    public void setScoreAvg(double scoreAvg) {
        this.scoreAvg = scoreAvg;
    }

    public int getAdultPrice() {
        return adultPrice;
    }

    public void setAdultPrice(int adultPrice) {
        this.adultPrice = adultPrice;
    }

    public int getTeenagerPrice() {
        return teenagerPrice;
    }

    public void setTeenagerPrice(int teenagerPrice) {
        this.teenagerPrice = teenagerPrice;
    }

    public int getEtcPrice() {
        return etcPrice;
    }

    public void setEtcPrice(int etcPrice) {
        this.etcPrice = etcPrice;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleEn() {
        return titleEn;
    }

    public void setTitleEn(String titleEn) {
        this.titleEn = titleEn;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAgeLimit() {
        return ageLimit;
    }

    public void setAgeLimit(String ageLimit) {
        this.ageLimit = ageLimit;
    }

    public String getMovieState() {
        return movieState;
    }

    public void setMovieState(String movieState) {
        this.movieState = movieState;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public int getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(int runningTime) {
        this.runningTime = runningTime;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MovieEntity that = (MovieEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
