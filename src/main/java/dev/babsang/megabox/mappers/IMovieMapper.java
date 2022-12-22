package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMovieMapper {
    MovieCommentEntity selectMovieCommentByMid(@Param(value = "mid") int mid);

    //유저 나중에 추가하기(로그인 여부 확인하기 위해)
    MovieCommentEntity[] selectMovieCommentsByMid(@Param(value = "mid") int mid);

    int insertComment(MovieCommentEntity comment);

}
