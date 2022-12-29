package dev.babsang.megabox.controllers;


import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.bbs.WriteResult;
import dev.babsang.megabox.services.BbsService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.BbsController")
@RequestMapping(value = "bbs")
public class BbsController {
    private final BbsService bbsService;

    @Autowired
    public BbsController(BbsService bbsService) {
        this.bbsService = bbsService;
    }


    //극장->전체극장
    @RequestMapping(value = "theater-list", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getTheater() {
        ModelAndView modelAndView = new ModelAndView("bbs/theater-list");
        return modelAndView;
    }

    //공지사항 및 글쓰기

    @RequestMapping(value = "write",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getWrite(@SessionAttribute(value = "user", required = false) UserEntity user,
                                 @RequestParam(value = "bid", required = false) String bid) {

        ModelAndView modelAndView;

        if (user == null) {
            modelAndView = new ModelAndView("redirect:/member/login");
        } else {
            modelAndView = new ModelAndView("bbs/write");
            if (bid == null || this.bbsService.getBoard(bid) == null) {
                modelAndView.addObject("result", CommonResult.FAILURE.name());
            } else {
                modelAndView.addObject("result", CommonResult.SUCCESS.name());
                BoardsEntity board = bid == null ? null : this.bbsService.getBoard(bid);
                modelAndView.addObject("board", board.getText());
                modelAndView.addObject("bid", board.getId());
            }
        }
        return modelAndView;
    }

    @RequestMapping(value = "/write",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postArticle(@SessionAttribute(value = "user", required = false) UserEntity user,
                              @RequestParam(value = "bid", required = false) String bid,
                              ArticleEntity article) {

        Enum<?> result;
        if (user == null) {
            result = WriteResult.NOT_ALLOWED;
        } else if (bid == null) {
            result = WriteResult.NO_SUCH_BOARD;
        } else {
            article.setBoardId(bid);
            result = this.bbsService.write(article);
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("index", article.getIndex());
            responseObject.put("bid", article.getBoardId());

        }
        return responseObject.toString();
    }



    // 게시글 읽어오기
    @RequestMapping(value = "notice", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getNotice() {
        ModelAndView modelAndView = new ModelAndView("bbs/notice");
        ArticleEntity[] articles = this.bbsService.getArticles();
        modelAndView.addObject("articles", articles);
//        for (ArticleEntity article : articles) {
//            System.out.println("인덱스 : " + article.getIndex());
//            System.out.println("타이틀 : " + article.getTitle());
//            System.out.println("콘텐트 : " + article.getContent());
//        }
        return modelAndView;
    }

    @RequestMapping(value = "read",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getRead(@RequestParam(value = "aid", required = false) int aid) {

        ModelAndView modelAndView = new ModelAndView("bbs/read");

        ArticleEntity article = this.bbsService.getArticle(aid);

        modelAndView.addObject("article", article);

        modelAndView.addObject("board", this.bbsService.getBoard(article.getBoardId()));

        modelAndView.addObject(article.getIndex());

        return modelAndView;
    }


}
