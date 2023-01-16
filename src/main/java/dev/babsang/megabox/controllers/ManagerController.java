package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.bbs.ArticleEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.models.PagingModel;
import dev.babsang.megabox.services.ManagerService;
import org.apache.catalina.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.ManagerController")
@RequestMapping(value = "manager")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @RequestMapping(value = "management", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getManagement(UserEntity user,
                                      @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                      @RequestParam(value = "criterion", required = false) String criterion,
                                      @RequestParam(value = "keyword", required = false) String keyword) {
        page = Math.max(1,page);
        ModelAndView modelAndView = new ModelAndView("manager/management");
        int totalCount = this.managerService.getArticleCount(criterion, keyword);
        PagingModel paging = new PagingModel(totalCount, page);
        modelAndView.addObject("paging", paging);
//        UserEntity[] users = this.managerService.getUserList();
//        modelAndView.addObject("users", users);

        UserEntity[] users = this.managerService.getArticles(paging, criterion, keyword); // 게시글
        modelAndView.addObject("users", users);
        modelAndView.addObject("userCount", totalCount);

        return modelAndView;
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteModify(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
        Enum<?> result = this.managerService.deleteUser(signedUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }
}
