package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.services.MyPageService;
import dev.babsang.megabox.vos.movie.BookingVo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;

@Controller(value = "dev.babsang.megabox.controllers.MyPageController")
@RequestMapping(value = "myPage")
public class MyPageController {
    private final MyPageService myPageService;

    @Autowired
    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    @RequestMapping(value = "myPage",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMyPage(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;

        if (user == null) {
            modelAndView = new ModelAndView("redirect:http://localhost:8080/member/login");
        }
        else {
            modelAndView = new ModelAndView("member/myPage");


            BookingEntity booking = this.myPageService.getMovieVosById(user.getId());
            BookingVo[] bookingHistories = this.myPageService.getBookingHistory(user.getId());

            if (booking == null) {
                modelAndView.addObject("point", 0);
            } else {
                modelAndView.addObject("point", booking.getPayment() / 200);
            }

            for (BookingVo bookingVo : bookingHistories) {
                //요일 추출
                SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");
                SimpleDateFormat monthFormat = new SimpleDateFormat("MM");
                SimpleDateFormat dayFormat = new SimpleDateFormat("dd");

                String year = yearFormat.format(bookingVo.getScreenDate());
                String month = monthFormat.format(bookingVo.getScreenDate());
                String day = dayFormat.format(bookingVo.getScreenDate());

                LocalDate date = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day));
                DayOfWeek dayOfWeek = date.getDayOfWeek();

                bookingVo.setDayOfWeek(dayOfWeek.getDisplayName(TextStyle.NARROW, Locale.KOREAN));
            }

            //예매 내역 그룹 짓기
            Map<Integer, List<BookingVo>> bookingMap = new HashMap<>();
            for (BookingVo bookingHistory : bookingHistories) {
                if (!bookingMap.containsKey(bookingHistory.getScreenInfoIndex())) {
                    bookingMap.put(bookingHistory.getScreenInfoIndex(), new ArrayList<>());
                }
                bookingMap.get(bookingHistory.getScreenInfoIndex()).add(bookingHistory);
            }

            modelAndView.addObject("bookingHistories", bookingHistories);
            modelAndView.addObject("bookingMap", bookingMap);
        }
        return modelAndView;
    }

    @RequestMapping(value = "myPage",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMyPage(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
        Enum<?> result = this.myPageService.myPageAuth(signedUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getModify(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;
        if (user == null) {
            modelAndView = new ModelAndView("redirect:http://localhost:8080/member/login");
        } else {
            modelAndView = new ModelAndView("member/myPage-modify");
        }

        return modelAndView;
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postModify(@SessionAttribute(value = "user", required = false) UserEntity signedUser,
                             UserEntity newUser) {
        JSONObject responseObject = new JSONObject();
        Enum<? extends IResult> result = this.myPageService.updateUser(signedUser, newUser);
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteMyPage(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
        Enum<?> result = this.myPageService.deleteUser(signedUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "email",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postEmail(UserEntity user, EmailAuthEntity emailAuth) throws NoSuchAlgorithmException, MessagingException {
        Enum<?> result = this.myPageService.sendEmailAuth(user, emailAuth);

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

        Enum<?> result = this.myPageService.verifyEmailAuth(emailAuth);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("email", emailAuth.getEmail());
        }
        return responseObject.toString();
    }

    @RequestMapping(value = "recoverPassword",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getChangePw(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;
        if (user == null) {
            modelAndView = new ModelAndView("redirect:http://localhost:8080/member/login");
        } else {
            modelAndView = new ModelAndView("member/myPage-modify");
        }

        return modelAndView;
    }

    @RequestMapping(value = "recoverPassword",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRecoverPassword(@SessionAttribute(value = "user") UserEntity signedUser, UserEntity newUser) {
        Enum<?> result = this.myPageService.updatePassword(signedUser, newUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }
}