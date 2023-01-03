package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.entities.bbs.ImageEntity;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
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

    BbsIndexCountVo[] selectArticleIndex();
    BbsIndexCountVo selectArticleIndex1();


    // 이미지 넣기
    int insertImage(ImageEntity image);

    ImageEntity selectImageByIndex(@Param(value = "index") int index);

    int deleteArticleByIndex(@Param(value = "index") int index);

}
