package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.vos.movie.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

@Mapper
public interface IMovieMapper {

    MovieCommentVo selectMovieCommentByMid(@Param(value = "mid") int mid);

    //유저 나중에 추가하기(로그인 여부 확인하기 위해)
    MovieCommentEntity[] selectMovieCommentsByMid(@Param(value = "mid") int mid);

    MovieEntity[] selectMovies();

    RegionEntity selectRegion();

    BranchEntity[] selectBranches();

    MovieVo[] selectCommingMovies();

    MovieVo selectMovieVo(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVosByMid(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVos();

    MovieVo[] selectMovieVoByListBox();

    BookingEntity[] selectBooking();
    SeatVo[] selectSeatVo();

    SeatVo[] selectSeatByAll();
    SeatVo[] selectSeatVoGroupByColumn();

    MovieScreenInfoVo[] selectScreenInfos();
    MovieVo[] selectMoviesByKeyword(@Param(value = "keyword") String keyword);
    BookingEntity selectMovieVosById(@Param(value = "id") String Id);

    int insertBooking(BookingEntity booking);
    int insertComment(MovieCommentEntity comment);
}
