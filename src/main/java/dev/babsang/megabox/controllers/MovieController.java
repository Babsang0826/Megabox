package dev.babsang.megabox.controllers;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.services.MovieService;
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

import java.text.SimpleDateFormat;

@Controller(value = "dev.babsang.megabox.controllers.MovieController")
@RequestMapping(value = "movie")
public class MovieController {
    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    //movie
    @RequestMapping(value = "movie",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMovie(@RequestParam(value = "keyword", required = false) String keyword) {
        ModelAndView modelAndView = new ModelAndView("movie/movie");

        //전체 영화
//        MovieVo[] movies = this.movieService.getMovieVos();
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
    public ModelAndView getFastReservation() {
        ModelAndView modelAndView = new ModelAndView("movie/booking");
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
        return modelAndView;
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
        for(MovieVo movie : this.movieService.getMovieVoByList()) {
            JSONObject movieJson = new JSONObject();
            movieJson.put("movieIndex", movie.getIndex());
            movieJson.put("movieTitle", movie.getTitle());
            movieJson.put("movieBranchIndex", movie.getMovieBranchIndex());
            movieJson.put("movieReleaseDate",new SimpleDateFormat("yyyy-MM-dd").format(movie.getReleaseDate()));
            movieJson.put("movieAgeLimit", movie.getAgeLimit());
            System.out.println(movie.getMovieScreenDate());
            moviesJson.put(movieJson);
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
            screenInfosAllJson.put(screenInfoAllJson);
        }
        // 상영정보  JSONArray

        JSONObject responseJson = new JSONObject();
        responseJson.put("allScreenInfo", screenInfosAllJson);
        responseJson.put("branch", branchesJson);
        responseJson.put("movieTitle", moviesJson);
        return responseJson.toString();
    }

    @RequestMapping(value = "myPage",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMyPage(@SessionAttribute(value = "user", required = false) UserEntity user) {
        ModelAndView modelAndView = new ModelAndView("member/myPage");
        BookingEntity booking = this.movieService.getMovieVosById(user.getId());
        if (booking == null) {
            modelAndView.addObject("point", 0);
        } else {
            modelAndView.addObject("point", booking.getPayment() / 200);
        }

        return modelAndView;
    }

    @RequestMapping(value = "myPage",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMyPage(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
        Enum<?> result = this.movieService.myPageAuth(signedUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getModify() {
        ModelAndView modelAndView = new ModelAndView("member/myPage-modify");

        return modelAndView;
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postModify(@SessionAttribute(value = "user", required = false) UserEntity signedUser,
                             UserEntity newUser) {
        JSONObject responseObject = new JSONObject();
        Enum<? extends IResult> result = this.movieService.updateUser(signedUser, newUser);
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "modify",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteMyPage(@SessionAttribute(value = "user", required = false) UserEntity signedUser) {
        Enum<?> result = this.movieService.deleteUser(signedUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "recoverPassword",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getChangePw() {
        ModelAndView modelAndView = new ModelAndView("member/recoverPassword");

        return modelAndView;
    }

    @RequestMapping(value = "recoverPassword",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postRecoverPassword(@SessionAttribute(value = "user") UserEntity signedUser, UserEntity newUser) {
        Enum<?> result = this.movieService.updatePassword(signedUser, newUser);
        JSONObject responseObject = new JSONObject();
        responseObject.put("result", result.name().toLowerCase());

        return responseObject.toString();
    }

    @RequestMapping(value = "bookingComplete",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getBookingComplete() {
        ModelAndView modelAndView = new ModelAndView("movie/bookingComplete");

        return modelAndView;
    }
}