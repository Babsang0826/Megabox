package dev.babsang.megabox.vos.bbs;

import dev.babsang.megabox.entities.bbs.ArticleEntity;

public class PrevNextVo extends ArticleEntity {

    private String articlePrev;
    private String articleNext;


    public String getArticlePrev() {
        return articlePrev;
    }

    public PrevNextVo setArticlePrev(String articlePrev) {
        this.articlePrev = articlePrev;
        return this;
    }

    public String getArticleNext() {
        return articleNext;
    }

    public PrevNextVo setArticleNext(String articleNext) {
        this.articleNext = articleNext;
        return this;
    }

}
