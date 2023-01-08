package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.vos.movie.MovieCommentVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.MovieVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

@Mapper
public interface IMovieMapper {

    MovieCommentVo selectMovieCommentByMid(@Param(value = "mid") int mid);

    //유저 나중에 추가하기(로그인 여부 확인하기 위해)
    MovieCommentEntity[] selectMovieCommentsByMid(@Param(value = "mid") int mid);

    MovieEntity selectMovieByIndex(@Param(value = "mid") int mid);

    MovieEntity[] selectMovies();

    RegionEntity selectRegion();

    BranchEntity[] selectBranches();

    //    MovieVo[] selectCommingMovieVos();
    MovieVo[] selectCommingMovies();

    MovieVo selectMovieVo(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVosByMid(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVos();

    MovieVo[] selectMovieVoByListBox();

    BookingEntity[] selectBooking();
    SeatVo[] selectSeatVo();
    SeatVo[] selectSeatVoGroupByColumn();
    MovieScreenInfoVo[] selectScreenInfos();
//    MovieScreenInfoVo[] selectScreenInfoByOptionalList();
    MovieVo[] selectMoviesByKeyword(@Param(value = "keyword") String keyword);
    UserEntity selectUserByContact(@Param(value = "contact") String contact);
    UserEntity selectUserByEmail(@Param(value = "email") String email);

    BookingEntity selectMovieVosById(@Param(value = "id") String Id);


    int insertComment(MovieCommentEntity comment);

    int updateUser(UserEntity user);

    int deleteUser(UserEntity user);
}
