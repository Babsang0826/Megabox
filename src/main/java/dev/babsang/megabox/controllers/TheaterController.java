package dev.babsang.megabox.controllers;


import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.BranchEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.RegionEntity;
import dev.babsang.megabox.entities.theater.TheaterEntity;
import dev.babsang.megabox.services.TheaterService;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;

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
    public ModelAndView getTheaterPage(@RequestParam(value = "branchId", required = false) int branchId) {
        ModelAndView modelAndView = new ModelAndView("theater/page");
        TheaterEntity theater = this.theaterService.getBranchesIndex(branchId);

        modelAndView.addObject("theater", theater);
        System.out.println(theater.getAddress());
        modelAndView.addObject("branchId", theater.getIndex());
        return modelAndView;
    }
    //

    @RequestMapping(value = "time", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getTheaterTime(@RequestParam(value = "branchId", required = false) int branchId) {
        ModelAndView modelAndView = new ModelAndView("theater/time");
        MovieEntity[] movies = this.theaterService.getMovies();
        RegionEntity region = this.theaterService.getRegion();
        BranchEntity[] branches = this.theaterService.getBranches();
        MovieScreenInfoVo[] infos = this.theaterService.getScreenInfos(branchId);
        TheaterEntity theater = this.theaterService.getBranchesIndex(branchId);
        modelAndView.addObject("theater", theater);
        modelAndView.addObject("branchId", branchId);

        modelAndView.addObject("infos", infos);
        modelAndView.addObject("movies", movies);
        modelAndView.addObject("region", region);
        modelAndView.addObject("branches", branches);
        return modelAndView;
    }

    @RequestMapping(value = "time", method = RequestMethod.PATCH, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String patchTime(@RequestParam(value = "branchId", required = false) int branchId) {
        JSONArray screenInfosAllJson = new JSONArray();
        for (MovieScreenInfoVo screenInfo : this.theaterService.getScreenInfos(branchId)) {
            JSONObject screenInfoAllJson = new JSONObject();
            screenInfoAllJson.put("screenInfoIndex", screenInfo.getIndex());
            screenInfoAllJson.put("screenInfoMovieIndex", screenInfo.getMovieIndex());
            screenInfoAllJson.put("screenInfoAuditoriumIndex", screenInfo.getAuditoriumIndex());
            screenInfoAllJson.put("screenInfoMovieStartTime", new SimpleDateFormat("HH:mm").format(screenInfo.getMvStartTime()));
            screenInfoAllJson.put("screenInfoMovieEndTime", new SimpleDateFormat("HH:mm").format(screenInfo.getMvEndTime()));
            screenInfoAllJson.put("screenInfoMovieTitle", screenInfo.getInfoMovieTitle());
            screenInfoAllJson.put("screenInfoDate", new SimpleDateFormat("yyyy-MM-dd").format(screenInfo.getScreenDate()));
            screenInfoAllJson.put("screenInfoMovieState", screenInfo.getInfoMovieState());
            screenInfoAllJson.put("screenInfoBranchIndex", screenInfo.getInfoBranchIndex());
            screenInfoAllJson.put("screenInfoBranchText", screenInfo.getInfoBranchText());
            screenInfoAllJson.put("screenInfoAuditoriumText", screenInfo.getInfoAudText());
            screenInfoAllJson.put("runningTime", screenInfo.getRunningTime());
            screenInfoAllJson.put("movieState", screenInfo.getMovieState());
            screenInfoAllJson.put("infoMovieAgeLimit", screenInfo.getInfoMovieAgeLimit());
            screenInfoAllJson.put("movieIndex", screenInfo.getMovieIndex());
            screenInfoAllJson.put("moviePoster", screenInfo.getMoviePoster());
            screenInfoAllJson.put("auditoriumIndex", screenInfo.getAuditoriumIndex());
            screenInfoAllJson.put("screenInfoSeatCountAll", screenInfo.getSeatIndex());
            screenInfoAllJson.put("screenInfoSeatRemain", screenInfo.getSeatRemain());



            SeatVo[] seatVos = this.theaterService.getSeat(screenInfo.getAuditoriumIndex());
            SeatVo[] seatVoColumns = this.theaterService.getSeatGroupByColumnIndex(screenInfo.getAuditoriumIndex());

            JSONArray seatVoArr = new JSONArray();
            for (SeatVo seatVo : seatVos) {
                JSONObject seatVoObject = new JSONObject();
                seatVoObject.put("seatVoIndex", seatVo.getIndex());
                seatVoObject.put("seatVoColumnIndex", seatVo.getColumnIndex());
                seatVoObject.put("seatVoColumnText", seatVo.getColumnText());
                seatVoObject.put("seatVoRow", seatVo.getRow());
                seatVoObject.put("seatVoSeatCode", seatVo.getSeatCode());
                seatVoObject.put("seatVoAuditoriumIndex", seatVo.getAuditoriumIndex());
                seatVoArr.put(seatVoObject);
            }

            JSONArray seatVoColumnArr = new JSONArray();
            for(SeatVo seat : seatVoColumns) {
                JSONObject seatVoColumnObject = new JSONObject();
                seatVoColumnObject.put("seatVoNumOfColumn", seat.getColumnText());
                seatVoColumnArr.put(seatVoColumnObject);
            }
            screenInfoAllJson.put("seatVos", seatVoArr);
            screenInfoAllJson.put("seatColumnVo", seatVoColumnArr);
            screenInfosAllJson.put(screenInfoAllJson);
        }
        return screenInfosAllJson.toString();
    }

    @RequestMapping(value = "map", method = RequestMethod.GET,
            produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getMap(@RequestParam(value = "branchId") int branchId) {
        ModelAndView modelAndView = new ModelAndView("theater/map");
        TheaterEntity theater = this.theaterService.getBranchesIndex(branchId);


        modelAndView.addObject("latitude", theater.getLatitude());
        modelAndView.addObject("longitude", theater.getLongitude());
        return modelAndView;
    }

}