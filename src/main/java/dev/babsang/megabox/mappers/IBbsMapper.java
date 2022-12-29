package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IBbsMapper {
    // 게시판 아이디 확인 과정
    BoardsEntity selectBoardById(@Param(value = "id") String id);

    int insertArticle(ArticleEntity article);

    ArticleEntity selectArticleByIndex(@Param(value = "index") int index);

    int updateArticle(ArticleEntity article);

    ArticleEntity[] selectArticle();
}
