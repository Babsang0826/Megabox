package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.entities.bbs.ImageEntity;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.bbs.PrevNextVo;
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

    PrevNextVo[] selectArticleByIndexNext(@Param(value = "index") int index);
    // 0개가 돌아왔다 : 게시글 없음
    // 1개가 돌아왔다 : 이전/이후 게시글 없음
    // 2개가 돌아왔다 :
    //   - 첫번째 객체 index가 두번째 객체 index보다 작을때 : 가장 첫글을 읽었다 (이전은 없고 다음은 있고)
    //   - 첫번째 객체 index가 두번째 객체 index보다 클때 : 가장 마지막글을 읽었다 (이전은 있고 다음은 없고)
    // 3개가 돌아왔다 : 이전/이후 있으니까 그냥 보여주기


    //페이징
    int selectArticleCountByBoardId(@Param(value = "boardId") String boardId,
                                    @Param(value = "criterion") String criterion,
                                    @Param(value = "keyword") String keyword);

    ArticleEntity[] selectArticlesByBoardId(@Param(value = "boardId") String boardId,
                                            @Param(value = "limit") int limit,
                                            @Param(value = "offset") int offset,
                                            @Param(value = "criterion") String criterion,
                                            @Param(value = "keyword") String keyword);



}
