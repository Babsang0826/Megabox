package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.movie.BranchEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.RegionEntity;
import dev.babsang.megabox.entities.theater.TheaterEntity;
import dev.babsang.megabox.mappers.IBbsMapper;
import dev.babsang.megabox.mappers.ITheaterMapper;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "dev.babsang.megabox.services.TheaterService")

public class TheaterService {

    private final ITheaterMapper theaterMapper;

    @Autowired
    TheaterService(ITheaterMapper theaterMapper) {
        this.theaterMapper = theaterMapper;
    }

    public BbsIndexCountVo[] getArticleNew() {
        return this.theaterMapper.selectArticleNew();
    }

    public MovieEntity[] getMovies() {
        return this.theaterMapper.selectMovies();
    }

    public RegionEntity getRegion() {
        return this.theaterMapper.selectRegion();
    }

    public BranchEntity[] getBranches() {
        return this.theaterMapper.selectBranches();
    }

    public MovieScreenInfoVo[] getScreenInfos() {
        return this.theaterMapper.selectScreenInfos();
    }

    public TheaterEntity getBranchesIndex(int index) {
        return this.theaterMapper.selectBranchesIndex(index);
    }

}
