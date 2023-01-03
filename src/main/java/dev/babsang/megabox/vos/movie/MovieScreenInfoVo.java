package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.ScreenInfoEntity;

public class MovieScreenInfoVo extends ScreenInfoEntity {
    private String infoMovieTitle;  // movie 테이블 title
    private String infoMovieState;  // movie 테이블 state
    private String infoAudText;    // auditorium 상영지점

    private int infoBranchIndex;
    private String infoBranchText;  // 지점 text
    private String infoRegionText;  // 지역 text

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
}
