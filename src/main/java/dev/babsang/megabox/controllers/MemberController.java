package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.KakaoUserEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.services.MemberService;
import org.apache.catalina.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;


@Controller(value = "dev.babsang.megabox.controllers.MemberController")
@RequestMapping(value = "member")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @RequestMapping(value = "register", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getRegister() {
        ModelAndView modelAndView = new ModelAndView("member/register");

        return modelAndView;
    }

    @RequestMapping(value = "email",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postEmail(UserEntity user, EmailAuthEntity emailAuth) throws NoSuchAlgorithmException, MessagingException {
        Enum<?> result = this.memberService.sendEmailAuth(user, emailAuth);

        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("salt", emailAuth.getSalt());
        }
        return responseObject.toString();
    }

    @RequestMapping(value = "email",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchEmail(EmailAuthEntity emailAuth) {

        Enum<?> result = this.memberService.verifyEmailAuth(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("email", emailAuth.getEmail());
        }
        return responseObject.toString();
    }


    @RequestMapping(value = "register",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRegister(UserEntity user, UserEntity newUser) {

        Enum<?> result = this.memberService.register(user, newUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }


    //    아이디 중복검사
    @RequestMapping(value = "register",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String PatchId(UserEntity user) {
        Enum<?> result = this.memberService.idDuplicated(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @RequestMapping(value = "login", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getLogin() {
        ModelAndView modelAndView = new ModelAndView("member/login");


        return modelAndView;
    }

    @RequestMapping(value = "login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postLogin(HttpSession session, UserEntity user) {
        Enum<?> result = this.memberService.login(user);
        if (result == CommonResult.SUCCESS) {
            session.setAttribute("user", user);
        } else {
            System.out.println("비밀번/비밀번호 틀림");
        }
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @RequestMapping(value = "userIdFind", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getUserIdFind() {
        ModelAndView modelAndView = new ModelAndView("member/userIdFind");
        return modelAndView;
    }

    @RequestMapping(value = "userIdFind", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRecoverId(UserEntity user) {
        Enum<? extends IResult> result = this.memberService.recoverId(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("id", user.getId());
            responseObject.put("name", user.getName());
        }
        return responseObject.toString();
    }

    @RequestMapping(value = "userPasswordFind", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getUserPasswordFind() {
        ModelAndView modelAndView = new ModelAndView("member/userPasswordFind");
        return modelAndView;
    }

    @RequestMapping(value = "userPasswordFind", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRecoverPassword(UserEntity user) {
        Enum<? extends IResult> result = this.memberService.recoverPassword(user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("password", user.getPassword());
            responseObject.put("name", user.getName());
            responseObject.put("id", user.getId());
            responseObject.put("contact", user.getContact());
        }
        return responseObject.toString();
    }

    // 비밀번호 재설정 페이지
    @RequestMapping(value = "userPasswordReset", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getUserPasswordReset() {
        ModelAndView modelAndView = new ModelAndView("member/userPasswordReset");
        return modelAndView;
    }

    @RequestMapping(value = "userPasswordReset",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postUserPasswordReset(EmailAuthEntity emailAuth) throws MessagingException {
        Enum<? extends IResult> result = this.memberService.recoverPasswordSend(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("index", emailAuth.getIndex());
        }
        return responseObject.toString();
    }

    @RequestMapping(value = "recoverPasswordEmail",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public ModelAndView getRecoverPasswordEmail(EmailAuthEntity emailAuth) {
        Enum<?> result = this.memberService.recoverPasswordAuth(emailAuth);
        ModelAndView modelAndView = new ModelAndView("member/recoverPasswordEmail");
        modelAndView.addObject("result", result.name());

        return modelAndView;
    }

    @RequestMapping(value = "recoverPasswordEmail",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRecoverPasswordEmail(EmailAuthEntity emailAuth) {
        Enum<?> result = this.memberService.recoverPasswordCheck(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("code", emailAuth.getCode());
            responseObject.put("salt", emailAuth.getSalt());
        }
        return responseObject.toString();
    }

    @RequestMapping(value = "userPasswordReset",
            method = RequestMethod.PATCH,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchRecoverPassword(EmailAuthEntity emailAuth, UserEntity user) {
        Enum<?> result = this.memberService.updatePassword(emailAuth, user);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @GetMapping(value = "kakao", produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public ModelAndView getKakao(@RequestParam(value = "code") String code,
                                 @RequestParam(value = "error", required = false) String error,
                                 @RequestParam(value = "error_description", required = false) String errorDescription,
                                 HttpSession session) throws IOException {
        String accessToken = this.memberService.getKakaoAccessToken(code);
        UserEntity user = this.memberService.getKakaoUserInfo(accessToken);

        session.setAttribute("user", user);
        return new ModelAndView("member/kakao");
    }

    @GetMapping(value = "logout")
    public ModelAndView getLogOut(HttpSession session) {
        session.setAttribute("user", null);
        session.invalidate();
        return new ModelAndView("redirect:/");
    }

//    @RequestMapping(value = "logout",
//            method = RequestMethod.GET,
//            produces = MediaType.TEXT_HTML_VALUE)
//    public ModelAndView getLogout(HttpSession session) {
//        session.setAttribute("user", null);
//        ModelAndView modelAndView = new ModelAndView("redirect:login");
//        return modelAndView;
//    }


}