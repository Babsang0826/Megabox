package dev.babsang.megabox.mappers;


import dev.babsang.megabox.entities.movie.BranchEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.RegionEntity;
import dev.babsang.megabox.entities.theater.TheaterEntity;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface ITheaterMapper {

    BbsIndexCountVo[] selectArticleNew();
    MovieEntity[] selectMovies();

    RegionEntity selectRegion();

    BranchEntity[] selectBranches();

    MovieScreenInfoVo[] selectScreenInfos();

    TheaterEntity selectBranchesIndex(@RequestParam(value = "index") int index);

}
