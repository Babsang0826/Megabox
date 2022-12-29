package dev.babsang.megabox.entities.bbs;

import java.util.Date;
import java.util.Objects;

public class ArticleEntity {
    private int index;
    private String boardId;
    private String sort;

    private String region;
    private String branch;
    private String title;
    private String content;
    private Date writtenOn;
    private Date modifiedOn;

    public int getIndex() {
        return index;
    }

    public ArticleEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public String getBoardId() {
        return boardId;
    }

    public ArticleEntity setBoardId(String boardId) {
        this.boardId = boardId;
        return this;
    }

    public String getSort() {
        return sort;
    }

    public ArticleEntity setSort(String sort) {
        this.sort = sort;
        return this;
    }

    public String getRegion() {
        return region;
    }

    public ArticleEntity setRegion(String region) {
        this.region = region;
        return this;
    }

    public String getBranch() {
        return branch;
    }

    public ArticleEntity setBranch(String branch) {
        this.branch = branch;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public ArticleEntity setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getContent() {
        return content;
    }

    public ArticleEntity setContent(String content) {
        this.content = content;
        return this;
    }

    public Date getWrittenOn() {
        return writtenOn;
    }

    public ArticleEntity setWrittenOn(Date writtenOn) {
        this.writtenOn = writtenOn;
        return this;
    }

    public Date getModifiedOn() {
        return modifiedOn;
    }

    public ArticleEntity setModifiedOn(Date modifiedOn) {
        this.modifiedOn = modifiedOn;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArticleEntity that = (ArticleEntity) o;
        return index == that.index;
    }

    @Override
    public int hashCode() {
        return Objects.hash(index);
    }
}
