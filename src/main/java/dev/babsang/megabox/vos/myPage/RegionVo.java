package dev.babsang.megabox.vos.myPage;

import dev.babsang.megabox.entities.movie.RegionEntity;

public class RegionVo extends RegionEntity {
    private String branchText;
    private String auditoriumText;

    private int auditoriumIndex;

    public String getBranchText() {
        return branchText;
    }

    public void setBranchText(String branchText) {
        this.branchText = branchText;
    }

    public String getAuditoriumText() {
        return auditoriumText;
    }

    public void setAuditoriumText(String auditoriumText) {
        this.auditoriumText = auditoriumText;
    }

    public int getAuditoriumIndex() {
        return auditoriumIndex;
    }

    public void setAuditoriumIndex(int auditoriumIndex) {
        this.auditoriumIndex = auditoriumIndex;
    }
}
