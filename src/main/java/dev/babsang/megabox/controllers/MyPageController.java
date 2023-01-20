package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.models.PagingModel;
import dev.babsang.megabox.services.MyPageService;
import dev.babsang.megabox.vos.movie.BookingVo;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

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
            modelAndView = new ModelAndView("redirect:login");
        } else {
            modelAndView = new ModelAndView("myPage/myPage");

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
            Map<Integer, List<BookingVo>> bookingMap = new LinkedHashMap<>();
            for (BookingVo bookingHistory : bookingHistories) {
                if (!bookingMap.containsKey(bookingHistory.getScreenInfoIndex())) {
                    bookingMap.put(bookingHistory.getScreenInfoIndex(), new ArrayList<>());
                }
                bookingMap.get(bookingHistory.getScreenInfoIndex()).add(bookingHistory);
            }

            //좌석 해시코드 순으로 정렬
            for (Integer key : bookingMap.keySet()) {
                List<BookingVo> bookings = bookingMap.get(key);
                bookings = bookings.stream().sorted((o1, o2) -> {
                    String o1C = o1.getColumnText() + o1.getRow();
                    String o2C = o2.getColumnText() + o2.getRow();
                    return Integer.compare(o1C.hashCode(), o2C.hashCode());
                }).collect(Collectors.toList());
                bookingMap.replace(key, bookings);
            }

            //예매 최신순으로 HashMap keySet 정렬
            Object[] arr = bookingMap.keySet().toArray();
            List<Object> list = Arrays.asList(arr);
            Collections.reverse(list);
            Object[] reverseArr = list.toArray(arr);

            for (int i = 0; i < reverseArr.length; i++) {
                Object o = reverseArr[i];
                for (BookingVo bookingVo : bookingMap.get(o)) {
                    System.out.println(i + "번째의 bookingIndex : " + bookingVo.getIndex());
                }
                System.out.println("------");
            }

            modelAndView.addObject("sortedBookingMapKeySet", reverseArr);
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

    @RequestMapping(value = "myPage",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteMyPage(@SessionAttribute(value = "user", required = false) UserEntity user,
                               @RequestParam(value = "screenInfoIndex") int screenInfoIndex) {
        String userId = user.getId();
        Enum<?> result = this.myPageService.deleteBooking(screenInfoIndex, userId);

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
            modelAndView = new ModelAndView("redirect:login");
        } else {
            modelAndView = new ModelAndView("myPage/modify");
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
    public String deleteModify(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
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
            modelAndView = new ModelAndView("redirect:login");
        } else {
            modelAndView = new ModelAndView("myPage/recoverPassword");
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

    @RequestMapping(value = "bookingHistory",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBookingHistory(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;
        if (user == null) {
            modelAndView = new ModelAndView("redirect:login");
        } else {
            modelAndView = new ModelAndView("myPage/bookingHistory");


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
            Map<Integer, List<BookingVo>> bookingMap = new LinkedHashMap<>();
            for (BookingVo bookingHistory : bookingHistories) {
                if (!bookingMap.containsKey(bookingHistory.getScreenInfoIndex())) {
                    bookingMap.put(bookingHistory.getScreenInfoIndex(), new ArrayList<>());
                }
                bookingMap.get(bookingHistory.getScreenInfoIndex()).add(bookingHistory);
            }

            //좌석 해시코드 순으로 정렬
            for (Integer key : bookingMap.keySet()) {
                List<BookingVo> bookings = bookingMap.get(key);
                bookings = bookings.stream().sorted((o1, o2) -> {
                    String o1C = o1.getColumnText() + o1.getRow();
                    String o2C = o2.getColumnText() + o2.getRow();
                    return Integer.compare(o1C.hashCode(), o2C.hashCode());
                }).collect(Collectors.toList());
                bookingMap.replace(key, bookings);
            }

            //예매 최신순으로 HashMap keySet 정렬
            Object[] arr = bookingMap.keySet().toArray();
            List<Object> list = Arrays.asList(arr);
            Collections.reverse(list);
            Object[] reverseArr = list.toArray(arr);

            for (int i = 0; i < reverseArr.length; i++) {
                Object o = reverseArr[i];
                for (BookingVo bookingVo : bookingMap.get(o)) {
                    System.out.println(i + "번째의 bookingIndex : " + bookingVo.getIndex());
                }
                System.out.println("------");
            }

            modelAndView.addObject("sortedBookingMapKeySet", reverseArr);
            modelAndView.addObject("bookingHistories", bookingHistories);
            modelAndView.addObject("bookingMap", bookingMap);
        }
        return modelAndView;
    }

    @RequestMapping(value = "bookingHistory",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteBookingHistory(@SessionAttribute(value = "user", required = false) UserEntity user,
                               @RequestParam(value = "screenInfoIndex") int screenInfoIndex) {
        String userId = user.getId();
        Enum<?> result = this.myPageService.deleteBooking(screenInfoIndex, userId);

        JSONObject responseObject = new JSONObject();

        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @RequestMapping(value = "adminPage",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getAdminPage(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;
        if (user == null) {
            modelAndView = new ModelAndView("redirect:login");
        } else {
            modelAndView = new ModelAndView("myPage/adminPage");
        }

        return modelAndView;
    }

    @RequestMapping(value = "userManagement",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getManagement(UserEntity user,
                                      @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                      @RequestParam(value = "criterion", required = false) String criterion,
                                      @RequestParam(value = "keyword", required = false) String keyword,
                                      @SessionAttribute(value = "user", required = false) UserEntity signedUser,
                                      HttpServletResponse response) {

        ModelAndView modelAndView;

        if (signedUser == null) {
            modelAndView = new ModelAndView("redirect:login");
        }
        else {
            if (!signedUser.getAdminFlag()) {
                try {
                    response.setContentType("text/html; charset=utf-8");
                    PrintWriter w = response.getWriter();
                    w.write("<script>alert('권한이 없습니다.');history.go(-1);</script>");
                    w.flush();
                    w.close();
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }

            modelAndView = new ModelAndView("myPage/userManagement");

            page = Math.max(1, page);
            int totalCount = this.myPageService.getArticleCount(criterion, keyword);
            PagingModel paging = new PagingModel(totalCount, page);
            modelAndView.addObject("paging", paging);

            UserEntity[] users = this.myPageService.getArticles(paging, criterion, keyword); // 게시글
            modelAndView.addObject("users", users);
            modelAndView.addObject("userCount", totalCount);
        }

        return modelAndView;
    }

    @RequestMapping(value = "delete",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteDelete(UserEntity newUser) {
        Enum<?> result = this.myPageService.adminDeleteUser(newUser);
        JSONObject responseObject = new JSONObject();
        if(result == CommonResult.SUCCESS){
            responseObject.put("email",newUser.getEmail());
        }
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }
}
