package dev.babsang.megabox.vos.bbs;

import dev.babsang.megabox.entities.bbs.ArticleEntity;

public class BbsIndexCountVo extends ArticleEntity {
    private int indexCount;

    public int getIndexCount() {
        return indexCount;
    }

    public BbsIndexCountVo setIndexCount(int indexCount) {
        this.indexCount = indexCount;
        return this;
    }

}
