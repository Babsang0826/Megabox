package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.ScreenInfoEntity;

public class MovieScreenInfoVo extends ScreenInfoEntity {
    private String infoMovieTitle;
    private String infoMovieState;
    private String infoAudText;

    private String infoBranchText;

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

    public String getInfoBranchText() {
        return infoBranchText;
    }

    public void setInfoBranchText(String infoBranchText) {
        this.infoBranchText = infoBranchText;
    }
}
