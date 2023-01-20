package dev.babsang.megabox.mappers;


import dev.babsang.megabox.entities.movie.BranchEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.RegionEntity;
import dev.babsang.megabox.entities.theater.TheaterEntity;
import dev.babsang.megabox.vos.bbs.BbsIndexCountVo;
import dev.babsang.megabox.vos.movie.BookingVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface ITheaterMapper {

    BbsIndexCountVo[] selectArticleNew();

    MovieEntity[] selectMovies();

    RegionEntity selectRegion();

    BranchEntity[] selectBranches();

    MovieScreenInfoVo[] selectScreenInfos(@Param(value = "branchId") int branchId);

    TheaterEntity selectBranchesIndex(@Param(value = "index") int index);

    SeatVo[] selectSeatByAuditoriumIndex(@Param(value = "auditoriumIndex") int auditoriumIndex);
    SeatVo[] selectSeatByAuditoriumIndexGroupByColumnIndex(@Param(value = "auditoriumIndex") int auditoriumIndex);

    BookingVo[] selectBookingByTheater();

}
