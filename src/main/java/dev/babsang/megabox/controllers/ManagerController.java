package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.models.PagingModel;
import dev.babsang.megabox.services.ManagerService;
import dev.babsang.megabox.services.MemberService;
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
    private final MemberService memberService;

    @Autowired
    public ManagerController(ManagerService managerService, MemberService memberMapper, MemberService memberService) {
        this.managerService = managerService;

        this.memberService = memberService;
    }

    @RequestMapping(value = "management", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getManagement(UserEntity user,
                                      @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                      @RequestParam(value = "criterion", required = false) String criterion,
                                      @RequestParam(value = "keyword", required = false) String keyword) {
        page = Math.max(1, page);
        ModelAndView modelAndView = new ModelAndView("manager/management");
        int totalCount = this.managerService.getArticleCount(criterion, keyword);
        PagingModel paging = new PagingModel(totalCount, page);
        modelAndView.addObject("paging", paging);


        UserEntity[] users = this.managerService.getArticles(paging, criterion, keyword); // 게시글
        modelAndView.addObject("users", users);
        modelAndView.addObject("userCount", totalCount);

        return modelAndView;
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteModify(UserEntity newUser) {
        Enum<?> result = this.managerService.deleteUser(newUser);
        JSONObject responseObject = new JSONObject();
        if(result == CommonResult.SUCCESS){
            responseObject.put("email",newUser.getEmail());
        }
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
