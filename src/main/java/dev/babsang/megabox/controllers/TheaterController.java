package dev.babsang.megabox.controllers;


import dev.babsang.megabox.entities.movie.BranchEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.RegionEntity;
import dev.babsang.megabox.entities.theater.TheaterEntity;
import dev.babsang.megabox.services.TheaterService;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.TheaterController")
@RequestMapping(value = "theater")
public class TheaterController {
    private final TheaterService theaterService;

    @Autowired
    public TheaterController(TheaterService theaterService) {
        this.theaterService = theaterService;
    }

    @RequestMapping(value = "list", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getTheater() {
        ModelAndView modelAndView = new ModelAndView("theater/list");
        BbsIndexCountVo[] articles = this.theaterService.getArticleNew();
        modelAndView.addObject("articles", articles);
        return modelAndView;
    }

    @RequestMapping(value = "page", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getTheaterPage(@RequestParam(value = "rid", required = false) int rid) {
        ModelAndView modelAndView = new ModelAndView("theater/page");
        TheaterEntity theater = this.theaterService.getBranchesIndex(rid);

        modelAndView.addObject("theater", theater);
        modelAndView.addObject("rid", theater.getIndex());
        return modelAndView;
    }
    //

    @RequestMapping(value = "time", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getTheaterTime(@RequestParam(value = "rid", required = false) int rid) {
        ModelAndView modelAndView = new ModelAndView("theater/time");
        MovieEntity[] movies = this.theaterService.getMovies();
        RegionEntity region = this.theaterService.getRegion();
        BranchEntity[] branches = this.theaterService.getBranches();
        MovieScreenInfoVo[] infos = this.theaterService.getScreenInfos();
        TheaterEntity theater = this.theaterService.getBranchesIndex(rid);

        modelAndView.addObject("theater", theater);
        modelAndView.addObject("rid", theater.getIndex());

        modelAndView.addObject("infos", infos);
        modelAndView.addObject("movies", movies);
        modelAndView.addObject("region", region);
        modelAndView.addObject("branches", branches);
        return modelAndView;
    }

}
