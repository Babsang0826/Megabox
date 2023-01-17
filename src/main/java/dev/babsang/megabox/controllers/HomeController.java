package dev.babsang.megabox.controllers;

import com.sun.org.apache.xpath.internal.operations.Mod;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.services.MovieService;
import dev.babsang.megabox.services.MyPageService;
import dev.babsang.megabox.vos.movie.MovieVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.HomeController")
@RequestMapping(value = "/")
public class HomeController {
    private final MovieService movieService;
    @Autowired
    public HomeController(MovieService movieService) {
        this.movieService = movieService;
    }
    @RequestMapping(value = "/", method = RequestMethod.GET,produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getIndex() {
        ModelAndView modelAndView = new ModelAndView("home/index");
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

            double bookingRate = Math.round((double) movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

            movie.setBookRate(bookingRate);
        }

        modelAndView.addObject("movies", movies);
        return modelAndView;
    }

    @RequestMapping(value = "info",
    method = RequestMethod.GET,
    produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getInfo(@SessionAttribute(value = "user")UserEntity user) {
        ModelAndView modelAndView = new ModelAndView("fragments/body");

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

            double bookingRate = Math.round((double) movie.getTotalAudience() / booking.length * 100 * 10) / 10.0;

            movie.setBookRate(bookingRate);
        }

        modelAndView.addObject("movies", movies);
        return modelAndView;
    }
}
