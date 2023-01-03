package dev.babsang.megabox.services;


import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.entities.bbs.ImageEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.bbs.ArticleDeleteResult;
import dev.babsang.megabox.enums.bbs.ModifyArticleResult;
import dev.babsang.megabox.enums.bbs.WriteResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IBbsMapper;
import dev.babsang.megabox.models.PagingModel;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service(value = "dev.babsang.megabox.services.BbsService")
public class BbsService {

    private final IBbsMapper bbsMapper;

    @Autowired BbsService(IBbsMapper bbsMapper) {
        this.bbsMapper = bbsMapper;
    }

    public BoardsEntity getBoard(String id) {
        return this.bbsMapper.selectBoardById(id);
    }

    //     게시판 insert
    @Transactional
    public Enum<? extends IResult> write(ArticleEntity article) {
        BoardsEntity board = this.bbsMapper.selectBoardById(article.getBoardId());

        if (board == null) {
            return WriteResult.NO_SUCH_BOARD;
        }
        return this.bbsMapper.insertArticle(article) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }


    public ArticleEntity getArticle(int index) {
        return this.bbsMapper.selectArticleByIndex(index);
    }

//    public ArticleEntity[] getArticles() {
//        return this.bbsMapper.selectArticle();
//    }
    public BbsIndexCountVo[] getArticleIndex() {
        return this.bbsMapper.selectArticleIndex();
    }

    public BbsIndexCountVo getArticleIndex1() {
        return this.bbsMapper.selectArticleIndex1();
    }


// 이미지 넣기
    public Enum<? extends IResult> addImage(ImageEntity image) {
        return this.bbsMapper.insertImage(image) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public ImageEntity getImage(int index) {
        return this.bbsMapper.selectImageByIndex(index);
    }


    //게시글 삭제
    public Enum<? extends IResult> deleteArticle(UserEntity user, ArticleEntity article) {
        ArticleEntity existingArticle = this.bbsMapper.selectArticleByIndex(article.getIndex());

        System.out.println(existingArticle.getIndex() + "게시글번호");
        if(existingArticle == null) {
            return ArticleDeleteResult.NO_SUCH_ARTICLE;
        }
        if (user == null) {
            return ArticleDeleteResult.NOT_ALLOWED;
        }
        return this.bbsMapper.deleteArticleByIndex(existingArticle.getIndex()) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    //게시글 수정
    public Enum<? extends IResult> prepareModifyArticle(ArticleEntity article, UserEntity user) {
        if (user == null) {
            return ModifyArticleResult.NOT_SIGNED;
        }
        ArticleEntity existingArticle = this.bbsMapper.selectArticleByIndex(article.getIndex());
        if (existingArticle == null) {
            return ModifyArticleResult.NO_SUCH_ARTICLE;
        }
        if (!existingArticle.getUserId().equals(user.getId())) {
            return ModifyArticleResult.NOT_ALLOWED;
        }
        article.setIndex(existingArticle.getIndex());
        article.setBoardId(existingArticle.getBoardId());
        article.setUserId(existingArticle.getUserId());
        article.setSort(existingArticle.getSort());
        article.setRegion(existingArticle.getRegion());
        article.setBranch(existingArticle.getBranch());
        article.setTitle(existingArticle.getTitle());
        article.setContent(existingArticle.getContent());
        article.setWrittenOn(existingArticle.getWrittenOn());
        article.setModifiedOn(existingArticle.getModifiedOn());
        return CommonResult.SUCCESS;
    }

    public Enum<? extends IResult> modifyArticle(ArticleEntity article, UserEntity user) {
        if (user == null) {
            return ModifyArticleResult.NOT_SIGNED;
        }
        ArticleEntity existingArticle = this.bbsMapper.selectArticleByIndex(article.getIndex());
        if (existingArticle == null) {
            return ModifyArticleResult.NO_SUCH_ARTICLE;
        }
        if (!existingArticle.getUserId().equals(user.getId())) {
            return ModifyArticleResult.NOT_ALLOWED;
        }
        existingArticle.setSort(article.getSort());
        existingArticle.setRegion(article.getRegion());
        existingArticle.setBranch(article.getBranch());
        existingArticle.setTitle(article.getTitle());
        existingArticle.setContent(article.getContent());
        existingArticle.setModifiedOn(new Date());
        return this.bbsMapper.updateArticle(existingArticle) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }


}


