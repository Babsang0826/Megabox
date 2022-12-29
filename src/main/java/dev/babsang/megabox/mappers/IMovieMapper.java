package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.movie.BookingEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.vos.movie.MovieCommentVo;
import dev.babsang.megabox.vos.movie.MovieVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMovieMapper {

    MovieCommentVo selectMovieCommentByMid(@Param(value = "mid") int mid);
    //유저 나중에 추가하기(로그인 여부 확인하기 위해)
    MovieCommentEntity[] selectMovieCommentsByMid(@Param(value = "mid") int mid);
    MovieEntity selectMovieByIndex(@Param(value = "mid") int mid);
    MovieEntity[] selectMovies();
//    MovieVo[] selectCommingMovieVos();
    MovieVo[] selectCommingMovies();
    MovieVo selectMovieVo(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVosByMid(@Param(value = "mid") int mid);
    MovieVo[] selectMovieVos();
    BookingEntity[] selectBooking();


    MovieEntity[] selectMovieReservation();

    int insertComment(MovieCommentEntity comment);

}
