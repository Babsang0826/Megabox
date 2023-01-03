package dev.babsang.megabox.controllers;


import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.bbs.BoardsEntity;
import dev.babsang.megabox.entities.bbs.ImageEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.bbs.WriteResult;
import dev.babsang.megabox.services.BbsService;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Controller(value = "dev.babsang.megabox.controllers.BbsController")
@RequestMapping(value = "bbs")
public class BbsController {
    private final BbsService bbsService;

    @Autowired
    public BbsController(BbsService bbsService) {
        this.bbsService = bbsService;
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
            article.setUserId(user.getId());
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
        BbsIndexCountVo[] articles = this.bbsService.getArticleIndex();
        modelAndView.addObject("articles", articles);
        int articleCnt = 0;
        for (ArticleEntity article : articles) {
            articleCnt++;
        }
        modelAndView.addObject("articleCnt", articleCnt);

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

        modelAndView.addObject("aid", article.getIndex());

        return modelAndView;
    }

    // 이미지 넣기
    //이미지 다운로드 용
    @RequestMapping(value = "image", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getImage(@RequestParam(value = "id") int id) {
        ImageEntity image = this.bbsService.getImage(id);

        if (image == null) { //404일때
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", image.getFileMime());
        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
    }

    //이미지 넣기(업로드)
    @RequestMapping(value = "image",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postImage(@RequestParam(value = "upload") MultipartFile file) throws IOException {
        ImageEntity image = new ImageEntity();
        image.setFileName(file.getOriginalFilename());
        image.setFileMime(file.getContentType());
        image.setData(file.getBytes());

        Enum<?> result = this.bbsService.addImage(image);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("url", "http://localhost:8080/bbs/image?id=" + image.getIndex());
        }
        return responseObject.toString();
    }

    // 삭제
    @RequestMapping(value = "delete",
    method = RequestMethod.DELETE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteArticle(@SessionAttribute(value = "user", required = false) UserEntity user,
                                @RequestParam(value = "aid", required = false) int aid,
                                ArticleEntity article) {
        article.setIndex(aid);
        Enum<?> result = this.bbsService.deleteArticle(user, article);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        responseObject.put("aid", aid);

        return responseObject.toString();
    }


    @RequestMapping(value = "modify", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getModify(@SessionAttribute(value = "user", required = false) UserEntity user,
                                  @RequestParam(value = "aid") int aid) {
        ModelAndView modelAndView = new ModelAndView("bbs/modify");
        ArticleEntity article = new ArticleEntity();
        JSONObject responseObject = new JSONObject();
        article.setIndex(aid);
        Enum<?> result = this.bbsService.prepareModifyArticle(article, user);
        modelAndView.addObject("article", article);
        modelAndView.addObject("result", result.name());
        responseObject.put("aid", aid);
        if (result == CommonResult.SUCCESS) {
            modelAndView.addObject("board", this.bbsService.getBoard(article.getBoardId()));
        }
        return modelAndView;
    }
    @RequestMapping(value = "modify",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchModify(@SessionAttribute(value = "user", required = false) UserEntity user,
                              @RequestParam(value = "aid") int aid,
                              ArticleEntity article) {
        article.setIndex(aid);
        Enum<?> result = this.bbsService.modifyArticle(article, user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("aid", aid);
        }
        return responseObject.toString();
    }


}
