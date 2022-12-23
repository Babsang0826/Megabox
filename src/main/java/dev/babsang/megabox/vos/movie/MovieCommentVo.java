package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.MovieCommentEntity;

public class MovieCommentVo extends MovieCommentEntity {
    private int commentCnt;

    public int getCommentCnt() {
        return commentCnt;
    }

    public void setCommentCnt(int commentCnt) {
        this.commentCnt = commentCnt;
    }
}
