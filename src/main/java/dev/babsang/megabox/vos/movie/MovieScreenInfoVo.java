package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.ScreenInfoEntity;

public class MovieScreenInfoVo extends ScreenInfoEntity {
    private String infoMovieTitle;  // movie 테이블 title
    private String infoMovieState;  // movie 테이블 state
    private String infoAudText;    // auditorium 상영지점

    private int infoBranchIndex;
    private String infoBranchText;  // 지점 text
    private String infoRegionText;  // 지역 text

    private  int runningTime;
    private String movieState;

    private String infoMovieAgeLimit;  // movie 나이 제한

    private String infoMoviePoster;

    private int movieIndex;

    private int seatIndex;

    private int seatRemain;

    private String moviePoster;

    public String getMoviePoster() {
        return moviePoster;
    }

    public void setMoviePoster(String moviePoster) {
        this.moviePoster = moviePoster;
    }

    public String getInfoMovieTitle() {
        return infoMovieTitle;
    }

    public void setInfoMovieTitle(String infoMovieTitle) {
        this.infoMovieTitle = infoMovieTitle;
    }

    public String getInfoMovieState() {
        return infoMovieState;
    }

    public void setInfoMovieState(String infoMovieState) {
        this.infoMovieState = infoMovieState;
    }

    public String getInfoAudText() {
        return infoAudText;
    }

    public void setInfoAudText(String infoAudText) {
        this.infoAudText = infoAudText;
    }

    public int getInfoBranchIndex() {
        return infoBranchIndex;
    }

    public void setInfoBranchIndex(int infoBranchIndex) {
        this.infoBranchIndex = infoBranchIndex;
    }

    public String getInfoBranchText() {
        return infoBranchText;
    }

    public void setInfoBranchText(String infoBranchText) {
        this.infoBranchText = infoBranchText;
    }

    public String getInfoRegionText() {
        return infoRegionText;
    }

    public void setInfoRegionText(String infoRegionText) {
        this.infoRegionText = infoRegionText;
    }
    public int getRunningTime() {
        return runningTime;
    }

    public MovieScreenInfoVo setRunningTime(int runningTime) {
        this.runningTime = runningTime;
        return this;
    }

    public String getMovieState() {
        return movieState;
    }

    public MovieScreenInfoVo setMovieState(String movieState) {
        this.movieState = movieState;
        return this;
    }

    public String getInfoMovieAgeLimit() {
        return infoMovieAgeLimit;
    }

    public void setInfoMovieAgeLimit(String infoMovieAgeLimit) {
        this.infoMovieAgeLimit = infoMovieAgeLimit;
    }

    public String getInfoMoviePoster() {
        return infoMoviePoster;
    }

    public void setInfoMoviePoster(String infoMoviePoster) {
        this.infoMoviePoster = infoMoviePoster;
    }

    public int getMovieIndex() {
        return movieIndex;
    }

    public void setMovieIndex(int movieIndex) {
        this.movieIndex = movieIndex;
    }

    public int getSeatIndex() {
        return seatIndex;
    }

    public MovieScreenInfoVo setSeatIndex(int seatIndex) {
        this.seatIndex = seatIndex;
        return this;
    }

    public int getSeatRemain() {
        return seatRemain;
    }

    public void setSeatRemain(int seatRemain) {
        this.seatRemain = seatRemain;
    }
}
