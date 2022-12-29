package dev.babsang.megabox.services;


import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.bbs.WriteResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IBbsMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public ArticleEntity[] getArticles() {
        return this.bbsMapper.selectArticle();
    }
}


