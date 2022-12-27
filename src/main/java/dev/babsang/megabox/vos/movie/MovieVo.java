package dev.babsang.megabox.vos.movie;

import dev.babsang.megabox.entities.movie.MovieEntity;

public class MovieVo extends MovieEntity {
    private double bookRate;
    private int totalAudience;

    public double getBookRate() {
        return bookRate;
    }

    public void setBookRate(double bookRate) {
        this.bookRate = bookRate;
    }

    public int getTotalAudience() {
        return totalAudience;
    }

    public void setTotalAudience(int totalAudience) {
        this.totalAudience = totalAudience;
    }
}
