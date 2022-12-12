package dev.babsang.megabox.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.MovieController")
@RequestMapping(value = "movie")
public class MovieController {
    @RequestMapping(value = "movie",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMoviePage() {
        ModelAndView modelAndView = new ModelAndView("movie/movie");
        return modelAndView;
    }
}
