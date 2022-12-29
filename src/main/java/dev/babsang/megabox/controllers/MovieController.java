package dev.babsang.megabox.controllers;

import com.sun.org.apache.xpath.internal.operations.Mod;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.services.MovieService;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.MovieVo;
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
    public ModelAndView getMovie() {
        ModelAndView modelAndView = new ModelAndView("movie/movie");

        //전체 영화
        MovieVo[] movies = this.movieService.getMovieVos();
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

            double bookingRate = Math.round((double)movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

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

            double bookingRate = Math.round((double)movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

            movie.setBookRate(bookingRate);
        }
        modelAndView.addObject("commingMovies1", commingMovies);

        return modelAndView;
    }

    //movie-detail
    @RequestMapping(value = "movie-detail",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMovieDetail(@RequestParam(value = "mid", required = false) int mid) {
        ModelAndView modelAndView = new ModelAndView("movie/movie-detail");

        MovieCommentEntity[] comments = this.movieService.getComments(mid);
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

        return modelAndView;
    }

    @RequestMapping(value = "movie-detail",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String postMovieDetail(@RequestParam(value = "mid", required = false) int mid, MovieCommentEntity comment) {
        JSONObject responseObject = new JSONObject();
//        로그인은 추후 추가하기
//        if (user == null) {
//            responseObject.put("result", CommonResult.FAILURE.name().toLowerCase());
//        } else {
//            comment.setUserId(user.getId());
        comment.setUserId("choi4349");
        comment.setMid(mid);
        Enum<?> result = this.movieService.writeComment(comment);
        responseObject.put("result", result.name().toLowerCase());
        if (result == CommonResult.SUCCESS) {
            responseObject.put("mid", mid);
        }
//        }
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

    @RequestMapping(value = "fast-reservation", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getFastReservation() {

        ModelAndView modelAndView = new ModelAndView("movie/fast-reservation");
        MovieEntity[] movies = this.movieService.getMovies();
        RegionEntity region = this.movieService.getRegion();
        BranchEntity[] branches = this.movieService.getBranches();
        MovieScreenInfoVo[] infos = this.movieService.getScreenInfos();
        modelAndView.addObject("infos", infos);
        modelAndView.addObject("movies", movies);
        modelAndView.addObject("region", region);
        modelAndView.addObject("branches", branches);
        return modelAndView;
    }

    @RequestMapping(value = "seat",
    method = RequestMethod.GET,
    produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getSeat() {
        ModelAndView modelAndView = new ModelAndView("movie/seat");


        return modelAndView;
    }
}
