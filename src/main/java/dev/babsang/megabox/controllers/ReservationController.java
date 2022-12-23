package dev.babsang.megabox.controllers;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller(value = "dev.babsang.megabox.controllers.ReservationController")
@RequestMapping(value = "reservation")
public class ReservationController {
    @RequestMapping(value = "fast-reservation", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView getFastReservation() {
        ModelAndView modelAndView = new ModelAndView("reservation/fast-reservation");
        return modelAndView;
    }


}
