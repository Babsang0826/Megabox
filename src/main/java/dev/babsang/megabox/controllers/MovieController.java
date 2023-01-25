package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.services.MovieService;
import dev.babsang.megabox.services.MyPageService;
import dev.babsang.megabox.vos.movie.BookingVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.MovieVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Controller(value = "dev.babsang.megabox.controllers.MovieController")
@RequestMapping(value = "movie")
public class MovieController {
    private final MovieService movieService;
    private final MyPageService myPageService;

    @Autowired
    public MovieController(MovieService movieService, MyPageService myPageService) {
        this.movieService = movieService;
        this.myPageService = myPageService;
    }

    //movie
    @RequestMapping(value = "movie",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMovie(@RequestParam(value = "keyword", required = false) String keyword) {
        ModelAndView modelAndView = new ModelAndView("movie/movie");

        //전체 영화
//        MovieVo[] movies = this.movieService.getMovieVos();
        if (keyword == null) {
            keyword = "";
        }
        MovieVo[] movies = this.movieService.getMovieVosKeyword(keyword);
        BookingEntity[] booking = this.movieService.getBookings();
        for (MovieVo movie : movies) {
            MovieCommentEntity[] comments = this.movieService.getComments(movie.getIndex());

            double sum = 0D;
            for (MovieCommentEntity comment : comments) {
                sum += comment.getScore();
            }
            sum /= comments.length;
            sum = Math.round(sum * 10) / 10.0;

            movie.setScoreAvg(sum);

            double bookingRate = Math.round((double) movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

            movie.setBookRate(bookingRate);
        }

        modelAndView.addObject("movies", movies);

        //개봉 예정 영화
        MovieVo[] commingMovies = this.movieService.getCommingMovies();
        for (MovieVo movie : commingMovies) {
            MovieCommentEntity[] comments = this.movieService.getComments(movie.getIndex());

            double sum = 0D;
            for (MovieCommentEntity comment : comments) {
                sum += comment.getScore();
            }
            sum /= comments.length;
            sum = Math.round(sum * 10) / 10.0;

            movie.setScoreAvg(sum);

            double bookingRate = Math.round((double) movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

            movie.setBookRate(bookingRate);
        }
        modelAndView.addObject("commingMovies", commingMovies);

        return modelAndView;
    }

    //movie-detail
    @RequestMapping(value = "movie-detail",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMovieDetail(@RequestParam(value = "mid", required = false) int mid) {
        ModelAndView modelAndView = new ModelAndView("movie/movie-detail");

        MovieCommentEntity[] comments = this.movieService.getComments(mid);
        MovieVo[] movies = this.movieService.getMovieVos();
        MovieVo movie = this.movieService.getMovieVo(mid);
        BookingEntity[] booking = this.movieService.getBookings();
        if (comments == null) {
            modelAndView.addObject("result", CommonResult.FAILURE.name());
        } else {
            modelAndView.addObject("result", CommonResult.SUCCESS.name());
            modelAndView.addObject("comment", this.movieService.getComment(mid));
            modelAndView.addObject("movie", movie);
            double sum = 0D;
            int cnt = 0;
            for (MovieCommentEntity comment : comments) {
                sum += comment.getScore();
                cnt++;
            }
            sum /= comments.length;
            sum = Math.round(sum * 10) / 10.0;
            modelAndView.addObject("scoreAvg", sum);
            modelAndView.addObject("commentCnt", cnt);
            double bookingCnt = movie.getTotalAudience();
            double totalBookingCnt = booking.length;
            double bookingRate = Math.round(bookingCnt / totalBookingCnt * 100 * 10) / 10.0;
            modelAndView.addObject("bookingRate", bookingRate);

        }
        modelAndView.addObject("mid", mid);
        int rank = 0;
        System.out.println("rank : " + rank);

        for (int i = 0; i < movies.length; i++) {
            if (movie.equals(movies[i])) {
                rank = i + 1;
                modelAndView.addObject("rank", rank);
            }
            rank = -1;
        }
        return modelAndView;
    }

    @RequestMapping(value = "movie-detail",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovieDetail(@RequestParam(value = "mid", required = false) int mid,
                                  @SessionAttribute(value = "user", required = false) UserEntity user,
                                  MovieCommentEntity comment) {
        JSONObject responseObject = new JSONObject();
        if (user == null) {
            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
        } else {
            comment.setUserId(user.getId());
//            comment.setUserId("choi4349");
            comment.setMid(mid);
            Enum<?> result = this.movieService.writeComment(comment);
            responseObject.put("result", result.name().toLowerCase());
            if (result == CommonResult.SUCCESS) {
                responseObject.put("mid", mid);
            }
        }
        return responseObject.toString();
    }

    //한줄평들 띄우기
    @RequestMapping(value = "comment",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String getComments(@RequestParam(value = "mid") int mid) {
        JSONArray responseArray = new JSONArray();
        MovieCommentEntity[] comments = this.movieService.getComments(mid);

        for (MovieCommentEntity comment : comments) {

            JSONObject commentObject = new JSONObject();
            commentObject.put("index", comment.getIndex());
            commentObject.put("mid", comment.getMid());
            commentObject.put("userId", comment.getUserId());
            commentObject.put("score", comment.getScore());
            commentObject.put("content", comment.getContent());
            commentObject.put("recommendPoint", comment.getRecommendPoint());
            commentObject.put("writtenOn", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(comment.getWrittenOn()));
            responseArray.put(commentObject);
        }

        return responseArray.toString();
    }

    //movie-post
    @RequestMapping(value = "movie-post",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMoviePost() {
        return new ModelAndView("movie/movie-post");
    }

    @RequestMapping(value = "booking", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBooking(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView;
        if (user == null) {
            modelAndView = new ModelAndView("redirect:http://localhost:8080/member/login");
        } else {
            modelAndView = new ModelAndView("movie/booking");
            MovieEntity[] movies = this.movieService.getMovies();
            RegionEntity region = this.movieService.getRegion();
            BranchEntity[] branches = this.movieService.getBranches();
            MovieScreenInfoVo[] infos = this.movieService.getScreenInfos();
            SeatVo[] seats = this.movieService.getSeatVos();
            SeatVo[] seatVos = this.movieService.getSeatVosGroupByColumn();
            modelAndView.addObject("infos", infos);
            modelAndView.addObject("movies", movies);
            modelAndView.addObject("region", region);
            modelAndView.addObject("branches", branches);
            modelAndView.addObject("seats", seats);
            modelAndView.addObject("seatVos", seatVos);
        }
        return modelAndView;
    }

    @RequestMapping(value = "booking", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postBooking(@SessionAttribute(value = "user", required = false) UserEntity user, BookingEntity booking) {
        if (user == null) {
            return CommonResult.FAILURE.name().toLowerCase();
        }
        booking.setUserId(user.getId());
        Enum<?> result = this.movieService.booking(booking);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());
        return responseObject.toString();
    }

    @RequestMapping(value = "booking", method = RequestMethod.PATCH, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchBooking() {
        JSONArray branchesJson = new JSONArray();
        for (BranchEntity branch : this.movieService.getBranches()) {
            JSONObject branchJson = new JSONObject();
            branchJson.put("index", branch.getIndex());
            branchJson.put("text", branch.getText());
            branchJson.put("regionIndex", branch.getRegionIndex());
            branchesJson.put(branchJson);
        }
        // 상영지점 JSONArray

        JSONArray moviesJson = new JSONArray();
        for (MovieVo movie : this.movieService.getMovieVoByList()) {
            JSONObject movieJson = new JSONObject();
            movieJson.put("movieIndex", movie.getIndex());
            movieJson.put("movieTitle", movie.getTitle());
            movieJson.put("movieBranchIndex", movie.getMovieBranchIndex());
            movieJson.put("movieReleaseDate", new SimpleDateFormat("yyyy-MM-dd").format(movie.getReleaseDate()));
            movieJson.put("movieAgeLimit", movie.getAgeLimit());
            moviesJson.put(movieJson);
        }

        JSONArray seatsJson = new JSONArray();
        for (SeatVo seat : this.movieService.getSeatVos()) {
            JSONObject seatJson = new JSONObject();
            seatJson.put("seatIndex", seat.getIndex());
            seatJson.put("seatColumnIndex", seat.getColumnIndex());
            seatJson.put("seatColumnText", seat.getColumnText());
            seatJson.put("seatRow", seat.getRow());
            seatJson.put("seatAuditoriumIndex", seat.getAuditoriumIndex());
            seatJson.put("seatCode", seat.getSeatCode());
            seatsJson.put(seatJson);
        }

        JSONArray seatsAllJson = new JSONArray();
        for (SeatVo seatAll : this.movieService.getSeatByAll()) {
            JSONObject seatCountObject = new JSONObject();
            seatCountObject.put("seatAudIndex", seatAll.getAuditoriumIndex());
            seatCountObject.put("seatCountAll", seatAll.getCountSeatAll());
            seatsAllJson.put(seatCountObject);
        }

        JSONArray seatColumnsJson = new JSONArray();
        for (SeatVo seatColumn : this.movieService.getSeatVosGroupByColumn()) {
            JSONObject seatColumnJson = new JSONObject();
            seatColumnJson.put("seatColumnNumberOfColumn", seatColumn.getNumberOfColumn());
            seatColumnJson.put("seatColumnAudIndex", seatColumn.getAuditoriumIndex());
            seatColumnJson.put("seatColumnText", seatColumn.getColumnText());
            seatColumnsJson.put(seatColumnJson);
        }

        JSONArray screenInfosAllJson = new JSONArray();
        for (MovieScreenInfoVo screenInfo : this.movieService.getScreenInfos()) {
            JSONObject screenInfoAllJson = new JSONObject();
            screenInfoAllJson.put("screenInfoIndex", screenInfo.getIndex());
            screenInfoAllJson.put("screenInfoMovieIndex", screenInfo.getMovieIndex());
            screenInfoAllJson.put("screenInfoAuditoriumIndex", screenInfo.getAuditoriumIndex());
            screenInfoAllJson.put("screenInfoMovieStartTime", new SimpleDateFormat("HH:mm").format(screenInfo.getMvStartTime()));
            screenInfoAllJson.put("screenInfoMovieTime", new SimpleDateFormat("HH").format(screenInfo.getMvStartTime()));
            screenInfoAllJson.put("screenInfoMovieEndTime", new SimpleDateFormat("HH:mm").format(screenInfo.getMvEndTime()));
            screenInfoAllJson.put("screenInfoMovieTitle", screenInfo.getInfoMovieTitle());
            screenInfoAllJson.put("screenInfoDate", new SimpleDateFormat("yyyy-MM-dd").format(screenInfo.getScreenDate()));
            screenInfoAllJson.put("screenInfoMovieState", screenInfo.getInfoMovieState());
            screenInfoAllJson.put("screenInfoBranchIndex", screenInfo.getInfoBranchIndex());
            screenInfoAllJson.put("screenInfoBranchText", screenInfo.getInfoBranchText());
            screenInfoAllJson.put("screenInfoAuditoriumText", screenInfo.getInfoAudText());
            screenInfoAllJson.put("screenInfoMovieAgeLimit", screenInfo.getInfoMovieAgeLimit());
            screenInfoAllJson.put("screenInfoMoviePoster", screenInfo.getInfoMoviePoster());
            screenInfoAllJson.put("screenInfoSeatCountAll", screenInfo.getSeatIndex());
            screenInfoAllJson.put("screenInfoSeatRemain", screenInfo.getSeatRemain());
            screenInfosAllJson.put(screenInfoAllJson);
        }

        JSONArray bookingCompleteSeats = new JSONArray();
        for (BookingVo bookingSeat : this.movieService.getBookings()) {
            JSONObject bookingCompleteSeat = new JSONObject();
            bookingCompleteSeat.put("bookingSeatComplete", bookingSeat.getSeatIndex());
            bookingCompleteSeat.put("bookingSeatScreenInfoIndex", bookingSeat.getScreenInfoIndex());
            bookingCompleteSeat.put("bookingSeatMvStartTime", new SimpleDateFormat("HH:mm").format(bookingSeat.getMvStartTime()));
            bookingCompleteSeat.put("bookingSeatMvEndTime", new SimpleDateFormat("HH:mm").format(bookingSeat.getMvEndTime()));
            bookingCompleteSeat.put("bookingSeatIndex", bookingSeat.getSeatIndex());
            bookingCompleteSeats.put(bookingCompleteSeat);
        }


        JSONObject responseJson = new JSONObject();
        responseJson.put("allScreenInfo", screenInfosAllJson);
        responseJson.put("branch", branchesJson);
        responseJson.put("movieTitle", moviesJson);
        responseJson.put("seat", seatsJson);
        responseJson.put("seatColumn", seatColumnsJson);
        responseJson.put("seatComplete", bookingCompleteSeats);
        responseJson.put("seatAll", seatsAllJson);
        return responseJson.toString();
    }

    @RequestMapping(value = "bookingComplete",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBookingComplete(@SessionAttribute(value = "user") UserEntity user) {
        ModelAndView modelAndView = new ModelAndView("movie/bookingComplete");

        BookingVo[] bookingHistories = this.myPageService.getBookingHistory(user.getId());

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
        System.out.println("arr : " + Arrays.toString(arr));
        System.out.println("reverseArr : " + Arrays.toString(reverseArr));

        modelAndView.addObject("sortedBookingMapKeySet", reverseArr);

        modelAndView.addObject("bookingHistories", bookingHistories);
        modelAndView.addObject("bookingMap", bookingMap);

        //전화번호 양식 맞추기
        StringBuffer sb = new StringBuffer();
        sb.append(user.getContact());
        sb.insert(3, "-");
        sb.insert(8, "-");

        modelAndView.addObject("contact", sb);

        return modelAndView;
    }
}